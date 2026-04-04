import Link from "next/link";

const testPages = [
    {
        href: "/infinite-scroll",
        title: "Infinite Scroll",
        description:
            "Appends new DOM nodes as the user scrolls. Tests whether the SDK's MutationObserver picks up dynamically inserted text and encrypts it before the reader notices raw content.",
    },
    {
        href: "/hydration",
        title: "Hydration",
        description:
            "Server-renders HTML that React hydrates on the client. Verifies that Cloak encrypts content that transitions from static markup to a live React tree without double-processing or flicker.",
    },
    {
        href: "/virtual-scroll",
        title: "Virtual Scroll",
        description:
            "Renders only the visible slice of a large list, recycling DOM nodes as the user scrolls. Exercises the SDK's ability to handle rapid node creation and destruction.",
    },
    {
        href: "/lazy-load",
        title: "Lazy Load",
        description:
            "Defers component rendering until the element enters the viewport via IntersectionObserver. Tests that Cloak detects and encrypts content that appears well after initial page load.",
    },
    {
        href: "/shadow-dom",
        title: "Shadow DOM",
        description:
            "Places text inside Web Component shadow roots. Tests whether the SDK can traverse shadow DOM boundaries and apply font-based encryption to encapsulated content.",
    },
    {
        href: "/spa-nav",
        title: "SPA Navigation",
        description:
            "Uses client-side routing to swap page content without a full reload. Verifies the SDK re-scans and encrypts new content after Next.js route transitions.",
    },
    {
        href: "/re-renders",
        title: "Re-renders",
        description:
            "Rapidly updates text via React state changes (counters, timers, toggles). Stress-tests that the SDK handles frequent DOM mutations without leaking plaintext or degrading performance.",
    },
    {
        href: "/rich-content",
        title: "Rich Content",
        description:
            "Mixes text with images, videos, code blocks, tables, and nested formatting. Ensures encryption targets only text nodes and leaves non-text elements untouched.",
    },
];

export default function Home() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            {/* ── Hero ── */}
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Cloak SDK Test Harness
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                    This site exercises every common dynamic web pattern against
                    the Cloak font-encryption SDK. Each page isolates a single
                    rendering strategy so you can verify that encrypted text
                    appears correctly, the MutationObserver fires reliably, and
                    the decryption font loads without visual glitches.
                </p>
            </header>

            {/* ── Test page grid ── */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-semibold">Test Pages</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {testPages.map((page) => (
                        <Link
                            key={page.href}
                            href={page.href}
                            className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                        >
                            <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {page.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {page.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Article content (encryption target) ── */}
            <article className="prose prose-zinc dark:prose-invert mx-auto max-w-3xl">
                <h2>Why Font-Based Encryption Matters</h2>

                <p>
                    The open web was built on the assumption that content would
                    be read by humans sitting in front of browsers. That
                    assumption held for two decades, but the rise of large
                    language models has upended the equation. Today, an
                    ever-growing fleet of automated crawlers traverses every
                    publicly accessible page, ingesting article text,
                    documentation, forum posts, and product descriptions into
                    training corpora that power the next generation of AI
                    systems. For publishers, independent writers, and any
                    organisation that creates original content, this represents
                    an existential threat to the value of their work.
                </p>

                <p>
                    Traditional defenses fall into two broad categories:
                    access-control measures such as paywalls and login walls, and
                    robot-exclusion mechanisms like robots.txt directives and
                    rate limiting. Both approaches share a fundamental weakness:
                    they are advisory, not enforced at the content layer.
                    Paywalls can be circumvented by sophisticated scrapers that
                    emulate authenticated sessions. Robots.txt depends entirely
                    on the good faith of the crawler operator, and mounting
                    evidence shows that many AI companies routinely ignore these
                    directives. Rate limiting slows down scrapers but does not
                    prevent data extraction once a request succeeds.
                </p>

                <h3>The Cloak Approach</h3>

                <p>
                    Cloak takes a fundamentally different approach by operating
                    at the rendering layer rather than the network layer. Instead
                    of trying to prevent bots from reaching your pages, Cloak
                    ensures that the text they receive is cryptographically
                    scrambled. The system works through a two-step process.
                    First, every text node on the page is passed through a
                    Feistel cipher that remaps each character to a different
                    Unicode code point. The resulting string looks like random
                    gibberish in the HTML source. Second, a custom web font is
                    generated where the glyph for each encrypted code point is
                    actually the visual shape of the original plaintext
                    character. When the browser applies this font, the encrypted
                    text renders perfectly to the human eye. Bots that read the
                    DOM or the raw HTML see only the scrambled cipher text.
                </p>

                <p>
                    The encryption is per-request and ephemeral. Each page load
                    generates a fresh nonce, a new character mapping, and a
                    unique font file. There is no static key that a scraper can
                    extract and reuse across sessions. Even if a bot downloads
                    the font file, reverse-engineering the glyph mapping for one
                    page load provides no advantage for the next, because the
                    mapping changes every time.
                </p>

                <h3>Challenges in Modern Web Applications</h3>

                <p>
                    Applying font-based encryption to a static HTML page is
                    relatively straightforward. The real challenge emerges when
                    you consider how modern web applications actually render
                    content. Single-page applications built with frameworks like
                    React, Vue, or Svelte dynamically create and destroy DOM
                    nodes as users navigate between views. Infinite scroll feeds
                    append new content when the user reaches the bottom of the
                    viewport. Virtual scrolling libraries render only the visible
                    rows of a long list, recycling DOM elements as the user
                    scrolls. Lazy-loaded components defer rendering until they
                    enter the viewport. Shadow DOM encapsulation isolates
                    component internals behind shadow roots that standard DOM
                    traversal cannot reach.
                </p>

                <p>
                    Each of these patterns introduces a timing problem. The Cloak
                    SDK must detect new text nodes the instant they appear in the
                    document, encrypt them before the browser paints the frame,
                    and load the corresponding decryption font quickly enough
                    that the user never sees a flash of garbled content. The SDK
                    relies on MutationObserver to watch for DOM changes, but the
                    observer must be configured carefully to handle the full
                    spectrum of mutations: child-list additions, character-data
                    changes, and subtree modifications across both the main
                    document and any attached shadow roots.
                </p>

                <h3>What This Test Harness Validates</h3>

                <p>
                    This test site provides a controlled environment for
                    exercising each of these patterns in isolation. Every page
                    targets a single rendering strategy so that failures can be
                    attributed to a specific interaction between the SDK and the
                    framework. The infinite-scroll page appends fresh paragraphs
                    when you scroll to the bottom. The hydration page
                    server-renders a block of text that React subsequently
                    hydrates on the client. The virtual-scroll page renders a
                    list of one thousand items using windowed rendering. The
                    lazy-load page wraps content blocks in IntersectionObserver
                    triggers. The shadow-DOM page places text inside custom
                    elements with closed shadow roots. The SPA-navigation page
                    swaps content via client-side routing without a full page
                    reload. The re-renders page rapidly mutates text through
                    React state changes. And the rich-content page mixes text
                    with images, tables, code blocks, and deeply nested
                    formatting to verify that encryption targets only text nodes.
                </p>

                <p>
                    Together, these pages form a comprehensive regression suite
                    for the Cloak SDK. When you make changes to the
                    MutationObserver logic, the font-loading pipeline, or the
                    encryption algorithm itself, running through these test pages
                    gives you confidence that the SDK still handles every
                    real-world rendering pattern correctly. The goal is simple:
                    encrypted text should be invisible to bots and perfectly
                    readable to humans, no matter how the page is built.
                </p>
            </article>
        </div>
    );
}
