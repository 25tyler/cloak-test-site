"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const articles = [
    { href: "/spa-nav/article-1", label: "The Silent Revolution in Semiconductor Design" },
    { href: "/spa-nav/article-2", label: "How Mycorrhizal Networks Shape Forest Ecosystems" },
    { href: "/spa-nav/article-3", label: "The Economics of Orbital Manufacturing" },
];

export default function SpaNavLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Page header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    SPA Navigation Test
                </h1>
                <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">
                    Tests client-side navigation between pages using Next.js Link
                    components. No full page reloads occur when switching articles.
                    Validates SPA navigation detection via history.pushState,
                    resetEncryptionState, re-encryption of new route content, and
                    preservation of shared shell elements like the sidebar and
                    author bio.
                </p>
            </header>

            <div className="flex flex-col gap-8 lg:flex-row">
                {/* Sidebar navigation */}
                <nav className="shrink-0 lg:w-72">
                    <div className="sticky top-20 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                            Articles
                        </h2>
                        <ul className="space-y-1">
                            {articles.map((article) => {
                                const isActive = pathname === article.href;
                                return (
                                    <li key={article.href}>
                                        <Link
                                            href={article.href}
                                            className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-200"
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                {isActive && (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                                )}
                                                {article.label}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                            <p className="text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
                                This sidebar persists across navigations. The active
                                indicator updates without a full page reload. The
                                content area to the right is the only part that
                                changes during client-side transitions.
                            </p>
                        </div>
                    </div>
                </nav>

                {/* Content area */}
                <div className="min-w-0 flex-1">{children}</div>
            </div>
        </div>
    );
}
