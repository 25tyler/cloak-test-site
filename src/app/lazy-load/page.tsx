"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Fake article content (200+ words each) ─────────────────────────── */

const articles: { title: string; body: string }[] = [
    {
        title: "The Architecture of Modern Web Browsers",
        body: `Modern web browsers are marvels of software engineering, comprising millions of lines of code organized into distinct subsystems that work in concert to render the pages we interact with daily. At the core sits the rendering engine, responsible for parsing HTML and CSS into a visual representation. Chromium uses Blink, Firefox relies on Gecko, and Safari leverages WebKit. Each engine implements the same web standards but with subtly different optimizations. The JavaScript engine, such as V8 in Chrome or SpiderMonkey in Firefox, compiles scripts into machine code at runtime using just-in-time compilation techniques that rival ahead-of-time compilers in performance. The networking stack handles HTTP requests, TLS handshakes, certificate validation, and connection pooling, all while respecting the same-origin policy and CORS headers that form the web's security model. The compositor thread takes painted layers and assembles them into the final frame, enabling smooth scrolling and animations even when the main thread is busy executing JavaScript. Browser extensions run in sandboxed processes with limited access to page content, communicating through message-passing APIs. Service workers intercept network requests and enable offline functionality, while Web Workers allow computationally expensive tasks to run without blocking the UI thread. Understanding these layers is essential for building performant web applications that work consistently across all major browsers.`,
    },
    {
        title: "Distributed Systems and Consensus Algorithms",
        body: `Distributed systems present some of the hardest problems in computer science, primarily because networks are unreliable, clocks drift, and nodes can fail at any moment. The CAP theorem, formalized by Eric Brewer, tells us that a distributed data store can provide at most two of three guarantees: consistency, availability, and partition tolerance. Since network partitions are inevitable in real-world deployments, engineers must choose between consistency and availability during a partition event. Consensus algorithms like Paxos, originally described by Leslie Lamport, and Raft, designed by Diego Ongaro and John Ousterhout for understandability, allow a cluster of nodes to agree on a single value even when some nodes fail. These algorithms form the backbone of systems like etcd, ZooKeeper, and CockroachDB. Two-phase commit ensures atomicity across distributed transactions but blocks if the coordinator fails. Three-phase commit addresses this at the cost of additional message rounds. Vector clocks and Lamport timestamps provide causal ordering of events without synchronized physical clocks. Conflict-free replicated data types, or CRDTs, allow concurrent updates on multiple replicas that automatically converge to the same state without coordination, making them ideal for collaborative editing applications. Google's Spanner uses GPS-synchronized atomic clocks to provide globally consistent reads, demonstrating that hardware innovations can shift the boundaries defined by theoretical impossibility results.`,
    },
    {
        title: "The Evolution of Cryptographic Protocols",
        body: `Cryptography has evolved dramatically from the simple substitution ciphers of antiquity to the sophisticated mathematical constructions that secure modern internet communications. The Data Encryption Standard, adopted in 1977, was the first widely deployed symmetric cipher, using a 56-bit key that was eventually rendered insecure by brute-force attacks. Its successor, the Advanced Encryption Standard, selected through a public competition won by the Rijndael cipher, uses 128, 192, or 256-bit keys and remains the gold standard for symmetric encryption. Public-key cryptography, independently discovered by Diffie-Hellman and RSA in the 1970s, revolutionized secure communication by allowing parties to establish shared secrets over insecure channels. Elliptic curve cryptography offers equivalent security with smaller key sizes, making it preferred for mobile and embedded devices. The Transport Layer Security protocol, currently at version 1.3, combines symmetric encryption, public-key authentication, and hash-based message authentication codes to secure virtually all web traffic. Post-quantum cryptography is an active area of research, with lattice-based schemes like CRYSTALS-Kyber and hash-based signatures like SPHINCS+ being standardized by NIST to resist attacks from future quantum computers. Zero-knowledge proofs allow one party to prove knowledge of a secret without revealing the secret itself, enabling privacy-preserving authentication and blockchain scaling solutions like zk-rollups.`,
    },
    {
        title: "Machine Learning Infrastructure at Scale",
        body: `Training large machine learning models requires infrastructure that can coordinate thousands of accelerators working in parallel on petabytes of data. Modern training clusters use GPU or TPU pods connected by high-bandwidth interconnects like NVLink and InfiniBand to minimize communication overhead during distributed training. Data parallelism splits training batches across workers, each computing gradients on its portion of data before synchronizing via all-reduce operations. Model parallelism splits the model itself across devices when it exceeds the memory of a single accelerator, requiring careful placement to minimize cross-device communication. Pipeline parallelism divides the model into stages and overlaps computation across micro-batches, achieving high utilization despite the sequential nature of forward and backward passes. Mixed-precision training uses 16-bit floating-point arithmetic for most operations while maintaining a 32-bit master copy of weights, reducing memory usage and increasing throughput on hardware with dedicated half-precision units. Gradient checkpointing trades computation for memory by recomputing intermediate activations during the backward pass instead of storing them. The training data pipeline must keep accelerators fed with preprocessed batches, often using distributed filesystems and prefetching strategies to avoid I/O bottlenecks. Fault tolerance mechanisms like periodic checkpointing and elastic training allow jobs to survive hardware failures without losing hours of computation. Hyperparameter tuning frameworks like Ray Tune and Optuna automate the search for optimal learning rates, batch sizes, and architectural choices across hundreds of parallel experiments.`,
    },
    {
        title: "Operating System Kernel Design Philosophies",
        body: `Operating system kernels mediate all interactions between software and hardware, making their design one of the most consequential decisions in systems engineering. Monolithic kernels like Linux run device drivers, filesystems, and networking stacks in kernel space, offering high performance through direct function calls but risking system-wide crashes from driver bugs. Microkernels like seL4 and MINIX 3 minimize the code running in privileged mode, implementing drivers and filesystems as user-space servers that communicate via message passing, improving reliability and security at the cost of inter-process communication overhead. Hybrid kernels, exemplified by Windows NT and macOS's XNU, attempt to combine the performance of monolithic designs with the modularity of microkernels by running some services in kernel space and others in user space. The scheduler, which decides which thread runs on which CPU core and for how long, dramatically affects system responsiveness and throughput. The Completely Fair Scheduler in Linux uses a red-black tree to maintain a timeline of virtual runtimes, ensuring proportional CPU allocation. Memory management involves virtual address spaces, page tables, demand paging, and copy-on-write optimizations that allow efficient process isolation and resource sharing. The virtual filesystem layer provides a uniform interface for accessing data stored on different physical media, from solid-state drives to network-attached storage. Modern kernels must also handle security primitives like capabilities, mandatory access controls, and address space layout randomization that protect against exploitation of software vulnerabilities.`,
    },
];

