"use client";

import { useState, useEffect } from "react";

interface LiveStatsProps {
    serverReaders: number;
    serverShares: number;
    serverComments: number;
}

export default function LiveStats({
    serverReaders,
    serverShares,
    serverComments,
}: LiveStatsProps) {
    const [stats, setStats] = useState({
        readers: serverReaders,
        shares: serverShares,
        comments: serverComments,
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Simulate fetching "real" live stats that differ from server-rendered values
        const timeout = setTimeout(() => {
            setStats({
                readers: 14_832,
                shares: 2_947,
                comments: 573,
            });
        }, 800);

        // Simulate ongoing updates
        const interval = setInterval(() => {
            setStats((prev) => ({
                readers: prev.readers + Math.floor(Math.random() * 20),
                shares: prev.shares + Math.floor(Math.random() * 3),
                comments: prev.comments + Math.floor(Math.random() * 2),
            }));
        }, 5000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    const formatNumber = (n: number) => n.toLocaleString();

    return (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {mounted ? "Live Stats" : "Article Stats"}
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {formatNumber(stats.readers)}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {mounted ? "Reading now" : "Total readers"}
                    </p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {formatNumber(stats.shares)}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Shares
                    </p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {formatNumber(stats.comments)}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Comments
                    </p>
                </div>
            </div>
            {mounted && (
                <p className="mt-2 text-center text-xs text-green-600 dark:text-green-400">
                    Updating in real-time
                </p>
            )}
        </div>
    );
}
