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
    // Forward the request pathname as `x-pathname` to every downstream
    // handler. <CloakProvider> in @cloak/next reads this header during
    // SSR to key its cipher mapping on the actual route — without it
    // server components have no canonical way to know which path is
    // rendering, fall back to '/', and every route ends up sharing
    // the homepage's cipher mapping (which mismatches the SDK's
    // runtime init and renders text as gibberish on every non-home
    // route). The header is set on EVERY NextResponse.next() below
    // via the helper so the header propagates regardless of which
    // early-return branch fires.
    const { pathname } = req.nextUrl;
    const passthrough = () =>
        NextResponse.next({
            request: {
                headers: (() => {
                    const h = new Headers(req.headers);
                    h.set('x-pathname', pathname);
                    return h;
                })(),
            },
        });

    // Only intercept top-level document requests. Skip JSON, API, images,
    // scripts, CSS, font files, favicons — anything the browser fetches
    // after the page loads.
    const accept = req.headers.get('accept') || '';
    if (!accept.includes('text/html')) {
        return passthrough();
    }
    if (req.method !== 'GET') {
        return passthrough();
    }
    // Skip Next.js RSC prefetch requests — they arrive on the same path
    // with an RSC header and text/x-component Accept, and should never
    // match the HTML snapshot.
    if (req.headers.get('RSC')) {
        return passthrough();
    }
    // Skip Cloak's own crawler / tooling so the prerender pipeline
    // doesn't loop back through this proxy. The crawler fetches the
    // origin plaintext to cipher it; if the proxy intercepted those
    // fetches they'd recursively ask Cloak for the cached version
    // that's being built right now.
    const ua = req.headers.get('user-agent') || '';
    if (ua.startsWith('CloakCrawler/') || ua.startsWith('Cloak-Prerender/')) {
        return passthrough();
    }
    if (req.headers.get('x-cloak-bypass') === '1') {
        return passthrough();
    }
    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/') ||
        pathname.includes('.')
    ) {
        return passthrough();
    }

    // The cached-html-for-url lookup used to serve a pre-ciphered HTML
    // snapshot from Cloak's prerender pipeline. With this site now using
    // @cloak/next (CloakProvider in app/layout.tsx + project-wide
    // jsxImportSource), cipher happens INSIDE React on every SSR — so the
    // snapshot cache is redundant.
    //
    // Worse, it was actively harmful: any time encrypt_api was briefly
    // hung when a snapshot was being generated (which happened every
    // time the dev server was overloaded), Next.js's 404/error page got
    // captured into the snapshot. The proxy then served that broken
    // snapshot for every subsequent visit until the cache cycled — the
    // user's reported symptom of "going to a new page often errors and
    // makes you reload" was the proxy returning a stale 404 snapshot
    // for /hydration (and other client-component pages) while reload
    // sometimes routed around it.
    //
    // Skipping the cached-html lookup makes every navigation go through
    // Next's normal SSR + the @cloak/next cipher path, with no chance
    // of being short-circuited by a poisoned snapshot.

    // Miss or error → let Next.js render the plaintext version. The SDK
    // will do in-browser cipher on the client side. Forward x-pathname
    // through the same passthrough helper so server components see it.
    const resp = passthrough();
    resp.headers.set('X-Cloak-Prerender', 'miss');
    return resp;
}

export const config = {
    matcher: [
        // Run on everything except Next.js internals and static assets.
        '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
    ],
};
