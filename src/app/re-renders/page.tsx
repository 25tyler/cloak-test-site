"use client";

import { useState, useEffect, useCallback } from "react";
import ShuffleList from "@/components/ShuffleList";
import AdSlot from "@/components/AdSlot";
import Carousel from "@/components/Carousel";

/* ── Article versions for theme toggle ── */
const articleVersionA = {
    title: "The Invisible Architecture of Digital Privacy",
    paragraphs: [
        "In the early days of the internet, privacy was an afterthought. Websites were simple documents linked together, and the notion that someone might systematically harvest their content was barely considered. Users browsed freely, leaving only the faintest traces in server logs that were rarely examined. The web was an open frontier where information flowed without friction or surveillance.",
        "Today the landscape has fundamentally transformed. Every page load generates dozens of tracking events. Sophisticated crawlers methodically index not just public web pages but the behavioral patterns of the humans reading them. Advertising networks construct detailed profiles spanning thousands of data points, creating digital shadows that follow users across devices and platforms with remarkable persistence.",
        "The response has been a new generation of privacy-preserving technologies. End-to-end encryption, once the domain of military communications, now protects billions of everyday messages. Differential privacy techniques allow organizations to extract statistical insights from datasets without exposing individual records. Font-based encryption represents one of the newest frontiers, rendering text human-readable while making it computationally opaque to automated systems.",
        "These technologies share a philosophical commitment: that access to information should remain a human privilege, not an automated commodity. They acknowledge that the value of written content lies not just in the raw characters but in the intentional act of reading and comprehension. By maintaining this distinction between human and machine access, privacy technologies preserve the essential character of the open web while defending against its exploitation.",
    ],
};

const articleVersionB = {
    title: "Rethinking Content Protection in the Age of Language Models",
    paragraphs: [
        "Large language models have fundamentally altered the economics of content creation and consumption. These systems, trained on vast corpora of web text, can generate fluent prose on virtually any topic at negligible marginal cost. For publishers and individual creators, this raises an urgent question: how do you protect the value of original content when machines can absorb and reproduce its essence in seconds?",
        "Traditional approaches to content protection have proven inadequate against modern AI systems. Paywalls deter human readers as much as bots. Robots.txt directives are routinely ignored by training data pipelines. Legal frameworks struggle to keep pace with technology that can process millions of documents before any takedown notice could possibly be filed. The asymmetry between creation effort and extraction ease grows wider with each model generation.",
        "A new class of solutions operates at the rendering layer rather than the access layer. Instead of trying to prevent machines from reaching content, these approaches ensure that what machines capture is fundamentally different from what humans perceive. Font-based encryption, visual obfuscation, and dynamic content transformation all exploit the gap between how browsers render content for human eyes and how automated systems parse the underlying document structure.",
        "The effectiveness of rendering-layer protection stems from a key insight: humans consume web content through a visual pipeline that includes font rendering, layout computation, and perceptual grouping. Automated systems, by contrast, typically consume the raw DOM or text content directly. By applying transformations that are transparent to the visual pipeline but opaque to direct text extraction, these systems create a meaningful barrier without degrading the human reading experience.",
    ],
};

