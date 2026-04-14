"use client";

/**
 * Skipped-text diagnostic page.
 *
 * Each region below contains text the Cloak SDK is expected to SKIP
 * (not encrypt) but that is still visible to a human reader. Each region
 * includes a unique canary word so Ctrl+F, copy, and window.find() can be
 * tested against exactly one category at a time.
 *
 * Canary words are listed at the top so they can be copied into a search
 * field quickly. To test:
 *
 *   1. Open Cloak's Ctrl+F overlay and search for each canary word.
 *      Report which ones highlight.
 *   2. Repeat with the browser's native Cmd+F (a separate test — native
 *      search reads the browser's text index, Cloak reads its own).
 *   3. Try to drag-select and copy each region; paste into a notepad and
 *      see what came out.
 *   4. In devtools: document.body.innerText.includes('<canary>')
 *      for each canary — tells you whether Cloak *could* reach the text
 *      via innerText even when its walker skips the subtree.
 */

const canaries = [
    { id: "plain-exclude", word: "AARDVARK", label: "data-cloak-exclude" },
    { id: "plain-code", word: "BISCUIT", label: "<code> inline" },
    { id: "plain-pre", word: "CARAVAN", label: "<pre> block" },
    { id: "plain-input", word: "DOLPHIN", label: "<input> value" },
    { id: "plain-textarea", word: "ELEPHANT", label: "<textarea> value" },
    { id: "plain-hidden", word: "FALCON", label: "[hidden] (revealed via CSS)" },
    { id: "plain-aria", word: "GIRAFFE", label: "[aria-hidden=true]" },
    { id: "plain-closed-shadow", word: "HARPOON", label: "closed shadow root" },
    { id: "plain-open-shadow-excluded", word: "IGLOO", label: "open shadow w/ exclude" },
];

// Register the custom elements once at module load time. Defining
// them as native Web Components means connectedCallback runs reliably
// during element insertion — and crucially, we can delay the
// attachShadow call until window.CloakSDK exists, guaranteeing that
// the SDK's monkey-patch catches the shadow root creation.
if (typeof window !== "undefined" && !customElements.get("harpoon-card")) {
    const waitForCloakThen = (fn: () => void) => {
        if ((window as unknown as { CloakSDK?: unknown }).CloakSDK) {
            fn();
            return;
        }
        // Poll briefly. The SDK loader typically injects CloakSDK
        // within a couple of animation frames of page load.
        let tries = 0;
        const iv = setInterval(() => {
            tries++;
            if ((window as unknown as { CloakSDK?: unknown }).CloakSDK || tries > 50) {
                clearInterval(iv);
                fn();
            }
        }, 50);
    };

    class HarpoonCard extends HTMLElement {
        connectedCallback() {
            const self = this;
            waitForCloakThen(() => {
                if ((self as HTMLElement & { _built?: boolean })._built) return;
                (self as HTMLElement & { _built?: boolean })._built = true;
                const root = self.attachShadow({ mode: "closed" });
                root.innerHTML = `
                    <style>
                        .card { padding: 1rem; border: 2px dashed #f59e0b; background: #fffbeb; border-radius: 0.5rem; color: #78350f; font-family: inherit; }
                        .card h3 { margin: 0 0 0.5rem; font-weight: 700; }
                        .card p { margin: 0; line-height: 1.5; }
                    </style>
                    <div class="card">
                        <h3>HARPOON Canary Title</h3>
                        <p>This paragraph lives inside a closed shadow root. The word HARPOON appears only here. If Cloak can find it, the walker is reaching closed shadow content.</p>
                    </div>
                `;
            });
        }
    }
    customElements.define("harpoon-card", HarpoonCard);

    class IglooCard extends HTMLElement {
        connectedCallback() {
            const self = this;
            waitForCloakThen(() => {
                if ((self as HTMLElement & { _built?: boolean })._built) return;
                (self as HTMLElement & { _built?: boolean })._built = true;
                const root = self.attachShadow({ mode: "open" });
                root.innerHTML = `
                    <style>
                        .card { padding: 1rem; border: 2px solid #10b981; background: #ecfdf5; border-radius: 0.5rem; color: #064e3b; font-family: inherit; }
                        .card h3 { margin: 0 0 0.5rem; font-weight: 700; }
                        .card p { margin: 0; line-height: 1.5; }
                    </style>
                    <div class="card" data-cloak-exclude>
                        <h3>IGLOO Canary Title</h3>
                        <p>This card is inside an OPEN shadow root but the card element itself has data-cloak-exclude. The word IGLOO appears only here.</p>
                    </div>
                `;
            });
        }
    }
    customElements.define("igloo-card", IglooCard);
}

declare global {
    interface HTMLElementTagNameMap {
        "harpoon-card": HTMLElement;
        "igloo-card": HTMLElement;
    }
}