/* ── Image gallery data ──────────────────────────────────────────────── */

const galleryImages: { src: string; caption: string }[] = [
    {
        src: "https://picsum.photos/seed/gallery1/600/400",
        caption:
            "Sunset over the Pacific coast captured from a clifftop vantage point, showing layers of orange and purple clouds reflected in the calm ocean water below. The silhouettes of cypress trees frame the composition on either side.",
    },
    {
        src: "https://picsum.photos/seed/gallery2/600/400",
        caption:
            "An aerial photograph of terraced rice paddies in Southeast Asia during the growing season, with emerald green stalks rising from flooded fields that mirror the surrounding mountain peaks and scattered cumulus clouds.",
    },
    {
        src: "https://picsum.photos/seed/gallery3/600/400",
        caption:
            "A macro photograph of morning dew on a spider web stretched between two blades of grass, each droplet acting as a tiny lens that refracts the early sunlight into miniature rainbows against the blurred green background.",
    },
    {
        src: "https://picsum.photos/seed/gallery4/600/400",
        caption:
            "Street scene in a bustling Tokyo neighborhood at night, with neon signs in Japanese and English illuminating wet pavement after a rain shower, pedestrians carrying translucent umbrellas, and steam rising from a ramen stall.",
    },
    {
        src: "https://picsum.photos/seed/gallery5/600/400",
        caption:
            "The interior of a medieval cathedral showing ribbed vaulting and pointed arches characteristic of Gothic architecture, with colored light streaming through rose windows and casting geometric patterns on the stone floor.",
    },
    {
        src: "https://picsum.photos/seed/gallery6/600/400",
        caption:
            "A long-exposure photograph of star trails circling above a desert landscape, with the Milky Way's galactic core visible as a bright band and the silhouette of a lone Joshua tree in the foreground.",
    },
];

