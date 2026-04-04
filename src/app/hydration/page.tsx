import LiveTicker from "@/components/LiveTicker";
import LiveStats from "@/components/LiveStats";
import RelatedArticles from "@/components/RelatedArticles";
import TimeAgo from "@/components/TimeAgo";
import ResponsiveLayout from "@/components/ResponsiveLayout";

// Server-rendered timestamps — these will be replaced client-side with "X ago" text
const publishedDate = new Date(
    Date.now() - 3 * 60 * 60 * 1000
).toISOString(); // 3 hours ago
const updatedDate = new Date(Date.now() - 45 * 60 * 1000).toISOString(); // 45 min ago

export const metadata = {
    title: "Hydration Test - Cloak Test Site",
    description:
        "Tests SSR hydration scenarios where framework replaces DOM during hydration",
};

export default function HydrationTestPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Live news ticker — SSR shows placeholder, client rotates headlines */}
            <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mx-auto max-w-4xl">
                    <LiveTicker />
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Responsive layout banner — SSR generic, client adapts to viewport */}
                <div className="mb-6">
                    <ResponsiveLayout>
                        <span />
                    </ResponsiveLayout>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main article column */}
                    <article className="lg:col-span-2">
                        <header className="mb-8">
                            <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                                    Technology
                                </span>
                                <span>|</span>
                                <span>
                                    Published{" "}
                                    <TimeAgo dateString={publishedDate} />
                                </span>
                                <span>|</span>
                                <span>
                                    Updated{" "}
                                    <TimeAgo dateString={updatedDate} />
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                                The Invisible War for Web Content: How AI
                                Scrapers Are Reshaping the Internet
                            </h1>
                            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                                As large language models consume ever-larger
                                portions of the open web for training data,
                                publishers, developers, and content creators
                                find themselves in an escalating arms race to
                                protect their intellectual property while
                                maintaining accessibility for human readers.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        Eleanor Whitfield
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Senior Technology Correspondent
                                    </p>
                                </div>
                            </div>
                        </header>

                        {/* Live stats widget — SSR shows static numbers, client replaces */}
                        <div className="mb-8">
                            <LiveStats
                                serverReaders={8421}
                                serverShares={1563}
                                serverComments={342}
                            />
                        </div>

                        {/* Article body — long-form server-rendered content */}
                        <div className="prose prose-zinc max-w-none dark:prose-invert">
                            <h2>The Scale of the Problem</h2>
                            <p>
                                Every minute of every day, automated crawlers
                                visit millions of web pages, harvesting text,
                                images, and structured data to feed the
                                insatiable appetite of machine learning
                                pipelines. What was once a benign activity
                                carried out primarily by search engine indexers
                                has transformed into something far more
                                consequential. The data collected is no longer
                                merely indexed and linked back to its source. It
                                is absorbed, digested, and reconstituted into
                                the weights and biases of neural networks that
                                can reproduce its essence without attribution,
                                compensation, or even acknowledgment.
                            </p>
                            <p>
                                The numbers are staggering. Recent estimates
                                suggest that the Common Crawl dataset, one of
                                the most widely used training corpora, contains
                                over 250 billion pages of web content. Each
                                major AI laboratory maintains its own
                                proprietary crawling infrastructure, often
                                operating at scales that dwarf even the largest
                                search engines. A single training run for a
                                frontier model might consume the equivalent of
                                every article published by every major newspaper
                                in the English-speaking world over the past two
                                decades, combined with billions of blog posts,
                                forum discussions, academic papers, and
                                government documents.
                            </p>

                            <h2>Publishers Fight Back</h2>
                            <p>
                                The publishing industry, already battered by
                                decades of digital disruption, finds itself
                                facing a new existential threat. Unlike the
                                earlier challenges posed by aggregators and
                                social media platforms, which at least drove
                                traffic back to original sources, AI training
                                represents a one-way extraction of value. Once a
                                model has been trained on a publisher's content,
                                it can generate similar content indefinitely
                                without sending a single visitor to the original
                                site.
                            </p>
                            <p>
                                Several major publishers have already taken
                                legal action. The New York Times filed a
                                landmark lawsuit, and others have followed with
                                their own claims. But legal proceedings move
                                slowly, and the technology continues to advance
                                at breakneck speed. Many publishers have
                                concluded that they cannot wait for the courts
                                to settle the matter. They need technical
                                solutions that work today.
                            </p>
                            <p>
                                The most straightforward approach is the
                                robots.txt file, a decades-old convention that
                                tells well-behaved crawlers which parts of a
                                site they may and may not access. But this
                                relies entirely on voluntary compliance, and
                                many AI crawlers have been caught ignoring these
                                directives. Some companies have responded by
                                implementing more aggressive technical measures:
                                rate limiting, IP blocking, JavaScript
                                challenges, and browser fingerprinting. But
                                these approaches are blunt instruments that
                                often harm legitimate users and accessibility
                                tools while doing little to stop determined
                                scrapers.
                            </p>

                            <h2>
                                Font-Based Encryption: A New Frontier in Content
                                Protection
                            </h2>
                            <p>
                                A novel approach to content protection has
                                emerged from an unexpected corner of web
                                technology: font rendering. The basic insight is
                                elegant in its simplicity. Browsers render text
                                by mapping character codes to visual glyphs
                                using font files. If you change the mapping in
                                the font file, the same character code will
                                render as a completely different visual
                                character. To a human reader with the correct
                                font loaded, the text appears perfectly normal.
                                But to any automated system reading the raw
                                character codes, the text is unintelligible
                                gibberish.
                            </p>
                            <p>
                                This approach has several compelling advantages
                                over traditional content protection methods. It
                                requires no JavaScript execution to display the
                                protected content, which means it works even in
                                environments where scripts are blocked or
                                deferred. It is invisible to the end user
                                because the browser handles the glyph
                                substitution natively. And it is remarkably
                                resistant to automated extraction because the
                                encryption key is embedded in the font file
                                itself, which is a binary format that most
                                scraping tools do not attempt to parse.
                            </p>
                            <p>
                                The encryption process works in several stages.
                                First, the plaintext content is passed through a
                                Feistel cipher, a well-understood cryptographic
                                construction that maps each character to a
                                different character in a deterministic but
                                reversible way. The specific mapping is
                                determined by a secret key that is unique to
                                each page load or session. Second, a custom font
                                file is generated that reverses the cipher's
                                mapping at the glyph level. When the browser
                                renders the encrypted character codes using this
                                custom font, the visual output matches the
                                original plaintext exactly.
                            </p>

                            <h2>The Hydration Challenge</h2>
                            <p>
                                Modern web frameworks like React, Next.js, and
                                Vue introduce a particularly challenging
                                scenario for font-based content protection: the
                                hydration process. During server-side rendering,
                                the server generates static HTML that includes
                                the encrypted text and the appropriate font
                                reference. This HTML is sent to the client and
                                displayed immediately, providing a fast initial
                                render. So far, so good.
                            </p>
                            <p>
                                The problem arises when the client-side
                                JavaScript framework takes over. During
                                hydration, the framework walks the server-
                                rendered DOM tree and attaches event listeners,
                                initializes state, and in some cases, replaces
                                or modifies DOM nodes. If the framework replaces
                                a text node that was already encrypted, the
                                encryption system must detect this change and
                                re-encrypt the new content. If it fails to do
                                so, the user might see plaintext where they
                                should see rendered encrypted text, or worse,
                                they might see double-encrypted gibberish that
                                no font can decode.
                            </p>
                            <p>
                                This is not a hypothetical concern. Real-world
                                frameworks routinely replace DOM nodes during
                                hydration for several legitimate reasons. React,
                                for example, will replace server-rendered text
                                if the client-side render produces even slightly
                                different content. This happens with dates and
                                timestamps (which depend on the user's time
                                zone), with content that depends on browser
                                APIs like window dimensions, and with any
                                component that fetches data client-side to
                                replace server-rendered placeholders.
                            </p>

                            <h2>Detecting and Handling DOM Replacement</h2>
                            <p>
                                A robust content protection system must
                                therefore include sophisticated hydration
                                detection. The system needs to distinguish
                                between three scenarios: initial server-rendered
                                content that needs encryption, client-replaced
                                content that needs fresh encryption, and
                                already-encrypted content that should not be
                                encrypted again. Getting this wrong in any
                                direction leads to visible errors that
                                compromise either security or user experience.
                            </p>
                            <p>
                                The most reliable approach uses a combination of
                                MutationObserver, a browser API that fires
                                callbacks when the DOM changes, and an internal
                                cache of already-encrypted text nodes. When the
                                framework replaces a DOM node, the
                                MutationObserver detects the addition of new
                                nodes and checks whether they contain text that
                                needs encryption. The cache prevents double
                                encryption by tracking which specific text
                                content has already been processed. If a new
                                node contains text that matches something
                                already in the cache, the system knows to skip
                                it.
                            </p>
                            <p>
                                Additional safeguards include waiting for the
                                framework to signal that hydration is complete
                                before beginning the encryption process. In
                                Next.js, this can be detected by listening for
                                specific lifecycle events or by checking for the
                                presence of certain data attributes that the
                                framework adds after hydration. In React 18 and
                                later, the new concurrent rendering features add
                                further complexity because the framework may
                                perform hydration in multiple phases, with some
                                parts of the page becoming interactive before
                                others.
                            </p>

                            <h2>Performance Considerations</h2>
                            <p>
                                Content protection must not come at the cost of
                                user experience. The encryption process adds
                                latency to the initial page load, and the custom
                                font file adds bytes to the download. A
                                well-designed system minimizes both costs. Font
                                files can be aggressively cached because the
                                glyph mapping does not change once generated.
                                The encryption itself is computationally
                                lightweight, typically adding less than fifty
                                milliseconds even for long-form content. And the
                                MutationObserver-based detection system adds
                                negligible overhead because it processes only
                                the specific nodes that change, not the entire
                                document.
                            </p>
                            <p>
                                The real performance challenge lies in the
                                interaction between encryption and framework
                                rendering. If the encryption system processes a
                                node that the framework is about to replace, the
                                work is wasted. If it waits too long to process
                                nodes, the user sees a flash of unencrypted
                                content. The optimal strategy is to encrypt
                                server-rendered content during the initial parse
                                before the framework's JavaScript has even
                                loaded, then monitor for subsequent changes and
                                encrypt new content as it appears. This requires
                                careful ordering of script execution, typically
                                using a synchronous script in the document head
                                that registers the MutationObserver before any
                                framework code runs.
                            </p>

                            <h2>Looking Ahead</h2>
                            <p>
                                The arms race between content protection and AI
                                scraping shows no signs of abating. As models
                                become more capable, they may learn to parse
                                font files and reverse the glyph mapping. In
                                response, protection systems will likely evolve
                                to use more complex font transformations, such
                                as composite glyphs built from multiple
                                components, or variable font axes that encode
                                part of the decryption key in the font's design
                                space. The fundamental advantage of font-based
                                protection, however, remains: it leverages the
                                browser's native rendering pipeline, which means
                                it cannot be circumvented without actually
                                running a full browser environment, dramatically
                                increasing the cost and complexity of scraping.
                            </p>
                            <p>
                                For publishers and content creators, the message
                                is clear. The open web is changing, and those
                                who do not take active measures to protect their
                                content risk having their work absorbed into AI
                                systems without their consent or compensation.
                                Technical solutions like font-based encryption
                                are not perfect, but they represent a meaningful
                                layer of defense in what has become a critical
                                battle for the future of digital publishing. As
                                the technology matures and standardizes, it may
                                become as fundamental to web publishing as HTTPS
                                encryption is to web security: not optional, but
                                expected.
                            </p>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6 lg:col-span-1">
                        {/* Related articles — SSR placeholders, client replaces */}
                        <RelatedArticles />

                        {/* Additional sidebar content (static, server-rendered) */}
                        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Newsletter
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                Get the latest analysis on AI, content
                                protection, and digital publishing delivered to
                                your inbox every Tuesday and Friday morning. No
                                spam, no tracking pixels, just thoughtful
                                reporting from our technology desk.
                            </p>
                            <div className="mt-3">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                                />
                                <button className="mt-2 w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                About the Author
                            </h3>
                            <div className="flex items-start gap-3">
                                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        Eleanor Whitfield
                                    </p>
                                    <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        Eleanor has covered the intersection of
                                        technology and media for over fifteen
                                        years. Previously at Wired and The
                                        Verge, she now focuses on the evolving
                                        relationship between artificial
                                        intelligence and the publishing
                                        industry. She holds a masters degree in
                                        computer science from Stanford
                                        University.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Footer with another timestamp */}
                <footer className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        This article was first published{" "}
                        <TimeAgo dateString={publishedDate} /> and last updated{" "}
                        <TimeAgo dateString={updatedDate} />. All content is
                        subject to our editorial standards and corrections
                        policy. If you believe this article contains an error,
                        please contact our corrections team.
                    </p>
                </footer>
            </div>
        </div>
    );
}
