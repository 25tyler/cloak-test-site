/**
 * Plain (unformatted) sibling of /formatting.
 *
 * Contains the SAME prose content as /formatting but with minimal
 * markup: every paragraph is a single unbroken text node inside a
 * <p>, headings are plain <h2>s, and there are no inline elements,
 * no nested lists, no tables, no <code> spans, no smart quotes, no
 * line breaks, no figures, no details, no links.
 *
 * Use this page as a control: any bug that shows up on /formatting
 * but not on /formatting-plain is a formatting-specific bug.
 * Any bug that shows on both is a content-specific bug.
 */

export default function FormattingPlainPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-12 text-zinc-900 dark:text-zinc-100">
            <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    SDK Diagnostic
                </p>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                    The Craft of Digital Typography (plain)
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Same prose as the formatted version, stripped to
                    minimal markup. One paragraph, one text node. Use this
                    page to isolate formatting-specific bugs from
                    content-specific ones.
                </p>
                <p className="mt-4 text-sm text-zinc-500">
                    By Lucia Reinhardt. April 14, 2026.
                </p>
            </header>

            <article className="space-y-6 text-lg leading-relaxed">
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    I. The inline taxonomy
                </h2>
                <p>
                    Typography has a grammar of its own. A reader scanning the page trusts that bold text carries weight, that italic text leans into a whisper, and that underlined phrases announce a link or a correction. Presentational bold and presentational italic sit beside their semantic cousins strong and em, indistinguishable to the eye, distinguishable to the machine.
                </p>
                <p>
                    Some inline elements exist purely to carry metadata. An HTML document uses defining instances to mark the first mention of a term, citations to reference other works, and inline quotations like this one to embed short passages without breaking flow. The text carries structure the eye does not always notice.
                </p>
                <p>
                    Technical prose leans on another family of inline wrappers. The variable x takes a value, the example output Segmentation fault appears on the terminal, and the user presses Ctrl plus C to escape. Short inline snippets like Array.prototype.map live inside code tags, while whole blocks of source code take their own dedicated region below.
                </p>
                <p>
                    The document can whisper as well as shout. Fine print, footnotes, and legal disclaimers typeset in a slightly smaller size. Or it can speak mathematically: water is H2O and the hypotenuse obeys a squared plus b squared equals c squared. The typographer is a conductor and every inline element is an instrument.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    II. Deep nesting
                </h2>
                <p>
                    Inline elements nest freely. A bold phrase can contain an italic clause mid-sentence, and the italic clause can in turn contain a bolder emphasis with a code span tucked inside. Every opening tag splits the text node; every closing tag resumes the parent flow. The walker has to count characters correctly across every boundary.
                </p>
                <p>
                    Links tangle deeper still. A hyperlink can wrap bold text or sit inside a bold phrase that wraps the link in turn. The difference is invisible to readers and essential to browsers.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    III. Tracked changes
                </h2>
                <p>
                    Drafts evolve. Editors mark the old phrasing and the revised phrasing side by side so collaborators can follow the change. A highlighted phrase draws attention without implying permanence, and a struck-through claim signals that the statement is known wrong but kept for context.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    IV. The full heading ladder
                </h2>
                <p>
                    Headings anchor the document. The walker needs to recognize each level as its own block and emit a separator between them and the surrounding text.
                </p>
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    H3: The third step
                </h2>
                <p>
                    Smaller sections inside the page. Most articles live at the H3 level for practical subdivision.
                </p>
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    H4: A quieter voice
                </h2>
                <p>
                    By the fourth level the heading starts to feel like a label rather than a title.
                </p>
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    H5: Almost inline
                </h2>
                <p>
                    Rare in prose, common in reference manuals and change logs.
                </p>
                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    H6: The smallest
                </h2>
                <p>
                    The sixth heading level exists mostly for accessibility trees and long-form documentation.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    V. Lists, ordered and otherwise
                </h2>
                <p>
                    A bulleted list with mixed inline content:
                </p>
                <p>
                    The first item contains italic text and a trailing period.
                </p>
                <p>
                    The second item holds an inline link mid-sentence.
                </p>
                <p>
                    The third item demonstrates inline code inside a list item.
                </p>
                <p>
                    The fourth item nests a sub-list: nested first, nested second with bold, nested third.
                </p>
                <p>
                    An ordered list tests numeric item markers: open the editor and place the cursor, type the paragraph into the empty field, commit the changes when the draft settles, push the branch and request a review.
                </p>
                <p>
                    A definition list wraps terms and descriptions. Kerning is the adjustment of space between two specific characters in a proportional font. Tracking is the uniform adjustment of space across a run of characters, sometimes called letter-spacing. Leading is the vertical distance between baselines of consecutive lines of text, originally named for strips of lead inserted between lines of metal type.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    VI. Quoted material
                </h2>
                <p>
                    Typography is what language looks like. And language is a tool we use when we need to do something in the world. Ellen Lupton, Thinking with Type.
                </p>
                <p>
                    A shorter thought may live inline: the author calls this the double bind of reading, the faster the eye moves, the less it notices, and yet the work of typography is to serve both speeds at once.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    VII. Preformatted source
                </h2>
                <p>
                    A fenced block preserves every space and newline exactly as written: function greet reader, const words equals hello friend, return words joined by a space plus a comma plus reader plus a period. The walker must preserve these lines verbatim. greet there.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    VIII. Tabular data
                </h2>
                <p>
                    A small table shows the most common font weights and their numeric aliases: Thin 100, Light 300, Regular 400 which maps to normal, Medium 500, Semibold 600, and Bold 700 which maps to bold. The numeric scale runs from 100 Thin to 900 Black.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    IX. Typographic characters
                </h2>
                <p>
                    The printer apostrophe, that curly glyph, is not the same as the straight programmer quote. An em-dash, like this one, separates a strong clause. An en-dash, like this one, spans a range. An ellipsis trails off. A middle dot divides bullets. A non-breaking space keeps words glued together across a line wrap. The typographer cares about all of them.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    X. Inline line breaks
                </h2>
                <p>
                    A poem, forced into its lines by line breaks: the reader sets the pace, but the line decides the cadence, the break is the typesetter baton.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    XI. Figures
                </h2>
                <p>
                    Figure 1. A type specimen block. The caption belongs to the figure and should be indexed by the walker just like surrounding prose.
                </p>

                <h2 className="mt-10 text-3xl font-bold tracking-tight">
                    XII. Disclosure widgets
                </h2>
                <p>
                    A collapsible note about em-dashes. The em-dash is the most misused punctuation mark in English prose. It can replace parentheses, colons, or commas depending on the writer intent. Some style guides prohibit it in formal writing. Others celebrate it as the single most versatile glyph in the punctuation family.
                </p>
                <p>
                    Another disclosure, left open by default. Some details elements ship with the open attribute so their children render immediately. This matters for the walker: closed details content may be in the DOM but hidden by a user agent rule, the same kind of visibility gate the SDK has to honor.
                </p>

                <p className="text-sm text-zinc-500">
                    The end of the plain article. Every paragraph should be searchable. A Ctrl+F for the word the ought to find every occurrence without any highlight drifting past its target.
                </p>
            </article>
        </main>
    );
}
