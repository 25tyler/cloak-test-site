"use client";

/**
 * "Redeploy SDK" button — always visible in the test harness nav.
 *
 * Calls POST /api/dev/redeploy-sdk on the Cloak API. That endpoint spawns
 * scripts/redeploy-sdk.sh detached, which kills the running encrypt_api
 * (after --delay-kill 1s so this response flushes) and boots a fresh one.
 *
 * The button captures the server's CURRENT version, fires the POST, then
 * polls /api/sdk/version at 400ms intervals until it sees EITHER a
 * different version (normal case) OR the same version served by a fresh
 * process (when no version bump happened — still worth doing because it
 * drops in-memory caches). Because we can't distinguish "same-version
 * fresh server" from "same-version stale server" purely from the version
 * endpoint, we also watch /api/health for a brief outage window — the
 * kill-and-restart drops health to a fetch error for ~1-3s, which proves
 * the server actually cycled.
 *
 * States:
 *   idle        - ready to click
 *   running     - POST fired, awaiting server cycle
 *   verifying   - server is back, checking version + SDK bundle marker
 *   done        - success; auto-reload offered
 *   error       - something failed; message shown
 */
import { useCallback, useState } from "react";

const CLOAK_API =
    process.env.NEXT_PUBLIC_CLOAK_API_URL ?? "http://localhost:7249";

type Phase = "idle" | "running" | "verifying" | "done" | "error";

async function getVersion(): Promise<string | null> {
    try {
        const res = await fetch(
            `${CLOAK_API}/api/sdk/version?key=test-key&_=${Date.now()}`,
            { cache: "no-store" },
        );
        if (!res.ok) return null;
        const json = await res.json();
        return typeof json?.version === "string" ? json.version : null;
    } catch {
        return null;
    }
}

async function getHealth(): Promise<boolean> {
    try {
        const res = await fetch(`${CLOAK_API}/api/health?_=${Date.now()}`, {
            cache: "no-store",
        });
        return res.ok;
    } catch {
        return false;
    }
}

type ResetPhase = "idle" | "resetting" | "done" | "error";