/* ── Comments data ───────────────────────────────────────────────────── */

const commentsData: { author: string; text: string; time: string }[] = [
    { author: "Alice Chen", text: "This is an incredibly detailed analysis. I especially appreciated the section on consensus algorithms and how they relate to real-world database implementations.", time: "2 hours ago" },
    { author: "Marcus Johnson", text: "Great write-up! One minor correction: the original Paxos paper was actually published in 1989, not 1990 as commonly cited.", time: "3 hours ago" },
    { author: "Priya Patel", text: "I've been working with CRDTs in production for the past year and can confirm they are game-changers for collaborative editing. The convergence guarantees simplify so much of the architecture.", time: "4 hours ago" },
    { author: "David Kim", text: "Would love to see a follow-up article that dives deeper into the practical differences between Raft and Paxos in production deployments.", time: "5 hours ago" },
    { author: "Elena Rodriguez", text: "The section on post-quantum cryptography is timely. NIST just finalized the CRYSTALS-Kyber standard and migration planning should start now.", time: "5 hours ago" },
    { author: "James Wright", text: "As someone who works on browser engines, I can vouch for the accuracy of the rendering pipeline description. The compositor thread explanation was spot-on.", time: "6 hours ago" },
    { author: "Fatima Al-Hassan", text: "The machine learning infrastructure section resonated with me. We recently migrated from data parallelism to a combination of tensor and pipeline parallelism and saw significant throughput improvements.", time: "7 hours ago" },
    { author: "Ryan O'Brien", text: "Excellent overview of kernel design philosophies. I would add that the performance gap between monolithic and microkernels has narrowed significantly with hardware-assisted virtualization.", time: "8 hours ago" },
    { author: "Sophia Liu", text: "This kind of comprehensive technical writing is rare. Bookmarked for future reference and sharing with my team.", time: "9 hours ago" },
    { author: "Nikolas Petrov", text: "The TLS 1.3 section could mention that the protocol reduced the handshake from two round-trips to one, which is a major latency improvement for mobile users.", time: "10 hours ago" },
    { author: "Amara Okafor", text: "I teach distributed systems at university and will definitely be recommending this article as supplementary reading for my students.", time: "11 hours ago" },
    { author: "Thomas Mueller", text: "Minor nitpick: seL4 is actually a formally verified microkernel, which is its primary distinguishing feature beyond just being a microkernel.", time: "12 hours ago" },
    { author: "Yuki Tanaka", text: "The gradient checkpointing explanation was the clearest I have ever read. It finally clicked for me why training large models is feasible on limited hardware.", time: "13 hours ago" },
    { author: "Isabella Martinez", text: "Would be interested in hearing your thoughts on how WebAssembly might change the browser architecture described in the first section.", time: "14 hours ago" },
    { author: "Liam Foster", text: "The vector clocks explanation could benefit from a concrete example showing how they detect concurrent updates in a replicated system.", time: "15 hours ago" },
    { author: "Aisha Mohammed", text: "As a security engineer, I appreciate the mention of ASLR and mandatory access controls. These are often overlooked in kernel design discussions.", time: "16 hours ago" },
    { author: "Christopher Park", text: "The comparison between GPU and TPU architectures for ML training would make a great companion piece to this article.", time: "17 hours ago" },
    { author: "Olivia Sanders", text: "I have been working on zk-rollup implementations and the zero-knowledge proof section accurately captures the current state of the technology.", time: "18 hours ago" },
    { author: "Rafael Costa", text: "The CFS scheduler description is accurate but I would add that BPF-based schedulers like sched_ext are changing how we think about scheduling policy.", time: "19 hours ago" },
    { author: "Hannah Berg", text: "Fantastic article. The breadth of topics covered while maintaining depth is impressive. Looking forward to more in this series.", time: "20 hours ago" },
];

