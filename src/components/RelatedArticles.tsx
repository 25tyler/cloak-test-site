"use client";

import { useState, useEffect } from "react";

interface Article {
    title: string;
    excerpt: string;
    readTime: string;
    category: string;
}

const serverPlaceholders: Article[] = [
    {
        title: "Understanding Modern Web Architecture",
        excerpt:
            "A comprehensive overview of how modern web applications are built and deployed across distributed systems.",
        readTime: "8 min read",
        category: "Technology",
    },
    {
        title: "The Future of Digital Publishing",
        excerpt:
            "How publishers are adapting to the changing landscape of content distribution and monetization.",
        readTime: "6 min read",
        category: "Media",
    },
    {
        title: "Data Privacy in the AI Era",
        excerpt:
            "Examining the intersection of artificial intelligence and personal data protection regulations.",
        readTime: "10 min read",
        category: "Privacy",
    },
];

const clientArticles: Article[] = [
    {
        title: "Hydration Pitfalls Every Developer Should Know",
        excerpt:
            "Server-side rendering introduces subtle bugs when client-side JavaScript takes over. Here are the most common traps and how to avoid them in production.",
        readTime: "12 min read",
        category: "Engineering",
    },
    {
        title: "Why Content Protection Matters More Than Ever",
        excerpt:
            "As AI scrapers become more sophisticated, publishers need robust strategies to protect their intellectual property from unauthorized training data collection.",
        readTime: "7 min read",
        category: "Security",
    },
    {
        title: "Font-Based Encryption: A Novel Approach",
        excerpt:
            "Exploring how custom font glyph remapping can create a human-readable but machine-unreadable layer of content protection for web publishers.",
        readTime: "9 min read",
        category: "Cryptography",
    },
];

interface RelatedArticlesProps {
    initialArticles?: Article[];
}

export default function RelatedArticles({
    initialArticles,
}: RelatedArticlesProps) {
    const [articles, setArticles] = useState<Article[]>(
        initialArticles ?? serverPlaceholders
    );
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Simulate an API fetch that replaces server-rendered placeholders
        const timeout = setTimeout(() => {
            setArticles(clientArticles);
            setLoaded(true);
        }, 1200);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {loaded ? "Recommended for You" : "Related Articles"}
            </h3>
            <div className="space-y-4">
                {articles.map((article, i) => (
                    <a
                        key={`${loaded ? "client" : "server"}-${i}`}
                        href="#"
                        className="block rounded-md p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                        <span className="mb-1 inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                            {article.category}
                        </span>
                        <h4 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {article.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {article.excerpt}
                        </p>
                        <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                            {article.readTime}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}
