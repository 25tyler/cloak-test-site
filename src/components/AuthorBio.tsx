export default function AuthorBio() {
    return (
        <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800/50">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                    EM
                </div>
                <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        Eleanor Mitchell
                    </h3>
                    <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                        Senior Technology Correspondent
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        Eleanor Mitchell has covered emerging technology and its societal
                        impact for over fifteen years. She previously reported for the
                        Global Science Monitor and holds a degree in computational
                        linguistics from the Massachusetts Institute of Technology. Her
                        work focuses on the intersection of artificial intelligence,
                        digital privacy, and the evolving information landscape.
                    </p>
                </div>
            </div>
        </aside>
    );
}
