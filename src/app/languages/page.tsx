/**
 * Languages test page.
 *
 * Each section below holds a short article in a different source
 * language (wrapped in `<article lang="xx">` so the browser's per-
 * selection language detector classifies it correctly). The purpose
 * is to test the right-click reveal + native browser translate flow:
 *
 *   1. Load the page. Every article renders as cipher-shaped-as-
 *      plaintext via Cloak's glyph-swap font — you see the original
 *      language visually, but document.body.innerText reads cipher.
 *   2. Right-click ANYWHERE on the page. Cloak swaps cipher to real
 *      plaintext in the DOM synchronously (before the menu opens).
 *   3. The browser context menu now shows "Translate to English"
 *      (whole page) OR, if you had text selected, "Translate '…'"
 *      (selection only). Pick one. The browser sends real text to
 *      Google/Apple/Bing and replaces the DOM with translated text.
 *
 * Tips:
 *   - Whole-page "Translate to English" uses the page's dominant
 *     language. Since this page mixes many languages, it will pick
 *     one (usually the first or longest) and translate everything
 *     assuming that language — results for the other sections may
 *     look odd.
 *   - For cleaner per-language tests, SELECT a paragraph before
 *     right-clicking. The menu offers "Translate '<selection>' to
 *     English", which auto-detects the selection's language
 *     independently and translates only that.
 *   - The per-section `lang` attribute also makes the auto-offer
 *     toolbar at the top-right more likely to fire on page load.
 */

const sections = [
    {
        lang: "es",
        name: "Spanish",
        nativeName: "Español",
        title: "La inteligencia artificial redefine el periodismo",
        paragraphs: [
            "La llegada de los modelos de lenguaje a gran escala ha cambiado profundamente la manera en que las redacciones producen y distribuyen contenido. Herramientas que antes requerían equipos enteros de investigadores ahora pueden ejecutarse en segundos, lo que plantea preguntas urgentes sobre la verificación, la atribución y el valor económico del trabajo periodístico original.",
            "Algunos editores ven en la automatización una oportunidad para ampliar su cobertura local; otros temen que los scrapers automatizados vacíen de sentido el modelo publicitario tradicional. Mientras tanto, los lectores se encuentran en medio de un panorama donde distinguir una fuente humana de una máquina es cada vez más difícil.",
        ],
    },
    {
        lang: "fr",
        name: "French",
        nativeName: "Français",
        title: "L'intelligence artificielle bouleverse le journalisme",
        paragraphs: [
            "L'arrivée des grands modèles de langage a profondément modifié la façon dont les rédactions produisent et diffusent l'information. Des tâches qui mobilisaient auparavant des équipes entières de chercheurs peuvent désormais s'exécuter en quelques secondes, ce qui soulève des questions urgentes sur la vérification, l'attribution et la valeur économique du travail journalistique original.",
            "Certains éditeurs voient dans l'automatisation une chance d'élargir leur couverture locale ; d'autres craignent que les scrapers automatisés ne vident de sens le modèle publicitaire traditionnel. Pendant ce temps, les lecteurs se retrouvent dans un paysage où distinguer une source humaine d'une machine devient chaque jour plus difficile.",
        ],
    },
    {
        lang: "de",
        name: "German",
        nativeName: "Deutsch",
        title: "Künstliche Intelligenz verändert den Journalismus",
        paragraphs: [
            "Die Einführung großer Sprachmodelle hat die Art und Weise, wie Redaktionen Inhalte produzieren und verbreiten, grundlegend verändert. Aufgaben, die früher ganze Teams von Rechercheuren erforderten, lassen sich nun in Sekunden erledigen – was drängende Fragen zu Verifikation, Quellenangabe und dem wirtschaftlichen Wert originaler journalistischer Arbeit aufwirft.",
            "Einige Verlage sehen in der Automatisierung eine Chance, ihre lokale Berichterstattung auszuweiten; andere fürchten, dass automatisierte Scraper das traditionelle Anzeigenmodell aushöhlen. Die Leser stehen mitten in einer Landschaft, in der es zunehmend schwieriger wird, eine menschliche Quelle von einer Maschine zu unterscheiden.",
        ],
    },
    {
        lang: "pt-BR",
        name: "Portuguese (Brazil)",
        nativeName: "Português",
        title: "A inteligência artificial redefine o jornalismo",
        paragraphs: [
            "A chegada dos grandes modelos de linguagem transformou profundamente a forma como as redações produzem e distribuem conteúdo. Tarefas que antes exigiam equipes inteiras de pesquisadores agora podem ser executadas em segundos, o que levanta questões urgentes sobre verificação, atribuição e o valor econômico do trabalho jornalístico original.",
            "Alguns editores enxergam na automação uma oportunidade de expandir sua cobertura local; outros temem que os scrapers automatizados esvaziem o modelo publicitário tradicional. Enquanto isso, os leitores se encontram em um cenário em que distinguir uma fonte humana de uma máquina se torna cada dia mais difícil.",
        ],
    },
    {
        lang: "ru",
        name: "Russian",
        nativeName: "Русский",
        title: "Искусственный интеллект меняет журналистику",
        paragraphs: [
            "Появление крупных языковых моделей коренным образом изменило способ, которым редакции производят и распространяют контент. Задачи, для которых раньше требовались целые команды исследователей, теперь могут выполняться за секунды, что поднимает острые вопросы о проверке фактов, атрибуции и экономической ценности оригинальной журналистской работы.",
            "Некоторые издатели видят в автоматизации возможность расширить местное освещение; другие опасаются, что автоматизированные скраперы лишат смысла традиционную рекламную модель. Тем временем читатели оказываются в ситуации, где отличить человеческий источник от машины становится всё сложнее.",
        ],
    },
    {
        lang: "ja",
        name: "Japanese",
        nativeName: "日本語",
        title: "人工知能がジャーナリズムを再定義する",
        paragraphs: [
            "大規模言語モデルの登場により、報道機関がコンテンツを制作・配信する方法は大きく変わりました。かつては専門の調査チーム全員を必要とした作業が、今では数秒で実行できるようになり、事実確認、出典表示、そしてオリジナルのジャーナリズム作品の経済的価値について、緊急の問いが投げかけられています。",
            "一部の出版社は、自動化をローカル報道を拡大する機会と見ていますが、自動化されたスクレイパーが従来の広告モデルを空洞化させることを恐れる声もあります。その一方で、読者は人間による情報源と機械による情報源を見分けることがますます難しい状況に置かれています。",
        ],
    },
    {
        lang: "zh-CN",
        name: "Chinese (Simplified)",
        nativeName: "中文",
        title: "人工智能重新定义新闻业",
        paragraphs: [
            "大型语言模型的出现深刻改变了新闻编辑部生产和分发内容的方式。过去需要整个研究团队才能完成的任务,现在几秒钟就能执行,这引发了关于事实核查、署名权以及原创新闻工作经济价值的紧迫问题。",
            "一些出版商认为自动化是扩大本地报道的机会;另一些人则担心自动化抓取工具会掏空传统的广告模式。与此同时,读者发现自己身处一个越来越难以区分人类来源与机器来源的环境中。",
        ],
    },
    {
        lang: "ar",
        name: "Arabic",
        nativeName: "العربية",
        title: "الذكاء الاصطناعي يعيد تعريف الصحافة",
        paragraphs: [
            "غيّر وصول نماذج اللغة الكبيرة بشكل جذري الطريقة التي تنتج بها غرف الأخبار المحتوى وتوزعه. فالمهام التي كانت تتطلب سابقاً فرقاً كاملة من الباحثين يمكن الآن تنفيذها في ثوانٍ، مما يطرح أسئلة ملحة حول التحقق وإسناد المصادر والقيمة الاقتصادية للعمل الصحفي الأصلي.",
            "يرى بعض الناشرين في الأتمتة فرصة لتوسيع التغطية المحلية؛ بينما يخشى آخرون من أن الكاشطات الآلية ستفرغ نموذج الإعلان التقليدي من مضمونه. في غضون ذلك، يجد القراء أنفسهم في مشهد أصبح فيه التمييز بين مصدر بشري ومصدر آلي أصعب يوماً بعد يوم.",
        ],
    },
];