/* ── Skeleton component ──────────────────────────────────────────────── */

function Skeleton({ lines = 6 }: { lines?: number }) {
    return (
        <div className="animate-pulse space-y-3">
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 rounded bg-zinc-200 dark:bg-zinc-800"
                    style={{ width: `${70 + Math.random() * 30}%` }}
                />
            ))}
        </div>
    );
}

/* ── LazySection: loads content when scrolled into view ───────────── */

function LazySection({
    id,
    children,
    onVisible,
}: {
    id: string;
    children: React.ReactNode;
    onVisible: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const triggered = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered.current) {
                    triggered.current = true;
                    onVisible();
                    observer.disconnect();
                }
            },
            { rootMargin: "200px 0px", threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [onVisible]);

    return (
        <div ref={ref} id={id} className="min-h-[200px]">
            {children}
        </div>
    );
}

/* ── Main page component ─────────────────────────────────────────────── */

export default function LazyLoadPage() {
    /* Track loaded state for each section independently */
    const [loadedArticles, setLoadedArticles] = useState<Record<number, boolean>>({});
    const [galleryLoaded, setGalleryLoaded] = useState(false);
    const [commentsLoaded, setCommentsLoaded] = useState(false);

    const loadArticle = useCallback((index: number) => {
        setTimeout(() => {
            setLoadedArticles((prev) => ({ ...prev, [index]: true }));
        }, 300);
    }, []);

    const loadGallery = useCallback(() => {
        setTimeout(() => setGalleryLoaded(true), 300);
    }, []);

    const loadComments = useCallback(() => {
        setTimeout(() => setCommentsLoaded(true), 300);
    }, []);

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            {/* ── Hero (visible immediately) ── */}
            <header className="mb-16">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Lazy-Loaded Content Test
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    This page tests how the Cloak SDK handles content that loads lazily as the
                    user scrolls. Each section below the fold uses an IntersectionObserver to
                    detect when it enters the viewport, then fetches its content with a simulated
                    network delay. The SDK must observe DOM mutations triggered by lazy loading,
                    encrypt newly inserted text nodes, upload the plaintext, and update its
                    internal position map as the page layout shifts. Scroll down to see each
                    section load in sequence.
                </p>
            </header>

            {/* ── Spacer to push content below fold ── */}
            <div className="h-[50vh]" aria-hidden="true" />

            {/* ── Lazy article sections ── */}
            {articles.map((article, i) => (
                <LazySection
                    key={i}
                    id={`article-${i}`}
                    onVisible={() => loadArticle(i)}
                >
                    <section className="mb-16 rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        {loadedArticles[i] ? (
                            <>
                                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {article.title}
                                </h2>
                                <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                                    {article.body}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="mb-4 h-7 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                                <Skeleton lines={8} />
                            </>
                        )}
                    </section>
                </LazySection>
            ))}

            {/* ── Image gallery section ── */}
            <LazySection id="gallery" onVisible={loadGallery}>
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Image Gallery
                    </h2>
                    {galleryLoaded ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {galleryImages.map((img, i) => (
                                <figure
                                    key={i}
                                    className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img.src}
                                        alt={`Gallery image ${i + 1}`}
                                        className="h-48 w-full object-cover"
                                        loading="lazy"
                                    />
                                    <figcaption className="p-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {img.caption}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="h-48 w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
                                    <div className="space-y-2 p-4">
                                        <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                                        <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </LazySection>

            {/* ── Comments section ── */}
            <LazySection id="comments" onVisible={loadComments}>
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Comments ({commentsData.length})
                    </h2>
                    {commentsLoaded ? (
                        <div className="space-y-4">
                            {commentsData.map((comment, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                            {comment.author}
                                        </span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                            {comment.time}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {comment.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                                        <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                                    </div>
                                    <Skeleton lines={2} />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </LazySection>

            {/* ── Footer indicator ── */}
            <div className="border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
                All sections loaded. Scroll back up to review encrypted content.
            </div>
        </div>
    );
}
