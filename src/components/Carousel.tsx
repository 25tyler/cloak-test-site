"use client";

import { useEffect, useState } from "react";

const slides = [
    {
        title: "The Renaissance of Urban Architecture",
        content:
            "Modern cities are rediscovering the principles that made historic urban centers vibrant and livable. Architects are blending centuries-old design wisdom with cutting-edge materials science to create buildings that breathe, adapt, and respond to their inhabitants. Mixed-use developments with ground-floor retail, walkable streetscapes, and integrated green spaces are replacing the monolithic office towers and sprawling parking lots of the previous century.",
    },
    {
        title: "Advances in Marine Conservation",
        content:
            "Innovative approaches to ocean preservation are yielding remarkable results across tropical and temperate ecosystems. Scientists have developed coral propagation techniques that accelerate reef growth by orders of magnitude, while advanced monitoring satellites track illegal fishing activity in real time across vast stretches of open ocean. Community-based management programs empower coastal populations to protect their marine resources while maintaining sustainable livelihoods.",
    },
    {
        title: "The Future of Personalized Education",
        content:
            "Adaptive learning platforms are transforming how students engage with complex material across every discipline. These systems analyze individual comprehension patterns, identify knowledge gaps in real time, and dynamically adjust curriculum difficulty and presentation style. Students in pilot programs demonstrate significantly deeper retention and report greater satisfaction with their learning experience compared to traditional lecture-based instruction.",
    },
];

export default function Carousel() {
    const [mounted, setMounted] = useState(true);
    const [slideIndex, setSlideIndex] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);

    // Unmount and remount every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setMounted(false);

            // Remount after a brief delay
            setTimeout(() => {
                setSlideIndex((prev) => (prev + 1) % slides.length);
                setCycleCount((c) => c + 1);
                setMounted(true);
            }, 300);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        return (
            <div className="flex h-48 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
                <div className="flex items-center gap-3 text-zinc-400">
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
                    <span className="text-sm">Carousel remounting...</span>
                </div>
            </div>
        );
    }

    const slide = slides[slideIndex];

    return (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-2 rounded-full transition-colors ${
                                i === slideIndex
                                    ? "bg-teal-500"
                                    : "bg-zinc-300 dark:bg-zinc-600"
                            }`}
                        />
                    ))}
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    Cycle #{cycleCount} &middot; Slide {slideIndex + 1}/
                    {slides.length}
                </span>
            </div>

            <h4 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {slide.title}
            </h4>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {slide.content}
            </p>

            <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
                This component unmounts and remounts every 10 seconds to simulate
                a carousel or tab rotation. Watch the cycle counter increment.
            </p>
        </div>
    );
}
