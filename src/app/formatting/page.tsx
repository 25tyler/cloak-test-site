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
 *   - every semantic inline element
 *   - nested inline stacks
 *   - headings h1-h6, lists, tables, blockquotes, pre/code
 *   - figure/figcaption, details/summary, hr
 *   - typographic characters and br line breaks
 *   - **font substitution matrix** at the bottom — every proprietary
 *     font the SDK knows how to substitute, exercised with regular,
 *     bold, italic, and bold-italic so any weight/style resolution bug
 *     surfaces visually against /formatting-plain
 *
 * Search canary: every paragraph contains "the" at least once so a
 * Ctrl+F for "the" produces many matches and any walker drift shows up.
 */

// Every key here is a proprietary or system font the SDK should
// detect on the page and substitute via /api/sdk/resolve-system-font.
// Each row is rendered with the original font name in the CSS
// font-family stack — on /formatting the SDK swaps in the Google
// Fonts substitute; on /formatting-plain the browser falls through to
// whatever the OS has (or the next stack entry). The list is grouped
// by substitute so visual review can scan a category at a time.
//
// The label is the exact key from utils/system_fonts.py — keep them in
// sync. Adding a new entry to system_fonts.py? Add a row here too.
type FontTest = { label: string; substitute: string; family: string };
const FONT_GROUPS: { title: string; tests: FontTest[] }[] = [
    {
        title: "Apple SF family → Inter / Inter Tight / Nunito / JetBrains Mono",
        tests: [
            { label: "SF Pro", substitute: "Inter", family: '"SF Pro", sans-serif' },
            { label: "SF Pro Display", substitute: "Inter", family: '"SF Pro Display", sans-serif' },
            { label: "SF Pro Text", substitute: "Inter", family: '"SF Pro Text", sans-serif' },
            { label: "San Francisco", substitute: "Inter", family: '"San Francisco", sans-serif' },
            { label: "SF Compact", substitute: "Inter Tight", family: '"SF Compact", sans-serif' },
            { label: "SF Compact Display", substitute: "Inter Tight", family: '"SF Compact Display", sans-serif' },
            { label: "SF Compact Rounded", substitute: "Nunito", family: '"SF Compact Rounded", sans-serif' },
            { label: "SF Pro Rounded", substitute: "Nunito", family: '"SF Pro Rounded", sans-serif' },
            { label: "SF Mono", substitute: "JetBrains Mono", family: '"SF Mono", monospace' },
            { label: "SF Arabic", substitute: "IBM Plex Sans Arabic", family: '"SF Arabic", sans-serif' },
            { label: "SF Hebrew", substitute: "Heebo", family: '"SF Hebrew", sans-serif' },
        ],
    },
    {
        title: "system-ui invocations → Inter / Source Serif 4 / JetBrains Mono / Nunito",
        tests: [
            { label: "-apple-system", substitute: "Inter", family: '-apple-system, sans-serif' },
            { label: "BlinkMacSystemFont", substitute: "Inter", family: 'BlinkMacSystemFont, sans-serif' },
            { label: "system-ui", substitute: "Inter", family: 'system-ui, sans-serif' },
            { label: "ui-sans-serif", substitute: "Inter", family: 'ui-sans-serif, sans-serif' },
            { label: "ui-serif", substitute: "Source Serif 4", family: 'ui-serif, serif' },
            { label: "ui-monospace", substitute: "JetBrains Mono", family: 'ui-monospace, monospace' },
            { label: "ui-rounded", substitute: "Nunito", family: 'ui-rounded, sans-serif' },
        ],
    },
    {
        title: "Apple New York → Source Serif 4",
        tests: [
            { label: "New York", substitute: "Source Serif 4", family: '"New York", serif' },
            { label: "Apple New York", substitute: "Source Serif 4", family: '"Apple New York", serif' },
        ],
    },
    {
        title: "Classic Mac fonts → Inter / JetBrains Mono / Pinyon Script / EB Garamond",
        tests: [
            { label: "Geneva", substitute: "Inter", family: 'Geneva, sans-serif' },
            { label: "Charcoal", substitute: "Inter", family: 'Charcoal, sans-serif' },
            { label: "Chicago", substitute: "Inter", family: 'Chicago, sans-serif' },
            { label: "Monaco", substitute: "JetBrains Mono", family: 'Monaco, monospace' },
            { label: "Menlo", substitute: "JetBrains Mono", family: 'Menlo, monospace' },
            { label: "Apple Chancery", substitute: "Pinyon Script", family: '"Apple Chancery", cursive' },
            { label: "Apple Garamond", substitute: "EB Garamond", family: '"Apple Garamond", serif' },
            { label: "Skia", substitute: "Inter", family: 'Skia, sans-serif' },
        ],
    },
    {
        title: "Helvetica / Arial → Inter / Arimo / Anton / Roboto Condensed",
        tests: [
            { label: "Helvetica", substitute: "Inter", family: 'Helvetica, sans-serif' },
            { label: "Helvetica Neue", substitute: "Inter", family: '"Helvetica Neue", sans-serif' },
            { label: "Helvetica Inserat", substitute: "Anton", family: '"Helvetica Inserat", sans-serif' },
            { label: "Arial", substitute: "Arimo", family: 'Arial, sans-serif' },
            { label: "Arial Nova", substitute: "Arimo", family: '"Arial Nova", sans-serif' },
            { label: "Arial Narrow", substitute: "Roboto Condensed", family: '"Arial Narrow", sans-serif' },
            { label: "Arial Black", substitute: "Inter", family: '"Arial Black", sans-serif' },
            { label: "Liberation Sans", substitute: "Arimo", family: '"Liberation Sans", sans-serif' },
            { label: "Nimbus Sans", substitute: "Arimo", family: '"Nimbus Sans", sans-serif' },
        ],
    },
    {
        title: "Foundry sans-serifs → Nunito Sans / Jost / Cabin / Inter / Lato / Public Sans / Barlow / Libre Franklin / Source Sans 3",
        tests: [
            { label: "Avenir", substitute: "Nunito Sans", family: 'Avenir, sans-serif' },
            { label: "Avenir Next", substitute: "Nunito Sans", family: '"Avenir Next", sans-serif' },
            { label: "Avenir Next Condensed", substitute: "Barlow Condensed", family: '"Avenir Next Condensed", sans-serif' },
            { label: "Futura", substitute: "Jost", family: 'Futura, sans-serif' },
            { label: "ITC Avant Garde Gothic", substitute: "Jost", family: '"ITC Avant Garde Gothic", sans-serif' },
            { label: "Century Gothic", substitute: "Jost", family: '"Century Gothic", sans-serif' },
            { label: "Gill Sans", substitute: "Cabin", family: '"Gill Sans", sans-serif' },
            { label: "Gill Sans Nova", substitute: "Cabin", family: '"Gill Sans Nova", sans-serif' },
            { label: "Optima", substitute: "Inter", family: 'Optima, sans-serif' },
            { label: "Frutiger", substitute: "Lato", family: 'Frutiger, sans-serif' },
            { label: "Univers", substitute: "Public Sans", family: 'Univers, sans-serif' },
            { label: "Akzidenz-Grotesk", substitute: "Public Sans", family: '"Akzidenz-Grotesk", sans-serif' },
            { label: "DIN", substitute: "Barlow", family: 'DIN, sans-serif' },
            { label: "DIN Next", substitute: "Barlow", family: '"DIN Next", sans-serif' },
            { label: "Trade Gothic", substitute: "Barlow Condensed", family: '"Trade Gothic", sans-serif' },
            { label: "News Gothic", substitute: "Public Sans", family: '"News Gothic", sans-serif' },
            { label: "Franklin Gothic", substitute: "Libre Franklin", family: '"Franklin Gothic", sans-serif' },
            { label: "Myriad", substitute: "Source Sans 3", family: 'Myriad, sans-serif' },
            { label: "Myriad Pro", substitute: "Source Sans 3", family: '"Myriad Pro", sans-serif' },
        ],
    },
    {
        title: "Microsoft Office / Windows → Inter / Carlito / Caladea / Open Sans / JetBrains Mono / Caveat / Inconsolata / Comic Neue / Anton / Nunito",
        tests: [
            { label: "Segoe UI", substitute: "Inter", family: '"Segoe UI", sans-serif' },
            { label: "Segoe UI Light", substitute: "Inter", family: '"Segoe UI Light", sans-serif' },
            { label: "Segoe UI Semibold", substitute: "Inter", family: '"Segoe UI Semibold", sans-serif' },
            { label: "Segoe Print", substitute: "Caveat", family: '"Segoe Print", cursive' },
            { label: "Segoe Script", substitute: "Caveat", family: '"Segoe Script", cursive' },
            { label: "Calibri", substitute: "Carlito", family: 'Calibri, sans-serif' },
            { label: "Calibri Light", substitute: "Carlito", family: '"Calibri Light", sans-serif' },
            { label: "Cambria", substitute: "Caladea", family: 'Cambria, serif' },
            { label: "Constantia", substitute: "Source Serif 4", family: 'Constantia, serif' },
            { label: "Corbel", substitute: "Open Sans", family: 'Corbel, sans-serif' },
            { label: "Candara", substitute: "Open Sans", family: 'Candara, sans-serif' },
            { label: "Consolas", substitute: "JetBrains Mono", family: 'Consolas, monospace' },
            { label: "Tahoma", substitute: "Inter", family: 'Tahoma, sans-serif' },
            { label: "Verdana", substitute: "Inter", family: 'Verdana, sans-serif' },
            { label: "Trebuchet MS", substitute: "Inter", family: '"Trebuchet MS", sans-serif' },
            { label: "Lucida Sans", substitute: "Inter", family: '"Lucida Sans", sans-serif' },
            { label: "Lucida Grande", substitute: "Inter", family: '"Lucida Grande", sans-serif' },
            { label: "Lucida Bright", substitute: "Source Serif 4", family: '"Lucida Bright", serif' },
            { label: "Lucida Console", substitute: "Inconsolata", family: '"Lucida Console", monospace' },
            { label: "Comic Sans MS", substitute: "Comic Neue", family: '"Comic Sans MS", cursive' },
            { label: "Impact", substitute: "Anton", family: 'Impact, sans-serif' },
            { label: "Arial Rounded MT Bold", substitute: "Nunito", family: '"Arial Rounded MT Bold", sans-serif' },
        ],
    },
    {
        title: "Times / Georgia / serif families → Tinos / Gelasio / EB Garamond / Libre Baskerville / Libre Bodoni / Libre Caslon Text / Cardo / GFS Didot / Source Serif 4 / Cinzel",
        tests: [
            { label: "Times New Roman", substitute: "Tinos", family: '"Times New Roman", serif' },
            { label: "Times", substitute: "Tinos", family: 'Times, serif' },
            { label: "Liberation Serif", substitute: "Tinos", family: '"Liberation Serif", serif' },
            { label: "Nimbus Roman", substitute: "Tinos", family: '"Nimbus Roman", serif' },
            { label: "Georgia", substitute: "Gelasio", family: 'Georgia, serif' },
            { label: "Georgia Pro", substitute: "Gelasio", family: '"Georgia Pro", serif' },
            { label: "Palatino", substitute: "EB Garamond", family: 'Palatino, serif' },
            { label: "Palatino Linotype", substitute: "EB Garamond", family: '"Palatino Linotype", serif' },
            { label: "Book Antiqua", substitute: "EB Garamond", family: '"Book Antiqua", serif' },
            { label: "Garamond", substitute: "EB Garamond", family: 'Garamond, serif' },
            { label: "Adobe Garamond Pro", substitute: "EB Garamond", family: '"Adobe Garamond Pro", serif' },
            { label: "ITC Garamond", substitute: "EB Garamond", family: '"ITC Garamond", serif' },
            { label: "Baskerville", substitute: "Libre Baskerville", family: 'Baskerville, serif' },
            { label: "Mrs Eaves", substitute: "Libre Baskerville", family: '"Mrs Eaves", serif' },
            { label: "Bodoni", substitute: "Libre Bodoni", family: 'Bodoni, serif' },
            { label: "Bodoni 72", substitute: "Libre Bodoni", family: '"Bodoni 72", serif' },
            { label: "Caslon", substitute: "Libre Caslon Text", family: 'Caslon, serif' },
            { label: "Adobe Caslon Pro", substitute: "Libre Caslon Text", family: '"Adobe Caslon Pro", serif' },
            { label: "Big Caslon", substitute: "Libre Caslon Text", family: '"Big Caslon", serif' },
            { label: "Hoefler Text", substitute: "Cardo", family: '"Hoefler Text", serif' },
            { label: "Didot", substitute: "GFS Didot", family: 'Didot, serif' },
            { label: "Minion Pro", substitute: "Source Serif 4", family: '"Minion Pro", serif' },
            { label: "Trajan Pro", substitute: "Cinzel", family: '"Trajan Pro", serif' },
        ],
    },
    {
        title: "Monospace → Cousine / JetBrains Mono",
        tests: [
            { label: "Courier", substitute: "Cousine", family: 'Courier, monospace' },
            { label: "Courier New", substitute: "Cousine", family: '"Courier New", monospace' },
            { label: "Courier Prime", substitute: "Cousine", family: '"Courier Prime", monospace' },
            { label: "Liberation Mono", substitute: "Cousine", family: '"Liberation Mono", monospace' },
            { label: "Andale Mono", substitute: "JetBrains Mono", family: '"Andale Mono", monospace' },
            { label: "DejaVu Sans Mono", substitute: "JetBrains Mono", family: '"DejaVu Sans Mono", monospace' },
        ],
    },
    {
        title: "Script / decorative → Allura / Caveat / Great Vibes",
        tests: [
            { label: "Snell Roundhand", substitute: "Allura", family: '"Snell Roundhand", cursive' },
            { label: "Zapfino", substitute: "Allura", family: 'Zapfino, cursive' },
            { label: "Brush Script MT", substitute: "Caveat", family: '"Brush Script MT", cursive' },
            { label: "Lucida Calligraphy", substitute: "Allura", family: '"Lucida Calligraphy", cursive' },
            { label: "Edwardian Script ITC", substitute: "Great Vibes", family: '"Edwardian Script ITC", cursive' },
            { label: "Monotype Corsiva", substitute: "Great Vibes", family: '"Monotype Corsiva", cursive' },
        ],
    },
    {
        title: "Pass-through OFL fonts → identity (load directly from Google Fonts)",
        tests: [
            { label: "Inter", substitute: "Inter", family: 'Inter, sans-serif' },
            { label: "Roboto", substitute: "Roboto", family: 'Roboto, sans-serif' },
            { label: "Roboto Slab", substitute: "Roboto Slab", family: '"Roboto Slab", serif' },
            { label: "Roboto Mono", substitute: "Roboto Mono", family: '"Roboto Mono", monospace' },
            { label: "Open Sans", substitute: "Open Sans", family: '"Open Sans", sans-serif' },
            { label: "Lato", substitute: "Lato", family: 'Lato, sans-serif' },
            { label: "Source Sans 3", substitute: "Source Sans 3", family: '"Source Sans 3", sans-serif' },
            { label: "Source Serif 4", substitute: "Source Serif 4", family: '"Source Serif 4", serif' },
            { label: "JetBrains Mono", substitute: "JetBrains Mono", family: '"JetBrains Mono", monospace' },
            { label: "Source Code Pro", substitute: "Source Code Pro", family: '"Source Code Pro", monospace' },
            { label: "IBM Plex Sans", substitute: "IBM Plex Sans", family: '"IBM Plex Sans", sans-serif' },
            { label: "IBM Plex Serif", substitute: "IBM Plex Serif", family: '"IBM Plex Serif", serif' },
            { label: "IBM Plex Mono", substitute: "IBM Plex Mono", family: '"IBM Plex Mono", monospace' },
            { label: "Nunito", substitute: "Nunito", family: 'Nunito, sans-serif' },
            { label: "Mulish", substitute: "Mulish", family: 'Mulish, sans-serif' },
            { label: "Cormorant Garamond", substitute: "Cormorant Garamond", family: '"Cormorant Garamond", serif' },
            { label: "Lora", substitute: "Lora", family: 'Lora, serif' },
            { label: "Bebas Neue", substitute: "Bebas Neue", family: '"Bebas Neue", sans-serif' },
            { label: "Oswald", substitute: "Oswald", family: 'Oswald, sans-serif' },
            { label: "Lobster", substitute: "Lobster", family: 'Lobster, cursive' },
            { label: "Bungee", substitute: "Bungee", family: 'Bungee, sans-serif' },
        ],
    },
    {
        title: "Generic CSS family keywords → Inter / Source Serif 4 / JetBrains Mono / Caveat / Lobster",
        tests: [
            { label: "sans-serif", substitute: "Inter", family: 'sans-serif' },
            { label: "serif", substitute: "Source Serif 4", family: 'serif' },
            { label: "monospace", substitute: "JetBrains Mono", family: 'monospace' },
            { label: "cursive", substitute: "Caveat", family: 'cursive' },
            { label: "fantasy", substitute: "Lobster", family: 'fantasy' },
        ],
    },
];

