"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/* ── Generate 10,000 items ───────────────────────────────────────────── */

const TOTAL_ITEMS = 10_000;
const ITEM_HEIGHT = 88; /* px — fixed height per row */
const OVERSCAN = 5; /* extra rows rendered above/below viewport */

const categories = [
    "Engineering",
    "Science",
    "Design",
    "Security",
    "Infrastructure",
    "Data",
    "Product",
    "Research",
    "Operations",
    "Analytics",
];

const categoryColors: Record<string, string> = {
    Engineering: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Science: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Design: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Security: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Infrastructure: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Data: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    Product: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    Research: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    Operations: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Analytics: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
};

interface Item {
    id: number;
    title: string;
    description: string;
    category: string;
}

/* Deterministic pseudo-random from seed for consistent SSR/CSR */
function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const titles = [
    "Optimizing query execution plans for distributed databases",
    "Building resilient microservices with circuit breakers and retries",
    "Implementing zero-trust security models in cloud-native environments",
    "Designing accessible component libraries with ARIA best practices",
    "Scaling real-time data pipelines with Apache Kafka and Flink",
    "Reducing cold-start latency in serverless function deployments",
    "Automating infrastructure provisioning with Terraform modules",
    "Improving search relevance with hybrid vector-keyword retrieval",
    "Migrating monolithic applications to event-driven architectures",
    "Profiling memory allocations in garbage-collected runtimes",
    "Implementing end-to-end encryption for collaborative editing",
    "Benchmarking container runtimes across different CPU architectures",
    "Building type-safe API clients with code generation from OpenAPI specs",
    "Designing fault-tolerant distributed consensus for financial systems",
    "Optimizing neural network inference on edge devices with quantization",
    "Creating reproducible machine learning experiments with MLflow tracking",
    "Implementing rate limiting strategies for multi-tenant API gateways",
    "Building progressive web applications with offline-first data sync",
    "Analyzing cache hit ratios to optimize content delivery networks",
    "Designing database schemas for multi-tenant SaaS applications",
    "Implementing blue-green deployments with zero-downtime migrations",
    "Building custom static analysis tools for domain-specific languages",
    "Optimizing rendering performance in data-heavy dashboard applications",
    "Implementing differential privacy in user analytics pipelines",
    "Designing webhook delivery systems with guaranteed at-least-once semantics",
    "Building incremental computation frameworks for large-scale data processing",
    "Implementing observability with distributed tracing and structured logging",
    "Optimizing WebSocket connection management for real-time applications",
    "Designing plugin architectures with sandboxed execution environments",
    "Building automated performance regression detection in CI pipelines",
];

const descriptions = [
    "This approach leverages cost-based optimization to select the most efficient join strategies and index utilization patterns across distributed nodes.",
    "The circuit breaker pattern prevents cascading failures by monitoring error rates and temporarily halting requests to unhealthy downstream services.",
    "Zero-trust architectures verify every request regardless of network location, using mutual TLS and short-lived tokens for authentication.",
    "Accessible components use semantic HTML, keyboard navigation, screen reader announcements, and sufficient color contrast ratios.",
    "Kafka handles ingestion with exactly-once semantics while Flink processes streams with event-time windowing and watermark-based late data handling.",
    "Pre-warming strategies and optimized package sizes reduce cold starts from seconds to milliseconds for latency-sensitive workloads.",
    "Reusable Terraform modules encapsulate infrastructure patterns, enabling consistent provisioning across development and production environments.",
    "Hybrid retrieval combines dense vector embeddings with sparse BM25 scores using reciprocal rank fusion for improved result quality.",
    "Event sourcing captures all state changes as an immutable log, enabling temporal queries and simplifying integration between bounded contexts.",
    "Allocation profiling reveals hot paths that create excessive garbage collection pressure, guiding targeted optimization efforts.",
    "End-to-end encryption ensures that only intended recipients can read messages, even if the server infrastructure is compromised.",
    "Container runtime benchmarks measure startup time, memory overhead, and syscall throughput across ARM and x86 processor families.",
    "Generated API clients eliminate manual serialization code and provide compile-time guarantees that requests match the server contract.",
    "Byzantine fault tolerance algorithms ensure correct operation even when some participants behave maliciously or send conflicting messages.",
    "Post-training quantization reduces model weights from 32-bit to 8-bit integers with minimal accuracy loss for edge deployment.",
    "MLflow tracks parameters, metrics, and artifacts across experiment runs, enabling reproducible comparisons and model registry management.",
    "Token bucket and sliding window algorithms enforce per-tenant rate limits while allowing controlled bursting during traffic spikes.",
    "Service workers cache critical resources and sync local changes when connectivity resumes, providing seamless offline user experiences.",
    "Cache analytics identify content popularity distributions and optimal TTL values to maximize hit ratios and reduce origin load.",
    "Row-level security policies and tenant ID columns provide data isolation in shared-table multi-tenant database architectures.",
    "Blue-green deployments maintain two identical production environments, switching traffic atomically after health checks pass on the new version.",
    "Custom linters enforce domain-specific invariants that general-purpose tools cannot detect, catching bugs before code reaches review.",
    "Virtual scrolling and canvas-based rendering reduce DOM node counts, keeping frame rates smooth even with thousands of data points.",
    "Differential privacy adds calibrated noise to aggregated queries, providing formal guarantees about individual data point protection.",
    "Exponential backoff with jitter and dead letter queues ensure webhook delivery even when recipient endpoints experience extended outages.",
    "Incremental computation caches intermediate results and recomputes only affected outputs when inputs change, dramatically reducing processing time.",
    "Distributed tracing correlates requests across service boundaries, while structured logging enables efficient querying of operational data.",
    "Connection pooling and heartbeat mechanisms maintain persistent WebSocket connections while gracefully handling network interruptions and reconnections.",
    "Plugin sandboxes use WebAssembly or V8 isolates to execute third-party code without risking host application stability or security.",
    "Automated performance tests compare metrics against historical baselines, flagging regressions before they reach production environments.",
];