export default function ReRendersPage() {
    /* ── 1. Auto-incrementing counter ── */
    const [count, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setCount((c) => c + 1), 1000);
        return () => clearInterval(id);
    }, []);

    /* ── 2. Controlled input that triggers article re-render ── */
    const [inputValue, setInputValue] = useState("");

    /* ── 6. Theme toggle between article versions ── */
    const [themeA, setThemeA] = useState(true);
    const article = themeA ? articleVersionA : articleVersionB;

    const toggleTheme = useCallback(() => setThemeA((prev) => !prev), []);

    return (
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Page header */}
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Re-Render Stress Test
                </h1>
                <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">
                    Tests aggressive React re-rendering patterns: counters,
                    controlled inputs, DOM recycling, innerHTML replacement,
                    theme swaps, and component remounting. Validates
                    double-encryption prevention, _cloakOriginal persistence, and
                    MutationObserver handling of rapid DOM changes.
                </p>
            </header>

            <div className="space-y-12">
                {/* ── Section 1: Live Counter ── */}
                <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        1. Auto-Incrementing Counter
                    </h2>
                    <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Re-renders a paragraph every second. Tests that encrypted
                        text nodes are not re-encrypted on each render cycle.
                    </p>
                    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                            This paragraph has been rendered{" "}
                            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                                {count}
                            </span>{" "}
                            times since the page loaded. The surrounding text content
                            should remain correctly encrypted regardless of how many
                            re-renders have occurred. Each tick updates the virtual DOM,
                            and React reconciliation determines which actual DOM nodes
                            change.
                        </p>
                    </div>
                </section>

                {/* ── Section 2: Controlled Input ── */}
                <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        2. Controlled Input with Article Re-render
                    </h2>
                    <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Every keystroke triggers a state change that re-renders the
                        article below. Tests high-frequency re-renders from user
                        input.
                    </p>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type here to trigger re-renders..."
                        className="mb-4 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-blue-800"
                    />

                    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                        <p className="mb-2 text-xs text-zinc-400 dark:text-zinc-500">
                            Current input: &quot;{inputValue || "(empty)"}&quot;
                        </p>
                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                            Artificial intelligence continues to reshape the
                            boundaries of scientific research. In laboratories around
                            the world, machine learning algorithms analyze vast
                            datasets that would take human researchers decades to
                            process manually. Protein folding predictions, drug
                            interaction modeling, and climate simulation have all
                            benefited enormously from computational approaches. The
                            challenge now is not whether AI can accelerate discovery
                            but how to ensure its applications remain aligned with
                            human values and scientific integrity. Every character
                            typed in the input above causes this entire block to
                            re-render through React state propagation.
                        </p>
                    </div>
                </section>

                {/* ── Section 3: Shuffle List ── */}
                <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        3. Shuffleable List (DOM Node Recycling)
                    </h2>
                    <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Twenty items that can be randomly reordered. Tests how
                        encryption handles DOM node recycling when React moves
                        elements via key-based reconciliation.
                    </p>
                    <ShuffleList />
                </section>

                {/* ── Section 4: innerHTML Replacement (Ad Slot) ── */}
                <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        4. innerHTML Replacement (Ad Slot Simulation)
                    </h2>
                    <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Content replaced via innerHTML every 5 seconds, bypassing
                        React entirely. Tests MutationObserver detection and
                        encryption of dynamically injected content.
                    </p>
                    <AdSlot />
                </section>

                {/* ── Section 5: Article with theme toggle ── */}
                <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        5. Theme Toggle (Full Article Swap)
                    </h2>
                    <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Swaps all text between two completely different article
                        versions. Tests bulk text replacement and re-encryption of
                        changed content while preserving unchanged shell elements.
                    </p>

                    <div className="mb-4 flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-700 active:bg-emerald-800"
                        >
                            Toggle Article Version
                        </button>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            Currently showing: Version{" "}
                            <span className="font-mono font-bold">
                                {themeA ? "A" : "B"}
                            </span>
                        </span>
                    </div>

                    <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                        <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {article.title}
                        </h3>
                        {article.paragraphs.map((p, i) => (
                            <p
                                key={`${themeA ? "a" : "b"}-${i}`}
                                className="mb-4 text-sm leading-relaxed text-zinc-700 last:mb-0 dark:text-zinc-300"
                            >
                                {p}
                            </p>
                        ))}
                    </article>
                </section>

                {/* ── Section 6: Carousel (Unmount/Remount) ── */}
                <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        6. Carousel (Unmount/Remount Cycle)
                    </h2>
                    <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Component fully unmounts and remounts every 10 seconds with
                        different content. Tests encryption of freshly mounted
                        components and cleanup of _cloakOriginal references on
                        unmounted nodes.
                    </p>
                    <Carousel />
                </section>
            </div>
        </div>
    );
}