// One row per font: shows the original font name as the label, then
// the same pangram in regular/bold/italic/bold-italic. Any weight or
// style resolution failure shows up as a row where bold matches
// regular, or italic matches upright.
function FontMatrixRow({ test }: { test: FontTest }) {
    const sample = "The quick brown fox jumps over the lazy dog 0123";
    return (
        <tr className="border-b border-zinc-200 align-top dark:border-zinc-800">
            <td className="py-2 pr-4 text-xs text-zinc-500 whitespace-nowrap">
                <div className="font-mono">{test.label}</div>
                <div className="text-[10px] text-zinc-400">→ {test.substitute}</div>
            </td>
            <td className="py-2 pr-3" style={{ fontFamily: test.family, fontWeight: 400, fontStyle: "normal" }}>
                {sample}
            </td>
            <td className="py-2 pr-3" style={{ fontFamily: test.family, fontWeight: 700, fontStyle: "normal" }}>
                {sample}
            </td>
            <td className="py-2 pr-3" style={{ fontFamily: test.family, fontWeight: 400, fontStyle: "italic" }}>
                {sample}
            </td>
            <td className="py-2" style={{ fontFamily: test.family, fontWeight: 700, fontStyle: "italic" }}>
                {sample}
            </td>
        </tr>
    );
}

