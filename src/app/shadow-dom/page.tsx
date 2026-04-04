"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Article data for the <article-card> instances
   ───────────────────────────────────────────── */
const articles = [
    {
        title: "The Quantum Computing Revolution Is Closer Than You Think",
        author: "Dr. Elena Vasquez",
        excerpt:
            "Recent breakthroughs in error correction have brought us within striking distance of practical quantum advantage. IBM, Google, and a handful of startups are racing to build machines that can solve problems classical computers never will. The implications for cryptography, drug discovery, and materials science are staggering.",
        mode: "open" as const,
    },
    {
        title: "Why Soil Health Is the Key to Feeding Ten Billion People",
        author: "Marcus Okonkwo",
        excerpt:
            "Beneath our feet lies the most complex ecosystem on the planet. A single teaspoon of healthy soil contains more microorganisms than there are people on Earth. Yet industrial agriculture has degraded a third of the world's topsoil in the last forty years. Regenerative farming practices offer a path forward, but adoption remains painfully slow.",
        mode: "open" as const,
    },
    {
        title: "Inside the Fight Over Algorithmic Sentencing",
        author: "Sarah Chen-Ramirez",
        excerpt:
            "Courts across America are using predictive algorithms to set bail amounts and determine prison sentences. Proponents say the tools reduce human bias; critics argue they encode and amplify it. A landmark case in Wisconsin may finally force the Supreme Court to weigh in on whether defendants have a right to inspect the code that judges them.",
        mode: "closed" as const,
    },
    {
        title: "The Unexpected Economics of Vertical Farming",
        author: "James Worthington",
        excerpt:
            "Vertical farms use ninety-five percent less water and zero pesticides, but the electricity bill is a killer. A new generation of LED technology and automation is finally tipping the math in favor of indoor agriculture. In Newark, a converted steel mill now produces more lettuce per square foot than any outdoor farm in California.",
        mode: "open" as const,
    },
    {
        title: "How Language Models Are Reshaping Scientific Discovery",
        author: "Dr. Priya Nair",
        excerpt:
            "Researchers are using large language models not just to summarize papers but to generate novel hypotheses. At MIT, a model trained on decades of materials science literature predicted three new superconducting compounds, two of which were later confirmed in the lab. The age of AI-assisted discovery is no longer hypothetical.",
        mode: "closed" as const,
    },
];

/* ─────────────────────────────────────────────
   Late-arriving article (appears after 3 s)
   ───────────────────────────────────────────── */
