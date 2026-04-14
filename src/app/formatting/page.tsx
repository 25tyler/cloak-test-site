/**
 * Text Formatting Test Page.
 *
 * Exercises every inline and block-level text-formatting construct the
 * Cloak walker, encryption pass, and search highlighter might stumble
 * on. A sibling page at /formatting-plain contains the same prose with
 * minimal markup — diff the two to isolate formatting-specific bugs
 * from content-specific ones.
 *
 * Coverage:
 *   - every semantic inline element (em, strong, cite, q, dfn, abbr,
 *     var, samp, kbd, code, small, sub, sup, time, mark, ins, del, s,
 *     u, b, i, span)
 *   - nested inline stacks (strong>em, em>strong>code, etc.)
 *   - <a> with inline-wrapped labels
 *   - headings h1-h6
 *   - ordered, unordered, definition lists (with nesting)
 *   - blockquote with cite, inline q
 *   - <pre><code> block with preserved whitespace
 *   - <table> with thead/tbody/tfoot/th/td
 *   - typographic characters: smart quotes "" '' em-dash en-dash
 *     ellipsis NBSP thin-space middle-dot
 *   - <br> line breaks inside paragraphs and headings
 *   - <details>/<summary>
 *   - <hr>
 *   - <figure>/<figcaption>
 *   - superscript/subscript
 *   - whitespace-only text nodes between inline elements
 *
 * Search canary: every paragraph contains "the" at least once so a
 * Ctrl+F for "the" produces many matches and any walker drift shows up.
 */