export default function FormattingPage() {
    return (
        <>
            {/* Inter via Google Fonts. Cloak's detectGoogleFontsLinks
              * discovers fonts loaded this way and downloads + encrypts
              * every weight/style the page uses. Loading Inter (a real
              * downloadable web font) instead of relying on system-ui
              * gives a fair pixel-perfect comparison against
              * /formatting-plain — Apple's San Francisco system font
              * cannot be downloaded by anyone, so pages relying on it
              * cannot achieve byte-identical Cloak rendering. */}
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=block"
                rel="stylesheet"
            />
            <main
                className="mx-auto max-w-3xl px-4 py-12 text-zinc-900 dark:text-zinc-100"
                style={{ fontFamily: "Inter, sans-serif" }}
            >
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

                {/* ── Section 13: font substitution matrix ── */}
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    XIII. Font substitution matrix
                </h2>
                <p>
                    Every row below requests a proprietary or system
                    font by its real CSS name. On this page, the Cloak
                    SDK detects the font, looks it up in{" "}
                    <code>utils/system_fonts.py</code>, and downloads
                    the closest free Google Fonts substitute (shown in
                    grey under each label). On{" "}
                    <a href="/formatting-plain" className="text-indigo-600 underline dark:text-indigo-400">
                        /formatting-plain
                    </a>{" "}
                    the same rows render with whatever the operating
                    system has installed locally — diff the two pages
                    side-by-side to judge fidelity. Each row shows
                    regular, bold, italic, and bold-italic so any
                    weight or style resolution bug surfaces visibly
                    (bold matching regular, italic matching upright).
                </p>
                {FONT_GROUPS.map((group) => (
                    <section key={group.title} className="mt-8">
                        <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
                            {group.title}
                        </h3>
                        <div className="mt-3 overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="border-b-2 border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-700">
                                        <th className="py-2 pr-4">Font</th>
                                        <th className="py-2 pr-3">400</th>
                                        <th className="py-2 pr-3">700</th>
                                        <th className="py-2 pr-3">400 italic</th>
                                        <th className="py-2">700 italic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.tests.map((test) => (
                                        <FontMatrixRow key={test.label} test={test} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                ))}

                <p className="mt-10 text-sm text-zinc-500">
                    The end of the formatted article. Every paragraph,
                    every heading, every cell of the table, and every
                    row of the font substitution matrix should be
                    searchable. A Ctrl+F for the word <code>the</code>{" "}
                    ought to find every occurrence without any highlight
                    drifting past its target.
                </p>
            </article>
        </main>
        </>
    );
}
