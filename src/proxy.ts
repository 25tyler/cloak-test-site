import { NextRequest, NextResponse } from 'next/server';

// Cloak auto-prerender middleware (demo).
//
// Intercepts HTML page requests, asks Cloak's cached-html endpoint
// whether it has a pre-ciphered version of this URL, and if so serves
// that ciphered HTML directly to the browser. The SDK then sees
// autoPrerenderActive=true and skips the in-browser cipher pass.
//
// Production equivalents: Vercel Build Plugin, WordPress plugin,
// Cloudflare Worker — all do the same "intercept and swap" pattern.
// This middleware is the test-site demo of that pattern.

const CLOAK_API = process.env.CLOAK_API_URL || 'http://localhost:7249';
const CLOAK_KEY = process.env.CLOAK_API_KEY || 'test-key';

export async function proxy(req: NextRequest) {
    // Only intercept top-level document requests. Skip JSON, API, images,
    // scripts, CSS, font files, favicons — anything the browser fetches
    // after the page loads.
    const accept = req.headers.get('accept') || '';
    if (!accept.includes('text/html')) {
        return NextResponse.next();
    }
    if (req.method !== 'GET') {
        return NextResponse.next();
    }
    // Skip Next.js RSC prefetch requests — they arrive on the same path
    // with an RSC header and text/x-component Accept, and should never
    // match the HTML snapshot.
    if (req.headers.get('RSC')) {
        return NextResponse.next();
    }
    // Skip Cloak's own crawler / tooling so the prerender pipeline
    // doesn't loop back through this proxy. The crawler fetches the
    // origin plaintext to cipher it; if the proxy intercepted those
    // fetches they'd recursively ask Cloak for the cached version
    // that's being built right now.
    const ua = req.headers.get('user-agent') || '';
    if (ua.startsWith('CloakCrawler/') || ua.startsWith('Cloak-Prerender/')) {
        return NextResponse.next();
    }
    if (req.headers.get('x-cloak-bypass') === '1') {
        return NextResponse.next();
    }
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Derive real host/proto so this works behind a customer domain, not
    // just localhost. In prod the proxy runs on the customer's origin.
    const incomingHost = req.headers.get('host') || 'localhost';
    const incomingProto = req.headers.get('x-forwarded-proto') || 'http';

    // Ask Cloak if it has a pre-ciphered version. Include the query
    // string so URLs like /hydration?utm_source=test match the snapshot.
    const pageUrl = `${incomingProto}://${incomingHost}${pathname}${req.nextUrl.search}`;
    try {
        const resp = await fetch(`${CLOAK_API}/api/sdk/cached-html-for-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': CLOAK_KEY,
                'Origin': `${incomingProto}://${incomingHost}`,
            },
            body: JSON.stringify({ url: pageUrl }),
            // Fast timeout — if Cloak is slow, fall back to plaintext
            // render rather than blocking the whole page.
            signal: AbortSignal.timeout(2000),
        });

        console.log(`[Cloak proxy] ${pathname} → cloak status ${resp.status}`);
        if (resp.status === 200) {
            const ciphered = await resp.arrayBuffer();
            const snapshotId = resp.headers.get('x-cloak-snapshot-id') || '';
            console.log(`[Cloak proxy] ${pathname} HIT, ${ciphered.byteLength} bytes, snapshot=${snapshotId}`);
            return new NextResponse(ciphered, {
                status: 200,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'X-Cloak-Prerender': 'hit',
                    'X-Cloak-Snapshot-Id': snapshotId,
                    'Cache-Control': 'no-store',
                },
            });
        }
    } catch (e) {
        // Classify error so operators can spot patterns (timeout vs
        // network vs abort vs something else) in structured logs.
        const err = e as Error;
        let errType: string = 'unknown';
        if (err.name === 'TimeoutError' || err.name === 'AbortError') {
            errType = 'timeout';
        } else if (err.name === 'TypeError') {
            errType = 'network';
        } else if (err.name) {
            errType = err.name;
        }
        console.log(
            `[Cloak proxy] ${pathname} FETCH ERR type=${errType} name=${err.name} msg=${err.message}`
        );
    }

    // Miss or error → let Next.js render the plaintext version. The SDK
    // will do in-browser cipher on the client side.
    const resp = NextResponse.next();
    resp.headers.set('X-Cloak-Prerender', 'miss');
    return resp;
}

export const config = {
    matcher: [
        // Run on everything except Next.js internals and static assets.
        '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
    ],
};
