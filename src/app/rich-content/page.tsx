export default function RichContentPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            {/* ── Article Header ── */}
            <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Investigative Report
                </p>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                    The Hidden Cost of Convenience: How Digital Infrastructure
                    Reshapes the Physical World
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    From undersea cables to lithium mines, the internet&apos;s
                    material footprint is far larger than most people realize. A
                    year-long investigation across four continents reveals the
                    environmental and human toll of our always-on digital lives.
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        By Camille Fournier
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime="2026-03-15">March 15, 2026</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>18 min read</span>
                </div>

                {/* Share widget with very short text nodes */}
                <div className="mt-6 flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Share
                    </span>
                    <button className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                        Tweet
                    </button>
                    <button className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                        Email
                    </button>
                    <button className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                        Copy
                    </button>
                    <button className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                        Save
                    </button>
                </div>
            </header>

            {/* ── Article Body ── */}
            <article className="prose prose-zinc dark:prose-invert prose-lg prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
                {/* ── Section 1: The Undersea Network ── */}
                <h2>The Undersea Network</h2>

                <p>
                    Beneath the surface of the world&apos;s oceans lies a web of
                    fiber optic cables that carries roughly 97 percent of all
                    intercontinental data traffic. These cables, some no thicker
                    than a garden hose, are the physical backbone of the global
                    internet. Without them, the $4.9 trillion digital economy
                    would grind to a halt within minutes.
                </p>

                <p>
                    The scale of this infrastructure is difficult to comprehend.
                    As of early 2026, more than 550 submarine cable systems
                    spanning approximately 1.4 million kilometers crisscross the
                    ocean floor. That is enough cable to wrap around the Earth 35
                    times. Each year, between 60 and 80 new cables are laid,
                    driven by insatiable demand for bandwidth from streaming
                    services, cloud computing, and artificial intelligence
                    workloads.
                </p>

                <blockquote>
                    <p>
                        &ldquo;People imagine the internet as something
                        ethereal, floating in the cloud. But every byte you send
                        travels through physical glass fibers lying on the ocean
                        floor, vulnerable to anchors, earthquakes, and
                        sharks.&rdquo;
                    </p>
                </blockquote>

                <p>
                    That quote comes from{" "}
                    <strong>Dr. Nicole Starosielski</strong>, a media studies
                    professor at the University of California, Berkeley, who has
                    spent over a decade documenting the undersea cable network.
                    Her research reveals that cable landing stations &mdash; the
                    buildings where submarine cables come ashore &mdash; are
                    often located in small coastal communities that bear
                    disproportionate environmental risk for infrastructure they
                    rarely benefit from directly.
                </p>

                <p>
                    In <em>Tonga</em>, a single submarine cable connects the
                    entire island nation to the global internet. When the
                    Hunga Tonga volcano erupted on January 15, 2022, the cable
                    was severed, plunging 100,000 people into digital darkness
                    for five weeks. The repair ship had to travel from Papua New
                    Guinea, arriving only after a 12-day journey across the
                    Pacific.
                </p>

                {/* ── Pull Quote ── */}
                <figure className="not-prose my-10 border-l-4 border-indigo-500 bg-indigo-50 px-6 py-5 dark:bg-indigo-950/30">
                    <blockquote className="text-xl font-medium italic leading-relaxed text-indigo-900 dark:text-indigo-200">
                        &ldquo;We talk about digital resilience in the abstract,
                        but for Pacific island nations it is brutally concrete:
                        one cable, one volcano, five weeks of silence.&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-indigo-700 dark:text-indigo-400">
                        &mdash; Dr. Joeli Veitayaki, University of the South
                        Pacific
                    </figcaption>
                </figure>

                {/* ── Section 2: Data Centers ── */}
                <h2>The Thirst of Data Centers</h2>

                <p>
                    If submarine cables are the arteries of the internet, data
                    centers are its beating heart. These warehouse-sized
                    facilities house the servers that store and process
                    everything from email to AI training runs. Globally, there
                    are now over 10,000 data centers, and the industry consumed
                    approximately 460 terawatt-hours of electricity in 2025
                    &mdash; more than the entire nation of France.
                </p>

                <p>
                    But electricity is only part of the story. Data centers
                    generate enormous amounts of heat, and most rely on water for
                    cooling. A single mid-sized facility can consume 3 to 5
                    million gallons of water per day, equivalent to the daily
                    usage of a town of 30,000 to 50,000 people. In drought-prone
                    regions like{" "}
                    <a href="https://example.com/arizona">
                        central Arizona
                    </a>{" "}
                    and{" "}
                    <a href="https://example.com/netherlands">
                        the Netherlands
                    </a>
                    , this has sparked fierce opposition from local communities.
                </p>

                <h3>Water Consumption by Provider (2025 Estimates)</h3>

                {/* ── Data Table ── */}
                <div className="not-prose overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-700">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                                <th className="px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                    Provider
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                    Region
                                </th>
                                <th className="px-4 py-3 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                                    Water (Billion Gal)
                                </th>
                                <th className="px-4 py-3 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                                    Energy (TWh)
                                </th>
                                <th className="px-4 py-3 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                                    Facilities
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                    Cooling Method
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {[
                                ["Amazon Web Services", "North America", "6.8", "78.2", "142", "Evaporative"],
                                ["Microsoft Azure", "Global", "5.4", "65.1", "118", "Hybrid air/water"],
                                ["Google Cloud", "Global", "4.3", "52.6", "96", "Recycled water"],
                                ["Meta Platforms", "North America", "3.1", "38.4", "54", "Evaporative"],
                                ["Oracle Cloud", "North America", "1.2", "14.7", "38", "Air-cooled"],
                                ["Equinix", "Global", "2.8", "31.3", "260", "Mixed"],
                                ["Digital Realty", "Global", "2.1", "24.8", "310", "Evaporative"],
                                ["China Telecom", "Asia-Pacific", "3.9", "42.1", "450", "Water-cooled"],
                                ["NTT Communications", "Asia-Pacific", "1.7", "19.5", "160", "Air-cooled"],
                                ["Hetzner", "Europe", "0.4", "5.2", "32", "Air-cooled"],
                                ["OVHcloud", "Europe", "0.9", "10.8", "44", "Liquid immersion"],
                                ["Alibaba Cloud", "Asia-Pacific", "2.6", "28.9", "200", "Evaporative"],
                            ].map(([provider, region, water, energy, facilities, cooling], i) => (
                                <tr
                                    key={i}
                                    className={
                                        i % 2 === 0
                                            ? "bg-white dark:bg-zinc-900"
                                            : "bg-zinc-50/50 dark:bg-zinc-800/25"
                                    }
                                >
                                    <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-100">
                                        {provider}
                                    </td>
                                    <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">
                                        {region}
                                    </td>
                                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
                                        {water}
                                    </td>
                                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
                                        {energy}
                                    </td>
                                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
                                        {facilities}
                                    </td>
                                    <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">
                                        {cooling}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p>
                    The numbers above are estimates compiled from corporate
                    sustainability reports and independent audits. The actual
                    figures are almost certainly higher, because many providers
                    report water usage only for owned facilities, excluding
                    leased colocation space.
                </p>

                {/* ── Section 3: Mining ── */}
                <h2>The Lithium Question</h2>

                <p>
                    Every server, every smartphone, every electric vehicle that
                    powers the green data center dream relies on lithium-ion
                    batteries. Global lithium demand reached 180,000 metric tons
                    in 2025, triple the level from just five years earlier, and
                    projections suggest it will exceed 500,000 metric tons by
                    2030.
                </p>

                <p>
                    The extraction process is {" "}
                    <strong>
                        environmentally devastating
                    </strong>
                    . In Chile&apos;s Atacama Desert, lithium brine evaporation
                    ponds consume 65 percent of the region&apos;s scarce water
                    supply. Indigenous Atacameno communities have watched
                    ancestral lagoons shrink and flamingo populations collapse.
                    In the Democratic Republic of Congo, cobalt mining &mdash;
                    another critical battery mineral &mdash; relies heavily on
                    artisanal miners, including an estimated 40,000 children
                    working in hazardous conditions for as little as $1.50 per
                    day.
                </p>

                {/* ── Ordered List ── */}
                <h3>Top Lithium-Producing Countries (2025)</h3>
                <ol>
                    <li>
                        <strong>Australia</strong> &mdash; 86,000 metric tons
                        from hard-rock spodumene mining in Western Australia
                    </li>
                    <li>
                        <strong>Chile</strong> &mdash; 44,000 metric tons from
                        brine extraction in the Salar de Atacama
                    </li>
                    <li>
                        <strong>China</strong> &mdash; 33,000 metric tons from a
                        mix of brine and hard-rock operations in Sichuan and
                        Jiangxi provinces
                    </li>
                    <li>
                        <strong>Argentina</strong> &mdash; 16,200 metric tons
                        from expanding brine operations in the Lithium Triangle
                    </li>
                    <li>
                        <strong>Brazil</strong> &mdash; 4,800 metric tons from
                        newly developed pegmatite deposits in Minas Gerais
                    </li>
                </ol>

                {/* ── Unordered List ── */}
                <h3>Key Environmental Impacts of Lithium Mining</h3>
                <ul>
                    <li>
                        Groundwater depletion in arid regions, affecting
                        agriculture and drinking water supplies
                    </li>
                    <li>
                        Soil contamination from chemical leaching agents used in
                        extraction
                    </li>
                    <li>
                        Loss of biodiversity, particularly in salt flat
                        ecosystems home to endemic species
                    </li>
                    <li>
                        Displacement of indigenous communities from ancestral
                        lands
                    </li>
                    <li>
                        Air pollution from dust and diesel equipment at open-pit
                        mines
                    </li>
                    <li>
                        Carbon emissions from processing and transportation of
                        raw materials
                    </li>
                    <li>
                        Waste disposal challenges, including toxic tailings ponds
                        that can leach into waterways
                    </li>
                </ul>

                {/* ── Section 4: E-Waste ── */}
                <h2>The E-Waste Crisis</h2>

                <p>
                    The other end of the hardware lifecycle is equally
                    troubling. The world generated 62 million metric tons of
                    electronic waste in 2025, up from 53.6 million tons in 2019.
                    Only 22.3 percent was formally collected and recycled. The
                    rest ended up in landfills, was incinerated, or was shipped
                    to developing countries where informal recyclers &mdash;
                    often working without protective equipment &mdash; burn
                    circuit boards to recover precious metals. The health
                    consequences include elevated rates of cancer, respiratory
                    disease, and neurological damage, particularly among
                    children.
                </p>

                <p>
                    Server hardware has a particularly short lifespan. Most data
                    center operators replace servers every 3 to 5 years to keep
                    pace with efficiency gains. A 2025 report from the Global
                    E-Waste Statistics Partnership estimated that data center
                    decommissions alone generated 4.8 million metric tons of
                    e-waste, including motherboards, memory modules, hard drives,
                    and power supplies containing lead, mercury, cadmium, and
                    brominated flame retardants.
                </p>

                {/* ── Figure with Caption ── */}
                <figure className="my-8">
                    <div className="flex h-48 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                        <span className="text-sm italic">
                            [Photograph: Workers sorting circuit boards at an
                            informal e-waste recycling site in Agbogbloshie,
                            Ghana. Credit: Reuters / Francis Kokoroko]
                        </span>
                    </div>
                    <figcaption>
                        At the Agbogbloshie scrapyard in Accra, Ghana, workers
                        process an estimated 250,000 tons of electronic waste
                        annually. Much of it originates from data center
                        decommissions in Europe and North America. Despite a
                        2019 government cleanup initiative, the site remains one
                        of the most polluted places on Earth.
                    </figcaption>
                </figure>

                {/* ── Section 5: Energy ── */}
                <h2>
                    Renewable Promises, Fossil Realities
                </h2>

                <p>
                    Tech companies have made ambitious renewable energy pledges.
                    Google claims to have matched 100 percent of its electricity
                    consumption with renewable purchases since 2017. Microsoft
                    has committed to being carbon negative by 2030. Amazon says
                    it is on track to power all operations with renewable energy
                    by 2025.
                </p>

                <p>
                    But these claims rely on a{" "}
                    <em>controversial accounting trick</em> called renewable
                    energy certificates. A company can purchase a certificate
                    from a wind farm in Norway to &ldquo;offset&rdquo; the
                    coal-powered electricity actually consumed by its data center
                    in Virginia. The electrons are not the same. The carbon was
                    still emitted. Critics call it greenwashing; the industry
                    calls it a bridge to a cleaner future.
                </p>

                <p>
                    The numbers tell a sobering story. Despite billions invested
                    in renewable procurement, the tech sector&apos;s absolute
                    carbon emissions rose 8.2 percent between 2023 and 2025,
                    driven almost entirely by the explosion in AI training and
                    inference workloads. Training a single large language model
                    can emit as much carbon dioxide as five cars produce over
                    their entire lifetimes 🔥 and the industry is training
                    hundreds of such models every year.
                </p>

                {/* ── Code Block (should be excluded from encryption) ── */}
                <h3>Estimating Carbon Footprint</h3>
                <p>
                    Researchers have developed tools to estimate the carbon cost
                    of computation. The following Python snippet, adapted from
                    the <code>codecarbon</code> library, demonstrates a basic
                    approach to tracking emissions during a machine learning
                    training run:
                </p>

                <pre>
                    <code>{`from codecarbon import EmissionsTracker

tracker = EmissionsTracker(
    project_name="llm-training-run",
    measure_power_secs=30,
    log_level="warning"
)

tracker.start()

# --- Training loop ---
for epoch in range(num_epochs):
    for batch in dataloader:
        loss = model(batch)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

emissions = tracker.stop()
print(f"Total emissions: {emissions:.4f} kg CO2eq")
print(f"Energy consumed: {tracker._total_energy.kWh:.2f} kWh")`}</code>
                </pre>

                <p>
                    The <code>EmissionsTracker</code> class reads power
                    consumption from hardware sensors (via Intel RAPL or NVIDIA
                    SMI) and cross-references it with the carbon intensity of the
                    local electrical grid. Results are logged to a{" "}
                    <code>emissions.csv</code> file for analysis. Most
                    researchers report values between{" "}
                    <code>0.001</code> and <code>500</code> kg CO2eq per
                    training run, depending on model size and hardware.
                </p>

                {/* ── Section 6: Policy ── */}
                <h2>The Policy Landscape</h2>

                <p>
                    Governments are beginning to respond, though unevenly. The
                    European Union&apos;s Energy Efficiency Directive, updated in
                    2024, now requires data centers above 500 kW to report
                    energy consumption, water usage, waste heat recovery rates,
                    and renewable energy share. Singapore imposed a moratorium on
                    new data center construction in 2019, only partially lifting
                    it in 2022 with strict green certification requirements.
                    Ireland, where data centers consume 21 percent of national
                    electricity, is considering similar restrictions.
                </p>

                <p>
                    In the United States, regulation remains fragmented. Virginia
                    &mdash; home to the world&apos;s densest concentration of
                    data centers in the so-called &ldquo;Data Center
                    Alley&rdquo; of Loudoun County &mdash; has offered generous
                    tax incentives that have attracted $50 billion in investment
                    since 2010. Local residents now face rising electricity costs
                    and a landscape dominated by windowless concrete buildings
                    the size of football fields. A proposed $3.5 billion
                    expansion by Amazon sparked a grassroots opposition movement
                    that collected over 12,000 signatures in just three weeks
                    ⚡ yet the county board approved the project unanimously.
                </p>

                {/* ── CSS text-transform test ── */}
                <div
                    className="not-prose my-8 rounded-lg bg-amber-50 p-6 dark:bg-amber-950/30"
                    style={{ textTransform: "uppercase" }}
                >
                    <p className="text-sm font-bold tracking-wider text-amber-800 dark:text-amber-300">
                        Editor&apos;s note: This section has CSS
                        text-transform uppercase applied. The SDK must handle
                        this correctly during encryption, ensuring the original
                        case is preserved in the encrypted output.
                    </p>
                </div>

                {/* ── Different font weights ── */}
                <h3>Impact by the Numbers</h3>
                <div className="not-prose my-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-zinc-100 p-4 text-center dark:bg-zinc-800">
                        <p className="text-2xl font-extralight tabular-nums text-zinc-900 dark:text-zinc-100">
                            460 TWh
                        </p>
                        <p className="mt-1 text-xs font-light text-zinc-500">
                            Annual energy consumption
                        </p>
                    </div>
                    <div className="rounded-lg bg-zinc-100 p-4 text-center dark:bg-zinc-800">
                        <p className="text-2xl font-normal tabular-nums text-zinc-900 dark:text-zinc-100">
                            $4.9T
                        </p>
                        <p className="mt-1 text-xs font-normal text-zinc-500">
                            Digital economy value
                        </p>
                    </div>
                    <div className="rounded-lg bg-zinc-100 p-4 text-center dark:bg-zinc-800">
                        <p className="text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
                            62M tons
                        </p>
                        <p className="mt-1 text-xs font-bold text-zinc-500">
                            Annual e-waste generated
                        </p>
                    </div>
                    <div className="rounded-lg bg-zinc-100 p-4 text-center dark:bg-zinc-800">
                        <p className="text-2xl font-black tabular-nums text-zinc-900 dark:text-zinc-100">
                            40,000
                        </p>
                        <p className="mt-1 text-xs font-black text-zinc-500">
                            Child cobalt miners (est.)
                        </p>
                    </div>
                </div>

                {/* ── Section 7: Solutions ── */}
                <h2>Paths Forward</h2>

                <p>
                    The picture is not entirely bleak. Genuine innovation is
                    happening at the intersection of sustainability and
                    computing. Liquid immersion cooling, pioneered by companies
                    like GRC and LiquidCool Solutions, can reduce data center
                    water consumption by up to 95 percent while improving energy
                    efficiency by 30 to 50 percent. Microsoft has experimented
                    with underwater data centers (Project Natick) and found that
                    the ocean&apos;s natural cooling reduced failure rates by a
                    factor of eight compared to land-based equivalents.
                </p>

                <p>
                    On the mining front, direct lithium extraction technologies
                    promise to recover lithium from brine with 90 percent less
                    water and 50 percent less land than traditional evaporation
                    ponds. Companies like Lilac Solutions and EnergyX have
                    demonstrated promising results at pilot scale, though
                    commercial deployment remains two to three years away. Urban
                    mining &mdash; recovering critical minerals from e-waste
                    &mdash; could eventually supply 25 to 30 percent of global
                    lithium demand, according to a 2026 study published in{" "}
                    <em>Nature Sustainability</em>.
                </p>

                <p>
                    Perhaps the most impactful change would be the simplest:
                    using less. Researchers at the University of Massachusetts
                    Amherst have shown that model distillation techniques can
                    reduce the computational cost of AI inference by 60 to 80
                    percent with minimal accuracy loss. Sparse architectures,
                    quantization, and more efficient training algorithms could
                    collectively reduce AI&apos;s carbon footprint by an order of
                    magnitude over the next decade &mdash; if the industry
                    prioritizes efficiency over raw capability 🚀 but the current
                    incentive structure rewards scale above all else.
                </p>

                {/* ── Second Pull Quote ── */}
                <figure className="not-prose my-10 border-l-4 border-rose-500 bg-rose-50 px-6 py-5 dark:bg-rose-950/30">
                    <blockquote className="text-xl font-medium italic leading-relaxed text-rose-900 dark:text-rose-200">
                        &ldquo;Efficiency gains are real, but they are being
                        swallowed by growth. We are running up a down
                        escalator.&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-rose-700 dark:text-rose-400">
                        &mdash; Dr. Kate Crawford, author of{" "}
                        <cite>Atlas of AI</cite>
                    </figcaption>
                </figure>

                {/* ── Section 8: Conclusion ── */}
                <h2>Conclusion: The Weight of Weightless Things</h2>

                <p>
                    The language we use to describe digital technology is
                    revealing. We speak of the &ldquo;cloud,&rdquo; of
                    &ldquo;wireless&rdquo; connections, of
                    &ldquo;virtual&rdquo; machines. These metaphors obscure a
                    vast physical infrastructure that consumes real resources,
                    occupies real land, and produces real pollution. Every search
                    query, every streamed video, every AI-generated image has a
                    material cost that is borne disproportionately by communities
                    far from the data centers and corporate headquarters where
                    the profits accumulate.
                </p>

                <p>
                    Acknowledging this reality is not an argument against
                    technology. It is an argument for honesty. The digital
                    economy has produced extraordinary benefits &mdash; in
                    communication, medicine, education, and scientific discovery.
                    But those benefits come with costs that have been
                    systematically externalized onto the environment and onto
                    vulnerable populations. As we build the next generation of
                    digital infrastructure to support AI, autonomous vehicles,
                    and the metaverse, we have a choice: we can continue to
                    pretend the cloud is weightless, or we can design systems
                    that account for their true cost.
                </p>

                <p>
                    The evidence gathered over this year-long investigation
                    points to a clear conclusion. The current trajectory is
                    unsustainable. The question is not whether the digital
                    economy will be forced to reckon with its physical footprint,
                    but when &mdash; and whether that reckoning will come through
                    deliberate policy choices or through the hard limits of a
                    finite planet.
                </p>

                {/* ── Exclusion Tests ── */}
                <hr className="my-10" />

                <h2>Exclusion Test Zones</h2>

                <p>
                    The following elements test the SDK&apos;s exclusion logic.
                    Text inside these zones should NOT be encrypted.
                </p>

                {/* contenteditable - should be excluded */}
                <h3>Editable Content (contenteditable)</h3>
                <div
                    contentEditable
                    suppressContentEditableWarning
                    className="not-prose rounded-lg border-2 border-green-300 bg-green-50 p-4 text-sm text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-green-700 dark:bg-green-950/30 dark:text-green-300"
                >
                    This text lives inside a contenteditable div and should NOT
                    be encrypted by the Cloak SDK. Users need to be able to
                    type here freely. Try editing this text to verify the element
                    remains interactive after SDK initialization.
                </div>

                {/* aria-hidden - should be excluded */}
                <h3>Hidden Content (aria-hidden)</h3>
                <div
                    aria-hidden="true"
                    className="not-prose rounded-lg border-2 border-purple-300 bg-purple-50 p-4 text-sm text-purple-800 dark:border-purple-700 dark:bg-purple-950/30 dark:text-purple-300"
                >
                    This text has aria-hidden set to true and should NOT be
                    encrypted. It is typically used for decorative or duplicated
                    content that screen readers should skip. The SDK should
                    also skip it to avoid interfering with accessibility
                    semantics.
                </div>

                {/* data-nosnippet - should be excluded */}
                <h3>No-Snippet Content (data-nosnippet)</h3>
                <div
                    data-nosnippet=""
                    className="not-prose rounded-lg border-2 border-orange-300 bg-orange-50 p-4 text-sm text-orange-800 dark:border-orange-700 dark:bg-orange-950/30 dark:text-orange-300"
                >
                    This text has the data-nosnippet attribute and should NOT
                    be encrypted. Google uses this attribute to exclude content
                    from search snippets. The Cloak SDK respects this signal
                    and leaves the text untouched.
                </div>

                {/* ── Footnotes ── */}
                <hr className="my-10" />

                <h2>Footnotes</h2>

                <ol className="text-sm">
                    <li id="fn-1">
                        TeleGeography, &ldquo;Submarine Cable Map
                        2026,&rdquo; accessed March 2026. Total cable length
                        based on active and planned systems.
                    </li>
                    <li id="fn-2">
                        International Energy Agency, &ldquo;Data Centres and
                        Data Transmission Networks,&rdquo; IEA Energy
                        Efficiency 2025 report, published November 2025.
                    </li>
                    <li id="fn-3">
                        Starosielski, Nicole.{" "}
                        <cite>The Undersea Network</cite>. Duke University
                        Press, 2015. Updated figures from personal
                        correspondence, January 2026.
                    </li>
                    <li id="fn-4">
                        U.S. Geological Survey, &ldquo;Mineral Commodity
                        Summaries: Lithium,&rdquo; January 2026. Production
                        figures for calendar year 2025.
                    </li>
                    <li id="fn-5">
                        Global E-Waste Statistics Partnership,{" "}
                        <cite>The Global E-Waste Monitor 2025</cite>, United
                        Nations University, 2025.
                    </li>
                    <li id="fn-6">
                        Crawford, Kate.{" "}
                        <cite>Atlas of AI: Power, Politics, and the
                        Planetary Costs of Artificial Intelligence</cite>.
                        Yale University Press, 2021.
                    </li>
                    <li id="fn-7">
                        Strubell, Emma, Ananya Ganesh, and Andrew McCallum.
                        &ldquo;Energy and Policy Considerations for Deep
                        Learning in NLP.&rdquo;{" "}
                        <cite>Proceedings of ACL 2019</cite>.
                    </li>
                    <li id="fn-8">
                        Patterson, David, et al. &ldquo;Carbon Emissions and
                        Large Neural Network Training.&rdquo;{" "}
                        <cite>arXiv:2104.10350</cite>, 2021. Updated
                        estimates for 2025 model sizes from the authors.
                    </li>
                </ol>
            </article>
        </div>
    );
}