export const metadata = {
    title: "Languages — Cloak Test",
    description:
        "Right-click and translate articles written in eight source languages.",
};

export default function LanguagesPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                    Right-click &rarr; Translate test
                </h1>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Eight articles, eight languages, all protected by Cloak.
                    Right-click anywhere to swap cipher to plaintext, then pick
                    &quot;Translate to English&quot; from the browser&apos;s
                    context menu.
                </p>
                <ol className="mt-6 list-decimal space-y-2 pl-6 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>
                        For per-language accuracy:{" "}
                        <strong className="text-zinc-900 dark:text-zinc-100">
                            select a paragraph first
                        </strong>
                        , then right-click. The menu will offer
                        &quot;Translate &#39;…&#39; to English&quot; and
                        auto-detect that paragraph&apos;s language.
                    </li>
                    <li>
                        For a whole-page translation, right-click with nothing
                        selected. The browser will pick the page&apos;s
                        dominant language (probably Spanish, since it&apos;s
                        first) and translate everything — mixed sections may
                        look odd.
                    </li>
                    <li>
                        On first right-click, Cloak sends an authorize-reveal
                        request to the server. This is charged against your
                        session&apos;s plaintext quota (shared with copy). On
                        every subsequent right-click on the same page the
                        reveal is free.
                    </li>
                </ol>
            </header>

            {sections.map((section) => (
                <article
                    key={section.lang}
                    lang={section.lang}
                    dir={section.lang === "ar" ? "rtl" : "ltr"}
                    className="mb-12 border-b border-zinc-100 pb-10 last:border-b-0 dark:border-zinc-800/50"
                >
                    <div
                        className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400"
                        lang="en"
                        dir="ltr"
                    >
                        {section.name} &middot;{" "}
                        <span lang={section.lang} dir="auto">
                            {section.nativeName}
                        </span>
                    </div>
                    <h2 className="mb-6 text-2xl font-bold leading-snug text-zinc-900 dark:text-zinc-50">
                        {section.title}
                    </h2>
                    {section.paragraphs.map((p, i) => (
                        <p
                            key={i}
                            className="mb-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
                        >
                            {p}
                        </p>
                    ))}
                </article>
            ))}
        </div>
    );
}
