"use client";

import { useEffect, useRef, useState } from "react";

const adContents = [
    {
        headline: "Transform your workflow with AI-powered automation",
        body: "Streamline repetitive tasks, boost productivity, and focus on what matters most. Our platform integrates seamlessly with your existing tools and scales with your team.",
        cta: "Start Free Trial",
    },
    {
        headline: "Enterprise-grade security for modern applications",
        body: "Protect your data with zero-trust architecture, end-to-end encryption, and real-time threat detection. Trusted by thousands of organizations worldwide.",
        cta: "Learn More",
    },
    {
        headline: "Build faster with our developer platform",
        body: "Ship features in hours, not weeks. Our comprehensive API, extensive documentation, and pre-built components help you move at startup speed with enterprise reliability.",
        cta: "Get Started",
    },
    {
        headline: "Cloud infrastructure that scales automatically",
        body: "Pay only for what you use. Auto-scaling compute, managed databases, and global CDN — everything you need to run applications at any scale without operational overhead.",
        cta: "Deploy Now",
    },
];

export default function AdSlot() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [adIndex, setAdIndex] = useState(0);
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!containerRef.current) return;

            const nextIndex = (adIndex + 1) % adContents.length;
            const ad = adContents[nextIndex];

            // Direct innerHTML replacement — simulates ad slot or widget refresh
            containerRef.current.innerHTML = `
                <div class="rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 p-5 dark:border-amber-600 dark:bg-amber-950/30">
                    <div class="mb-1 text-[10px] font-semibold uppercase tracking-widest text-amber-500 dark:text-amber-400">Sponsored</div>
                    <h4 class="mb-2 text-base font-bold text-amber-900 dark:text-amber-100">${ad.headline}</h4>
                    <p class="mb-3 text-sm leading-relaxed text-amber-800 dark:text-amber-200">${ad.body}</p>
                    <span class="inline-block rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">${ad.cta}</span>
                    <div class="mt-2 text-[10px] text-amber-400 dark:text-amber-500">Refresh #${refreshCount + 1}</div>
                </div>
            `;

            setAdIndex(nextIndex);
            setRefreshCount((c) => c + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, [adIndex, refreshCount]);

    const initialAd = adContents[0];

    return (
        <div ref={containerRef}>
            <div className="rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 p-5 dark:border-amber-600 dark:bg-amber-950/30">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-amber-500 dark:text-amber-400">
                    Sponsored
                </div>
                <h4 className="mb-2 text-base font-bold text-amber-900 dark:text-amber-100">
                    {initialAd.headline}
                </h4>
                <p className="mb-3 text-sm leading-relaxed text-amber-800 dark:text-amber-200">
                    {initialAd.body}
                </p>
                <span className="inline-block rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">
                    {initialAd.cta}
                </span>
                <div className="mt-2 text-[10px] text-amber-400 dark:text-amber-500">
                    Refresh #0
                </div>
            </div>
        </div>
    );
}
