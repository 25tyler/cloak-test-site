"use client";

import { useState, useEffect } from "react";

const headlines = [
    "Breaking: Global markets rally as trade deal reaches final stage",
    "Tech giants announce joint AI safety initiative with unprecedented scope",
    "Climate summit yields historic agreement on carbon reduction targets",
    "Space agency confirms discovery of water on nearby exoplanet surface",
    "Major infrastructure bill passes with bipartisan support in Senate",
    "Researchers achieve breakthrough in quantum error correction methods",
    "Central bank signals shift in monetary policy for coming quarter",
    "Renewable energy surpasses fossil fuels in monthly power generation",
];

export default function LiveTicker() {
    const [index, setIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % headlines.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Server render shows a static placeholder; client rotates through headlines
    if (!mounted) {
        return (
            <div className="overflow-hidden rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950">
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    LIVE
                </p>
                <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">
                    Loading latest headlines...
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950">
            <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    LIVE
                </p>
            </div>
            <p
                className="mt-1 text-sm text-amber-900 transition-opacity duration-300 dark:text-amber-100"
                key={index}
            >
                {headlines[index]}
            </p>
        </div>
    );
}
