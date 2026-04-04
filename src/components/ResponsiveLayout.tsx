"use client";

import { useState, useEffect } from "react";

interface ResponsiveLayoutProps {
    children: React.ReactNode;
}

export default function ResponsiveLayout({
    children,
}: ResponsiveLayoutProps) {
    const [layoutMode, setLayoutMode] = useState<
        "server" | "mobile" | "desktop"
    >("server");

    useEffect(() => {
        const updateLayout = () => {
            setLayoutMode(window.innerWidth >= 768 ? "desktop" : "mobile");
        };
        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    if (layoutMode === "server") {
        // SSR fallback — text here will be replaced after hydration
        return (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Optimized Layout
                </p>
                <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                    This article is optimized for your reading experience.
                    Content layout will adapt to your screen size for maximum
                    readability and comfort across all devices.
                </p>
                {children}
            </div>
        );
    }

    if (layoutMode === "mobile") {
        return (
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Mobile Reading Mode
                </p>
                <p className="mt-1 text-sm text-purple-600 dark:text-purple-400">
                    You are viewing the single-column mobile layout. Swipe
                    gestures are enabled for navigation between sections. Tap
                    any image to expand it full-screen for a better view on
                    smaller displays.
                </p>
                {children}
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Desktop Reading Mode
            </p>
            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                You are viewing the enhanced desktop layout with side-by-side
                content panels. Keyboard shortcuts are available: press J/K to
                scroll between sections, and press F to toggle focus mode for
                distraction-free reading.
            </p>
            {children}
        </div>
    );
}