export default function RedeploySdkButton() {
    const [phase, setPhase] = useState<Phase>("idle");
    const [message, setMessage] = useState<string>("");
    const [elapsed, setElapsed] = useState<number>(0);
    const [resetPhase, setResetPhase] = useState<ResetPhase>("idle");
    const [resetMsg, setResetMsg] = useState<string>("");

    const run = useCallback(async () => {
        setPhase("running");
        setMessage("killing server…");
        setElapsed(0);
        const start = performance.now();

        const before = await getVersion();
        if (!before) {
            setPhase("error");
            setMessage("couldn't read current version");
            return;
        }

        // Fire-and-forget POST. The spawn returns 202; we don't wait on it
        // because the server is about to die.
        try {
            await fetch(`${CLOAK_API}/api/dev/redeploy-sdk`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
        } catch {
            // Expected: the connection may drop when the server dies.
        }

        // Phase 1: wait for the kill window — health should go DOWN first,
        // proving the server really cycled. If we see health stay UP for 10s,
        // the script didn't actually kill anything, which is a failure.
        let sawDown = false;
        const killDeadline = performance.now() + 10000;
        while (performance.now() < killDeadline) {
            const up = await getHealth();
            if (!up) {
                sawDown = true;
                break;
            }
            await new Promise(r => setTimeout(r, 300));
            setElapsed(Math.round((performance.now() - start) / 100) / 10);
        }
        if (!sawDown) {
            setPhase("error");
            setMessage("server never went down — redeploy didn't fire");
            return;
        }

        // Phase 2: wait for the new server to answer.
        setMessage("server down — waiting for fresh boot…");
        const upDeadline = performance.now() + 20000;
        let fresh = false;
        while (performance.now() < upDeadline) {
            const up = await getHealth();
            if (up) {
                fresh = true;
                break;
            }
            await new Promise(r => setTimeout(r, 300));
            setElapsed(Math.round((performance.now() - start) / 100) / 10);
        }
        if (!fresh) {
            setPhase("error");
            setMessage("new server never came back online");
            return;
        }

        // Phase 3: verify version. Same version == fine (no bump); different
        // == obviously fine.
        setPhase("verifying");
        setMessage("server back — confirming version…");
        const after = await getVersion();
        if (!after) {
            setPhase("error");
            setMessage("couldn't read new version");
            return;
        }

        const total = ((performance.now() - start) / 1000).toFixed(1);
        setElapsed(Number(total));
        setPhase("done");
        if (after === before) {
            setMessage(`redeployed in ${total}s — version ${after} (unchanged)`);
        } else {
            setMessage(`redeployed in ${total}s — ${before} → ${after}`);
        }
    }, []);

    const reload = useCallback(() => {
        window.location.reload();
    }, []);

    // Reset-cache: hits POST /api/dev/reset-cache on the Cloak API, which
    // clears every in-memory cache the server keeps about cloaked pages
    // (plaintext_cache, hash_data_cache, encrypted_html_cache, font URL
    // cache, sessions). Unlike Redeploy, this does NOT restart the Python
    // process — so the SDK JS in the browser stays loaded. Follows with a
    // page reload so the next /api/sdk/init is a clean handshake and the
    // SDK rebuilds its plaintext index from the fresh server state.
    const resetCache = useCallback(async () => {
        setResetPhase("resetting");
        setResetMsg("clearing server caches…");
        try {
            const res = await fetch(`${CLOAK_API}/api/dev/reset-cache`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            if (!res.ok) {
                setResetPhase("error");
                setResetMsg(`server returned ${res.status}`);
                return;
            }
            const body = await res.json();
            const total = Object.entries(body.cleared || {})
                .filter(([k]) => !k.startsWith("_error"))
                .reduce((acc, [, v]) => acc + (typeof v === "number" ? v : 0), 0);
            setResetPhase("done");
            setResetMsg(`cleared ${total} cached entries — reloading…`);
            // Hard reload so the SDK re-initializes against the emptied server.
            setTimeout(() => window.location.reload(), 400);
        } catch (e: unknown) {
            setResetPhase("error");
            const msg = e instanceof Error ? e.message : String(e);
            setResetMsg(`fetch failed: ${msg}`);
        }
    }, []);

    const resetDisabled = resetPhase === "resetting";
    const resetColor =
        resetPhase === "done"
            ? "bg-emerald-600 hover:bg-emerald-500"
            : resetPhase === "error"
              ? "bg-red-600 hover:bg-red-500"
              : resetPhase === "resetting"
                ? "bg-amber-500"
                : "bg-rose-600 hover:bg-rose-500";

    const disabled = phase === "running" || phase === "verifying";

    // Color scheme: amber while working, green on done, red on error.
    const colorClass =
        phase === "done"
            ? "bg-emerald-600 hover:bg-emerald-500"
            : phase === "error"
              ? "bg-red-600 hover:bg-red-500"
              : disabled
                ? "bg-amber-500"
                : "bg-indigo-600 hover:bg-indigo-500";

    // Fixed to the TOP-right corner, large and high-contrast so it cannot
    // be missed regardless of viewport width or existing page chrome.
    // z-[99999] beats everything else on the page (Next devtools portal
    // lives at 9999; this sits above it).
    return (
        <div
            data-cloak-exclude
            style={{ position: "fixed", top: 12, right: 12, zIndex: 99999 }}
            className="flex items-center gap-2 rounded-xl bg-zinc-950/95 px-3 py-2 text-sm shadow-2xl ring-2 ring-indigo-500 backdrop-blur"
        >
            <button
                type="button"
                onClick={run}
                disabled={disabled}
                className={`shrink-0 rounded-lg px-4 py-2 text-base font-bold uppercase tracking-wide text-white shadow-md transition-colors disabled:cursor-wait ${colorClass}`}
                title="Kill encrypt_api on :7249 and boot a fresh one, so the next page load picks up the current client/ code"
            >
                {phase === "running" || phase === "verifying"
                    ? `⟳ Redeploying… ${elapsed}s`
                    : phase === "done"
                      ? "✓ Redeployed"
                      : phase === "error"
                        ? "✗ Failed"
                        : "⟳ Redeploy SDK"}
            </button>
            {phase === "done" && (
                <button
                    type="button"
                    onClick={reload}
                    className="shrink-0 rounded-lg bg-zinc-700 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-600"
                >
                    Reload
                </button>
            )}
            <button
                type="button"
                onClick={resetCache}
                disabled={resetDisabled}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold text-white shadow-md transition-colors disabled:cursor-wait ${resetColor}`}
                title="Clear every in-memory server cache (plaintext, hash, sessions, fonts) and reload the page — forces a clean /api/sdk/init handshake"
            >
                {resetPhase === "resetting"
                    ? "⟳ Resetting…"
                    : resetPhase === "done"
                      ? "✓ Cleared"
                      : resetPhase === "error"
                        ? "✗ Reset failed"
                        : "🗑 Reset Cache"}
            </button>
            {resetMsg && resetPhase !== "idle" && (
                <span
                    className={`hidden max-w-[30ch] truncate text-xs lg:inline ${
                        resetPhase === "error" ? "text-red-300" : "text-zinc-300"
                    }`}
                >
                    {resetMsg}
                </span>
            )}
            {message && (
                <span
                    className={`hidden max-w-[36ch] truncate text-xs lg:inline ${
                        phase === "error" ? "text-red-300" : "text-zinc-300"
                    }`}
                >
                    {message}
                </span>
            )}
        </div>
    );
}