const lateArticle = {
    title: "Deep-Sea Mining and the Battle for the Ocean Floor",
    author: "Lena Johansson",
    excerpt:
        "Miles beneath the Pacific, potato-sized nodules rich in cobalt, nickel, and manganese litter the abyssal plain. Mining companies say these metals are essential for the green energy transition. Marine biologists warn that harvesting them could destroy ecosystems we have barely begun to understand. The International Seabed Authority is caught in the middle, facing pressure from both sides as a moratorium vote looms.",
    mode: "open" as const,
};

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function ShadowDomPage() {
    const lateContainerRef = useRef<HTMLDivElement>(null);
    const [lateAdded, setLateAdded] = useState(false);
    const [componentsDefined, setComponentsDefined] = useState(false);

    /* Register the custom elements once on mount */
    useEffect(() => {
        /* ---------- <article-card> (open shadow root) ---------- */
        if (!customElements.get("article-card")) {
            class ArticleCard extends HTMLElement {
                constructor() {
                    super();
                    const shadow = this.attachShadow({ mode: "open" });
                    shadow.innerHTML = `
                        <style>
                            :host {
                                display: block;
                                border: 1px solid #e4e4e7;
                                border-radius: 12px;
                                padding: 24px;
                                background: white;
                                transition: box-shadow 0.2s;
                            }
                            :host(:hover) {
                                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                            }
                            .title {
                                font-size: 1.25rem;
                                font-weight: 700;
                                line-height: 1.4;
                                color: #18181b;
                                margin: 0 0 8px;
                            }
                            .author {
                                font-size: 0.875rem;
                                color: #71717a;
                                margin: 0 0 16px;
                            }
                            .excerpt {
                                font-size: 1rem;
                                line-height: 1.7;
                                color: #3f3f46;
                                margin: 0;
                            }
                            .badge {
                                display: inline-block;
                                font-size: 0.75rem;
                                font-weight: 600;
                                padding: 2px 8px;
                                border-radius: 9999px;
                                margin-bottom: 12px;
                            }
                            .badge.open {
                                background: #dcfce7;
                                color: #166534;
                            }
                            .badge.closed {
                                background: #fef3c7;
                                color: #92400e;
                            }
                        </style>
                        <span class="badge"><slot name="badge"></slot></span>
                        <h3 class="title"><slot name="title">Untitled</slot></h3>
                        <p class="author">By <slot name="author">Unknown</slot></p>
                        <p class="excerpt"><slot name="excerpt">No excerpt available.</slot></p>
                    `;
                }
            }
            customElements.define("article-card", ArticleCard);
        }

        /* ---------- <article-card-closed> (closed shadow root) ---------- */
        if (!customElements.get("article-card-closed")) {
            class ArticleCardClosed extends HTMLElement {
                constructor() {
                    super();
                    // Closed shadow root -- not accessible via element.shadowRoot
                    const shadow = this.attachShadow({ mode: "closed" });
                    shadow.innerHTML = `
                        <style>
                            :host {
                                display: block;
                                border: 2px dashed #fbbf24;
                                border-radius: 12px;
                                padding: 24px;
                                background: #fffbeb;
                                transition: box-shadow 0.2s;
                            }
                            :host(:hover) {
                                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                            }
                            .title {
                                font-size: 1.25rem;
                                font-weight: 700;
                                line-height: 1.4;
                                color: #18181b;
                                margin: 0 0 8px;
                            }
                            .author {
                                font-size: 0.875rem;
                                color: #71717a;
                                margin: 0 0 16px;
                            }
                            .excerpt {
                                font-size: 1rem;
                                line-height: 1.7;
                                color: #3f3f46;
                                margin: 0;
                            }
                            .label {
                                display: inline-block;
                                font-size: 0.75rem;
                                font-weight: 600;
                                padding: 2px 8px;
                                border-radius: 9999px;
                                background: #fef3c7;
                                color: #92400e;
                                margin-bottom: 12px;
                            }
                        </style>
                        <span class="label">Closed Shadow Root</span>
                        <h3 class="title"></h3>
                        <p class="author"></p>
                        <p class="excerpt"></p>
                    `;
                }

                static get observedAttributes() {
                    return ["data-title", "data-author", "data-excerpt"];
                }

                connectedCallback() {
                    this.render();
                }

                attributeChangedCallback() {
                    this.render();
                }

                private render() {
                    // For closed shadow roots we can't use slots, so we
                    // read data attributes and inject text directly.
                    // We stored a reference via the constructor closure.
                    const shadow = (this as any).__shadow;
                    if (!shadow) return;
                    const title = this.getAttribute("data-title") ?? "";
                    const author = this.getAttribute("data-author") ?? "";
                    const excerpt = this.getAttribute("data-excerpt") ?? "";
                    const titleEl = shadow.querySelector(".title");
                    const authorEl = shadow.querySelector(".author");
                    const excerptEl = shadow.querySelector(".excerpt");
                    if (titleEl) titleEl.textContent = title;
                    if (authorEl) authorEl.textContent = `By ${author}`;
                    if (excerptEl) excerptEl.textContent = excerpt;
                }
            }

            // Patch the constructor to stash the closed shadow reference
            const origConstructor =
                ArticleCardClosed.prototype.constructor;
            const OrigClass = ArticleCardClosed;
            class PatchedArticleCardClosed extends HTMLElement {
                private __shadow: ShadowRoot;
                constructor() {
                    super();
                    const shadow = this.attachShadow({ mode: "closed" });
                    this.__shadow = shadow;
                    shadow.innerHTML = `
                        <style>
                            :host {
                                display: block;
                                border: 2px dashed #fbbf24;
                                border-radius: 12px;
                                padding: 24px;
                                background: #fffbeb;
                                transition: box-shadow 0.2s;
                            }
                            :host(:hover) {
                                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                            }
                            .title {
                                font-size: 1.25rem;
                                font-weight: 700;
                                line-height: 1.4;
                                color: #18181b;
                                margin: 0 0 8px;
                            }
                            .author {
                                font-size: 0.875rem;
                                color: #71717a;
                                margin: 0 0 16px;
                            }
                            .excerpt {
                                font-size: 1rem;
                                line-height: 1.7;
                                color: #3f3f46;
                                margin: 0;
                            }
                            .label {
                                display: inline-block;
                                font-size: 0.75rem;
                                font-weight: 600;
                                padding: 2px 8px;
                                border-radius: 9999px;
                                background: #fef3c7;
                                color: #92400e;
                                margin-bottom: 12px;
                            }
                        </style>
                        <span class="label">Closed Shadow Root</span>
                        <h3 class="title"></h3>
                        <p class="author"></p>
                        <p class="excerpt"></p>
                    `;
                }

                static get observedAttributes() {
                    return ["data-title", "data-author", "data-excerpt"];
                }

                connectedCallback() {
                    this.updateContent();
                }

                attributeChangedCallback() {
                    this.updateContent();
                }

                private updateContent() {
                    const title = this.getAttribute("data-title") ?? "";
                    const author = this.getAttribute("data-author") ?? "";
                    const excerpt = this.getAttribute("data-excerpt") ?? "";
                    const titleEl = this.__shadow.querySelector(".title");
                    const authorEl = this.__shadow.querySelector(".author");
                    const excerptEl =
                        this.__shadow.querySelector(".excerpt");
                    if (titleEl) titleEl.textContent = title;
                    if (authorEl) authorEl.textContent = `By ${author}`;
                    if (excerptEl) excerptEl.textContent = excerpt;
                }
            }

            customElements.define(
                "article-card-closed",
                PatchedArticleCardClosed
            );
        }

        setComponentsDefined(true);
    }, []);

    /* Dynamically add a new shadow DOM element after 3 seconds */
    useEffect(() => {
        if (!componentsDefined) return;

        const timer = setTimeout(() => {
            const container = lateContainerRef.current;
            if (!container || lateAdded) return;

            const card = document.createElement("article-card");
            card.innerHTML = `
                <span slot="badge">open</span>
                <span slot="title">${lateArticle.title}</span>
                <span slot="author">${lateArticle.author}</span>
                <span slot="excerpt">${lateArticle.excerpt}</span>
            `;
            container.appendChild(card);
            setLateAdded(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [componentsDefined, lateAdded]);

    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Shadow DOM Web Components
                </h1>
                <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
                    Tests Cloak SDK traversal into shadow roots, per-shadow-root
                    MutationObservers, and dynamic shadow DOM element injection.
                    Cards with a green badge use an open shadow root; cards with
                    an amber dashed border use a closed shadow root.
                </p>
            </header>

            {/* ── Open shadow root cards ── */}
            <section className="mb-12">
                <h2 className="mb-6 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                    Open Shadow Root Cards
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                    {articles
                        .filter((a) => a.mode === "open")
                        .map((article, i) => (
                            <article-card key={i}>
                                <span slot="badge">open</span>
                                <span slot="title">{article.title}</span>
                                <span slot="author">{article.author}</span>
                                <span slot="excerpt">{article.excerpt}</span>
                            </article-card>
                        ))}
                </div>
            </section>

            {/* ── Closed shadow root cards ── */}
            <section className="mb-12">
                <h2 className="mb-6 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                    Closed Shadow Root Cards
                </h2>
                <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                    These cards use attachShadow with mode closed. The shadow
                    root is not accessible via element.shadowRoot, making them
                    harder for the SDK to traverse. Text is injected via data
                    attributes rather than slots.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                    {articles
                        .filter((a) => a.mode === "closed")
                        .map((article, i) => (
                            <article-card-closed
                                key={i}
                                data-title={article.title}
                                data-author={article.author}
                                data-excerpt={article.excerpt}
                            />
                        ))}
                </div>
            </section>

            {/* ── Dynamically added card ── */}
            <section className="mb-12">
                <h2 className="mb-6 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                    Dynamically Injected Shadow DOM Element
                </h2>
                <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                    A new article-card web component will be injected into the
                    DOM three seconds after page load. This tests whether the SDK
                    MutationObserver detects new shadow roots and encrypts their
                    content.
                </p>
                <div
                    ref={lateContainerRef}
                    className="min-h-[120px] rounded-lg border-2 border-dashed border-zinc-300 p-4 dark:border-zinc-700"
                >
                    {!lateAdded && (
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <svg
                                className="h-5 w-5 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            New shadow DOM element arriving in 3 seconds...
                        </div>
                    )}
                </div>
            </section>

            {/* ── Regular DOM text for comparison ── */}
            <section>
                <h2 className="mb-4 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                    Regular DOM Text (Control)
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    This paragraph lives in the regular DOM, outside any shadow
                    root. It serves as a control to verify that standard text
                    encryption still works alongside shadow DOM content. The Cloak
                    SDK should encrypt this text using the normal code path while
                    separately handling the shadow DOM content above.
                </p>
            </section>
        </div>
    );
}

/* ─────────────────────────────────────────────
   TypeScript declarations for the custom elements
   so JSX doesn't complain about unknown tags.
   ───────────────────────────────────────────── */
declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "article-card": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    "data-title"?: string;
                    "data-author"?: string;
                    "data-excerpt"?: string;
                },
                HTMLElement
            >;
            "article-card-closed": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    "data-title"?: string;
                    "data-author"?: string;
                    "data-excerpt"?: string;
                },
                HTMLElement
            >;
        }
    }
}
