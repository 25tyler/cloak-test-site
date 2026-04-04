"use client";

import { useState, useCallback } from "react";

const initialItems = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: [
        "Quantum computing breakthrough enables new cryptographic methods",
        "Ocean temperatures reach unprecedented levels in Pacific basin",
        "Autonomous vehicles navigate complex urban intersections safely",
        "Renewable energy surpasses fossil fuels in European grid output",
        "Machine learning detects early signs of neurological disorders",
        "Space telescope captures detailed images of exoplanet atmospheres",
        "Biodegradable plastics achieve commercial-scale manufacturing costs",
        "Gene therapy successfully treats inherited retinal conditions",
        "Underground fungal networks reveal complex forest communication",
        "Superconductor research achieves higher temperature thresholds",
        "Arctic permafrost thaw releases ancient microbial communities",
        "Brain-computer interfaces restore movement in paralysis patients",
        "Deep-sea mining regulations spark international policy debate",
        "Synthetic biology produces sustainable aviation fuel alternatives",
        "Coral reef restoration techniques show measurable ecosystem recovery",
        "Gravitational wave detectors identify new class of stellar events",
        "Urban farming technology feeds growing metropolitan populations",
        "Advanced battery chemistry doubles electric vehicle driving range",
        "CRISPR applications expand to treat cardiovascular disease markers",
        "Satellite constellation provides global broadband internet coverage",
    ][i],
}));

function shuffleArray<T>(arr: T[]): T[] {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function ShuffleList() {
    const [items, setItems] = useState(initialItems);
    const [shuffleCount, setShuffleCount] = useState(0);

    const handleShuffle = useCallback(() => {
        setItems((prev) => shuffleArray(prev));
        setShuffleCount((c) => c + 1);
    }, []);

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                <button
                    onClick={handleShuffle}
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-violet-700 active:bg-violet-800"
                >
                    Shuffle Items
                </button>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Shuffled {shuffleCount} time{shuffleCount !== 1 ? "s" : ""}
                </span>
            </div>

            <ol className="space-y-2">
                {items.map((item, index) => (
                    <li
                        key={item.id}
                        className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800"
                    >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                            {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                            {item.title}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