export default function SkippedTextPage() {

    return (
        <main className="mx-auto max-w-3xl px-4 py-12 text-zinc-900 dark:text-zinc-100">
            <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    SDK Diagnostic
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight">
                    Skipped-Text Reachability
                </h1>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                    Each region below contains text the Cloak SDK should leave
                    as plain (unencrypted). Each region has a unique canary
                    word. Use Ctrl+F and copy to check which regions are
                    reachable by Cloak&apos;s plaintext mapping.
                </p>

                <section className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                        Canary Words
                    </h2>
                    <ul className="space-y-1 text-sm">
                        {canaries.map((c) => (
                            <li key={c.id} className="flex items-center gap-3">
                                <code className="rounded bg-zinc-200 px-2 py-0.5 font-mono text-xs dark:bg-zinc-800">
                                    {c.word}
                                </code>
                                <span className="text-zinc-600 dark:text-zinc-400">
                                    {c.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </header>

            {/* ── Region 1: data-cloak-exclude ── */}
            <Region
                id="plain-exclude"
                title="1. data-cloak-exclude attribute"
                description="Element explicitly opts out of encryption. SDK should skip its text entirely."
            >
                <div
                    data-cloak-exclude
                    className="rounded border border-indigo-300 bg-indigo-50 p-4 text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-100"
                >
                    <p>
                        This paragraph is wrapped in a div with
                        data-cloak-exclude. The word <strong>AARDVARK</strong>{" "}
                        appears only here. If Cloak&apos;s Ctrl+F can find it,
                        the plaintext mapping already includes excluded
                        subtrees. If not, the mapping is strictly
                        encrypted-only.
                    </p>
                </div>
            </Region>

            {/* ── Region 2: <code> block ── */}
            <Region
                id="plain-code"
                title="2. <code> inline element"
                description="Code blocks must stay exact. SDK skips their text."
            >
                <p>
                    The command to run is{" "}
                    <code className="rounded bg-zinc-200 px-1 font-mono dark:bg-zinc-800">
                        brew install BISCUIT --with-extras
                    </code>{" "}
                    according to the documentation. Can you find the word
                    BISCUIT in Cloak&apos;s search?
                </p>
            </Region>

            {/* ── Region 3: <pre> block ── */}
            <Region
                id="plain-pre"
                title="3. <pre> block"
                description="Preformatted text preserved verbatim. SDK skips it."
            >
                <pre className="overflow-x-auto rounded bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
{`function deploy() {
    // Canary: CARAVAN should be reachable
    return launchCARAVANShuttle();
}`}
                </pre>
            </Region>

            {/* ── Region 4: input value ── */}
            <Region
                id="plain-input"
                title="4. <input> value attribute"
                description="Form field default value. SDK skips inputs entirely."
            >
                <input
                    type="text"
                    defaultValue="Search for DOLPHIN in this field"
                    className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
                <p className="mt-2 text-sm text-zinc-500">
                    The default value contains the canary word DOLPHIN.
                </p>
            </Region>

            {/* ── Region 5: textarea value ── */}
            <Region
                id="plain-textarea"
                title="5. <textarea> content"
                description="User-editable text area. SDK skips textareas."
            >
                <textarea
                    defaultValue="This textarea contains the canary word ELEPHANT. Can Ctrl+F find it?"
                    rows={3}
                    className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
            </Region>

            {/* ── Region 6: [hidden] (CSS-overridden to stay visible) ── */}
            <Region
                id="plain-hidden"
                title="6. [hidden] attribute"
                description="Normally hidden from user AND SDK. Here we override display via CSS so humans see it but the SDK still skips it via attribute match."
            >
                <div
                    hidden
                    style={{ display: "block" }}
                    className="rounded border border-amber-300 bg-amber-50 p-4 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
                >
                    <p>
                        This element has the HTML <code>hidden</code> attribute
                        but a CSS override makes it visible. The canary word is{" "}
                        <strong>FALCON</strong>. Cloak&apos;s walker skips
                        [hidden] subtrees, but the text is visually present.
                    </p>
                </div>
            </Region>

            {/* ── Region 7: [aria-hidden] ── */}
            <Region
                id="plain-aria"
                title="7. [aria-hidden=true]"
                description="Accessibility-hidden. SDK treats this as skippable. Still visible to sighted users."
            >
                <div
                    aria-hidden="true"
                    className="rounded border border-rose-300 bg-rose-50 p-4 text-rose-900 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100"
                >
                    <p>
                        This element has aria-hidden=&quot;true&quot;. The
                        canary word is <strong>GIRAFFE</strong>. Screen readers
                        won&apos;t see it but sighted users will.
                    </p>
                </div>
            </Region>

            {/* ── Region 8: closed shadow root ── */}
            <Region
                id="plain-closed-shadow"
                title="8. Closed shadow root"
                description="mode: 'closed' — elem.shadowRoot returns null. JS cannot reach the content. Canary: HARPOON."
            >
                <harpoon-card />
            </Region>

            {/* ── Region 9: open shadow with exclude ── */}
            <Region
                id="plain-open-shadow-excluded"
                title="9. Open shadow root with data-cloak-exclude inside"
                description="Walker CAN enter the shadow root but should honor the exclude attribute. Canary: IGLOO."
            >
                <igloo-card />
            </Region>

            {/* ── Control: a known-encrypted paragraph for comparison ── */}
            <Region
                id="encrypted-control"
                title="Control: normal encrypted text"
                description="This region has no skip rules and SHOULD be encrypted. Canary: ZEBRA. If Cloak's Ctrl+F finds ZEBRA, the search pipeline itself is working."
            >
                <p>
                    This paragraph is a control group. It contains the canary
                    word <strong>ZEBRA</strong> and is not inside any skipped
                    element. Cloak&apos;s Ctrl+F should find it without any
                    trouble. If ZEBRA is not findable, the problem is not about
                    skipped text — the search is broken for everything.
                </p>
            </Region>
        </main>
    );
}

function Region({
    id,
    title,
    description,
    children,
}: {
    id: string;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="my-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h2 className="mb-1 text-xl font-bold">{title}</h2>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                {description}
            </p>
            {children}
        </section>
    );
}
