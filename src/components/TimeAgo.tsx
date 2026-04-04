"use client";

import { useState, useEffect } from "react";

interface TimeAgoProps {
    dateString: string;
}

function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
        return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    }
    if (diffHours > 0) {
        return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    }
    if (diffMinutes > 0) {
        return diffMinutes === 1
            ? "1 minute ago"
            : `${diffMinutes} minutes ago`;
    }
    return "just now";
}

export default function TimeAgo({ dateString }: TimeAgoProps) {
    // Server renders the raw ISO date string; client replaces with relative time
    const [display, setDisplay] = useState(dateString);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setDisplay(getTimeAgo(dateString));

        const interval = setInterval(() => {
            setDisplay(getTimeAgo(dateString));
        }, 60_000);

        return () => clearInterval(interval);
    }, [dateString]);

    return (
        <time
            dateTime={dateString}
            className={
                mounted
                    ? "text-zinc-500 dark:text-zinc-400"
                    : "text-zinc-500 dark:text-zinc-400"
            }
            title={new Date(dateString).toLocaleString()}
        >
            {display}
        </time>
    );
}