export default function FormattingPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-12 text-zinc-900 dark:text-zinc-100">
            <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    SDK Diagnostic
                </p>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                    The <em>Craft</em> of <strong>Digital</strong> Typography
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Exercising every inline and block-level formatting
                    construct the Cloak SDK has to walk, encrypt, and
                    search through without drifting. The{" "}
                    <a href="/formatting-plain" className="text-indigo-600 underline dark:text-indigo-400">
                        plain version
                    </a>{" "}
                    contains the same prose with minimal markup.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                    <span>By</span>
                    <cite className="not-italic font-medium text-zinc-700 dark:text-zinc-300">
                        Lucia Reinhardt
                    </cite>
                    <span>&middot;</span>
                    <time dateTime="2026-04-14">April 14, 2026</time>
                </div>
            </header>

            <article className="space-y-6 text-lg leading-relaxed">
                {/* ── Section 1: every basic inline element ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    I. The <em>inline</em> taxonomy
                </h2>
                <p>
                    Typography has a grammar of its own. A reader scanning
                    the page trusts that <strong>bold</strong> text carries
                    weight, that <em>italic</em> text leans into a whisper,
                    and that <u>underlined</u> phrases announce a link or a
                    correction. <b>Presentational bold</b> and{" "}
                    <i>presentational italic</i> sit beside their semantic
                    cousins <strong>strong</strong> and <em>em</em> —
                    indistinguishable to the eye, distinguishable to the
                    machine.
                </p>
                <p>
                    Some inline elements exist purely to carry metadata. An{" "}
                    <abbr title="Hypertext Markup Language">HTML</abbr>{" "}
                    document uses <dfn>defining instances</dfn> to mark the
                    first mention of a term, <cite>citations</cite> to
                    reference other works, and{" "}
                    <q>inline quotations like this one</q> to embed short
                    passages without breaking flow. The text carries
                    structure the eye doesn&rsquo;t always notice.
                </p>
                <p>
                    Technical prose leans on another family of inline
                    wrappers. The variable <var>x</var> takes a value, the
                    example output <samp>Segmentation fault</samp> appears
                    on the terminal, and the user presses{" "}
                    <kbd>Ctrl</kbd>+<kbd>C</kbd> to escape. Short inline
                    snippets like <code>Array.prototype.map</code> live
                    inside <code>&lt;code&gt;</code> tags, while whole
                    blocks of source code take their own dedicated region
                    below.
                </p>
                <p>
                    The document can whisper as well as shout.{" "}
                    <small>
                        Fine print, footnotes, and legal disclaimers typeset
                        in a slightly smaller size.
                    </small>{" "}
                    Or it can speak mathematically: water is H
                    <sub>2</sub>O and the hypotenuse obeys a<sup>2</sup>{" "}
                    + b<sup>2</sup> = c<sup>2</sup>. The typographer is a
                    conductor and every inline element is an instrument.
                </p>

                {/* ── Section 2: nested stacks ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    II. <em>Deep</em> nesting
                </h2>
                <p>
                    Inline elements nest freely. A{" "}
                    <strong>
                        bold phrase can contain an{" "}
                        <em>italic clause</em> mid-sentence
                    </strong>
                    , and <em>
                        the italic clause can in turn contain{" "}
                        <strong>
                            a bolder emphasis{" "}
                            <code>
                                with a code span
                            </code>{" "}
                            tucked inside
                        </strong>
                    </em>
                    . Every opening tag splits the text node; every closing
                    tag resumes the parent&apos;s flow. The walker has to
                    count characters correctly across every boundary.
                </p>
                <p>
                    Links tangle deeper still.{" "}
                    <a href="#" className="text-indigo-600 underline dark:text-indigo-400">
                        A hyperlink can wrap{" "}
                        <strong>bold text</strong>
                    </a>{" "}
                    or sit{" "}
                    <strong>
                        inside a bold phrase that wraps{" "}
                        <a href="#" className="text-indigo-600 underline dark:text-indigo-400">
                            the link in turn
                        </a>
                    </strong>
                    . The difference is invisible to readers and essential
                    to browsers.
                </p>

                {/* ── Section 3: edit tracking ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    III. Tracked changes
                </h2>
                <p>
                    Drafts evolve. Editors mark the{" "}
                    <del>old phrasing</del>{" "}
                    <ins>revised phrasing</ins> side by side so collaborators
                    can follow the change. A <mark>highlighted phrase</mark>{" "}
                    draws attention without implying permanence, and a{" "}
                    <s>struck-through claim</s> signals that the statement
                    is known wrong but kept for context.
                </p>

                {/* ── Section 4: headings at every level ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    IV. The full heading ladder
                </h2>
                <p>
                    Headings anchor the document. The walker needs to
                    recognize each level as its own block and emit a
                    separator between them and the surrounding text.
                </p>
                <h3 className="text-2xl font-semibold">H3: The third step</h3>
                <p>
                    Smaller sections inside the page. Most articles live at
                    the H3 level for practical subdivision.
                </p>
                <h4 className="text-xl font-semibold">H4: A quieter voice</h4>
                <p>
                    By the fourth level the heading starts to feel like a
                    label rather than a title.
                </p>
                <h5 className="text-lg font-semibold">H5: Almost inline</h5>
                <p>
                    Rare in prose, common in reference manuals and change
                    logs.
                </p>
                <h6 className="text-base font-semibold">H6: The smallest</h6>
                <p>
                    The sixth heading level exists mostly for accessibility
                    trees and long-form documentation.
                </p>

                {/* ── Section 5: lists ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    V. Lists, ordered and otherwise
                </h2>
                <p>
                    A bulleted list with <strong>mixed inline content</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        The first item contains{" "}
                        <em>italic text</em> and a trailing period.
                    </li>
                    <li>
                        The second item holds an{" "}
                        <a href="#" className="text-indigo-600 underline dark:text-indigo-400">
                            inline link
                        </a>{" "}
                        mid-sentence.
                    </li>
                    <li>
                        The third item demonstrates{" "}
                        <code>inline code</code> inside a list item.
                    </li>
                    <li>
                        The fourth item nests a sub-list:
                        <ul className="list-disc pl-6 mt-1">
                            <li>Nested first</li>
                            <li>Nested second, with <strong>bold</strong></li>
                            <li>Nested third</li>
                        </ul>
                    </li>
                </ul>
                <p>An ordered list tests numeric item markers:</p>
                <ol className="list-decimal pl-6 space-y-1">
                    <li>Open the editor and place the cursor.</li>
                    <li>Type the paragraph into the empty field.</li>
                    <li>Commit the changes when the draft settles.</li>
                    <li>Push the branch and request a review.</li>
                </ol>
                <p>A definition list wraps terms and descriptions:</p>
                <dl className="space-y-2">
                    <dt className="font-semibold">Kerning</dt>
                    <dd className="pl-4">
                        The adjustment of space between two specific
                        characters in a proportional font.
                    </dd>
                    <dt className="font-semibold">Tracking</dt>
                    <dd className="pl-4">
                        The uniform adjustment of space across a run of
                        characters, sometimes called letter-spacing.
                    </dd>
                    <dt className="font-semibold">Leading</dt>
                    <dd className="pl-4">
                        The vertical distance between baselines of
                        consecutive lines of text, originally named for
                        strips of lead inserted between lines of metal type.
                    </dd>
                </dl>

                {/* ── Section 6: quotes ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    VI. Quoted material
                </h2>
                <blockquote className="border-l-4 border-zinc-300 pl-4 italic text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                    <p>
                        &ldquo;Typography is what language looks like. And
                        language is a tool we use when we need to do something
                        in the world.&rdquo;
                    </p>
                    <footer className="mt-2 text-sm not-italic text-zinc-500">
                        — <cite>Ellen Lupton</cite>,{" "}
                        <cite className="italic">Thinking with Type</cite>
                    </footer>
                </blockquote>
                <p>
                    A shorter thought may live inline: the author calls
                    this{" "}
                    <q>
                        the double bind of reading — the faster the eye
                        moves, the less it notices
                    </q>
                    , and yet the work of typography is to serve both
                    speeds at once.
                </p>

                {/* ── Section 7: pre/code ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    VII. Preformatted source
                </h2>
                <p>
                    A fenced block preserves every space and newline exactly
                    as written:
                </p>
                <pre className="overflow-x-auto rounded bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
{`function greet(reader) {
    const words = ["hello", "friend"];
    return words.join(" ") + ", " + reader + ".";
}

// The walker must preserve these lines verbatim.
greet("there");`}
                </pre>

                {/* ── Section 8: tables ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    VIII. Tabular data
                </h2>
                <p>
                    A small table shows the most common font weights and
                    their numeric aliases:
                </p>
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b-2 border-zinc-300 dark:border-zinc-700">
                            <th className="py-2 text-left">Weight name</th>
                            <th className="py-2 text-left">Numeric value</th>
                            <th className="py-2 text-left">CSS keyword</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <td className="py-2">Thin</td>
                            <td className="py-2">100</td>
                            <td className="py-2"><code>100</code></td>
                        </tr>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <td className="py-2">Light</td>
                            <td className="py-2">300</td>
                            <td className="py-2"><code>300</code></td>
                        </tr>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <td className="py-2">Regular</td>
                            <td className="py-2">400</td>
                            <td className="py-2">
                                <code>normal</code>
                            </td>
                        </tr>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <td className="py-2">Medium</td>
                            <td className="py-2">500</td>
                            <td className="py-2"><code>500</code></td>
                        </tr>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <td className="py-2">Semibold</td>
                            <td className="py-2">600</td>
                            <td className="py-2"><code>600</code></td>
                        </tr>
                        <tr>
                            <td className="py-2">Bold</td>
                            <td className="py-2">700</td>
                            <td className="py-2">
                                <code>bold</code>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="border-t-2 border-zinc-300 dark:border-zinc-700">
                            <td className="py-2 italic" colSpan={3}>
                                The numeric scale runs from 100 (Thin) to
                                900 (Black).
                            </td>
                        </tr>
                    </tfoot>
                </table>

                {/* ── Section 9: typographic characters ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    IX. Typographic characters
                </h2>
                <p>
                    The printer&rsquo;s apostrophe &mdash; that curly
                    glyph &lsquo;&rsquo; &ldquo;&rdquo; &mdash; is not the
                    same as the straight programmer&apos;s quote. An
                    em-dash&mdash;like this one&mdash;separates a strong
                    clause; an en-dash &ndash; like this one &ndash; spans
                    a range. An ellipsis&hellip; trails off. A middle dot
                    &middot; divides bullets. A non-breaking space (like
                    this:&nbsp;one) keeps words glued together across a
                    line wrap. The typographer cares about all of them.
                </p>

                {/* ── Section 10: line breaks ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    X. Inline line breaks
                </h2>
                <p>
                    A poem, forced into its lines by <code>&lt;br&gt;</code>:
                    <br />
                    The reader sets the pace,
                    <br />
                    but the line decides the cadence.
                    <br />
                    The break is the typesetter&apos;s baton.
                </p>

                {/* ── Section 11: figure/figcaption ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    XI. Figures
                </h2>
                <figure className="my-6 rounded border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex h-48 items-center justify-center bg-zinc-200 text-zinc-500 dark:bg-zinc-800">
                        [specimen placeholder]
                    </div>
                    <figcaption className="mt-2 text-sm italic text-zinc-600 dark:text-zinc-400">
                        Figure 1. A type specimen block. The caption
                        belongs to the figure and should be indexed by the
                        walker just like surrounding prose.
                    </figcaption>
                </figure>

                {/* ── Section 12: details/summary ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    XII. Disclosure widgets
                </h2>
                <details className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
                    <summary className="cursor-pointer font-semibold">
                        A collapsible note about em-dashes
                    </summary>
                    <p className="mt-2">
                        The em-dash is the most misused punctuation mark in
                        English prose. It can replace parentheses, colons,
                        or commas depending on the writer&apos;s intent.
                        Some style guides prohibit it in formal writing;
                        others celebrate it as the single most versatile
                        glyph in the punctuation family.
                    </p>
                </details>
                <details className="rounded border border-zinc-200 p-4 dark:border-zinc-800" open>
                    <summary className="cursor-pointer font-semibold">
                        Another disclosure, left open by default
                    </summary>
                    <p className="mt-2">
                        Some details elements ship with the{" "}
                        <code>open</code> attribute so their children
                        render immediately. This matters for the walker:
                        closed details content may be in the DOM but
                        hidden by a user agent rule, the same kind of
                        visibility gate the SDK has to honor.
                    </p>
                </details>

                <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

                <p className="text-sm text-zinc-500">
                    The end of the formatted article. Every paragraph,
                    every heading, every cell of the table should be
                    searchable. A Ctrl+F for the word <code>the</code>{" "}
                    ought to find every occurrence without any highlight
                    drifting past its target.
                </p>
            </article>
        </main>
    );
}
