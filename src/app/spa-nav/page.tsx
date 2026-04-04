import Link from "next/link";

export default function SpaNavIndex() {
    return (
        <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Welcome to the SPA Navigation Test
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Select an article from the sidebar to begin testing client-side
                navigation. Each article contains over three hundred words of unique
                content. Navigating between articles uses Next.js Link components,
                which perform client-side transitions via history.pushState without
                triggering full page reloads. This tests whether the Cloak SDK
                correctly detects route changes, resets encryption state for stale
                content, and re-encrypts the new article content that appears in the
                DOM.
            </p>
            <div className="flex gap-3">
                <Link
                    href="/spa-nav/article-1"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700"
                >
                    Read Article 1
                </Link>
                <Link
                    href="/spa-nav/article-2"
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
                >
                    Read Article 2
                </Link>
                <Link
                    href="/spa-nav/article-3"
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
                >
                    Read Article 3
                </Link>
            </div>
        </div>
    );
}