function generateItems(): Item[] {
    const rng = mulberry32(42);
    const items: Item[] = [];
    for (let i = 0; i < TOTAL_ITEMS; i++) {
        items.push({
            id: i,
            title: titles[Math.floor(rng() * titles.length)],
            description: descriptions[Math.floor(rng() * descriptions.length)],
            category: categories[Math.floor(rng() * categories.length)],
        });
    }
    return items;
}

/* Generate once at module level */
const allItems = generateItems();

/* ── Virtual scroll component ────────────────────────────────────────── */

export default function VirtualScrollPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    /* Measure container on mount and resize */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const measure = () => setContainerHeight(el.clientHeight);
        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const handleScroll = useCallback(() => {
        const el = containerRef.current;
        if (el) setScrollTop(el.scrollTop);
    }, []);

    /* Calculate visible range */
    const totalHeight = TOTAL_ITEMS * ITEM_HEIGHT;
    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
    const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT) + 2 * OVERSCAN;
    const endIndex = Math.min(TOTAL_ITEMS - 1, startIndex + visibleCount);

    const visibleItems = allItems.slice(startIndex, endIndex + 1);

    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            {/* ── Header ── */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Virtual Scroll Test
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    This page renders a virtual list of {TOTAL_ITEMS.toLocaleString()} items but
                    only keeps roughly {Math.ceil(containerHeight / ITEM_HEIGHT) + 2 * OVERSCAN || 30} DOM
                    nodes at any time. As you scroll, items are removed from the top of the DOM
                    and new items are added at the bottom (and vice versa). The same DOM elements
                    get recycled with entirely different text content. This tests the Cloak SDK's
                    ability to detect DOM recycling via MutationObserver characterData changes on
                    already-encrypted nodes, re-encrypt recycled content, and maintain accurate
                    position maps as the visible window shifts.
                </p>
            </header>

            {/* ── Stats bar ── */}
            <div className="mb-4 flex items-center gap-4 rounded-lg bg-zinc-100 px-4 py-3 text-sm dark:bg-zinc-800">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    Total items: {TOTAL_ITEMS.toLocaleString()}
                </span>
                <span className="text-zinc-400">|</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                    DOM nodes: {visibleItems.length}
                </span>
                <span className="text-zinc-400">|</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                    Visible range: {startIndex.toLocaleString()} &ndash; {endIndex.toLocaleString()}
                </span>
                <span className="text-zinc-400">|</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                    Scroll: {Math.round(scrollTop).toLocaleString()}px
                </span>
            </div>

            {/* ── Virtual scroll container ── */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="relative overflow-y-scroll rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                style={{ height: "calc(100vh - 340px)" }}
            >
                {/* Total height spacer */}
                <div style={{ height: totalHeight, position: "relative" }}>
                    {visibleItems.map((item) => (
                        <div
                            key={item.id}
                            data-item-id={item.id}
                            className="absolute left-0 right-0 border-b border-zinc-100 px-5 dark:border-zinc-800"
                            style={{
                                height: ITEM_HEIGHT,
                                transform: `translateY(${item.id * ITEM_HEIGHT}px)`,
                            }}
                        >
                            <div className="flex h-full flex-col justify-center">
                                <div className="mb-1 flex items-center gap-3">
                                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
                                        #{item.id + 1}
                                    </span>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        {item.title}
                                    </h3>
                                    <span
                                        className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[item.category]}`}
                                    >
                                        {item.category}
                                    </span>
                                </div>
                                <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Scroll-to controls ── */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Jump to:
                </span>
                {[0, 1000, 2500, 5000, 7500, 9999].map((idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            const el = containerRef.current;
                            if (el) el.scrollTop = idx * ITEM_HEIGHT;
                        }}
                        className="rounded-md bg-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                        #{(idx + 1).toLocaleString()}
                    </button>
                ))}
            </div>

            {/* ── Implementation notes ── */}
            <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    What This Tests
                </h2>
                <ul className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <li>
                        <strong className="text-zinc-800 dark:text-zinc-200">DOM recycling detection:</strong>{" "}
                        When items scroll out of view, their DOM nodes are removed and new nodes are
                        created for incoming items. The SDK must detect that previously encrypted
                        nodes have been removed and new unencrypted nodes have appeared.
                    </li>
                    <li>
                        <strong className="text-zinc-800 dark:text-zinc-200">characterData mutations:</strong>{" "}
                        If the SDK has already encrypted a text node and the virtual scroller
                        updates its textContent with new data, the MutationObserver must detect the
                        characterData change and re-encrypt the node.
                    </li>
                    <li>
                        <strong className="text-zinc-800 dark:text-zinc-200">Content fingerprinting:</strong>{" "}
                        The SDK should not assume that a DOM node at the same position contains the
                        same text. It must compare content fingerprints to detect when a recycled
                        node has been repopulated with different text.
                    </li>
                    <li>
                        <strong className="text-zinc-800 dark:text-zinc-200">High-frequency mutations:</strong>{" "}
                        Rapid scrolling generates many DOM mutations per frame. The SDK must batch
                        or debounce its processing to avoid performance degradation.
                    </li>
                    <li>
                        <strong className="text-zinc-800 dark:text-zinc-200">Position map accuracy:</strong>{" "}
                        The absolute positioning and transform-based layout mean that the visual
                        position of items changes continuously. The SDK's position map for search
                        highlighting must stay synchronized.
                    </li>
                </ul>
            </div>
        </div>
    );
}
