'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// --- Article data generator ---
// Each "page" of 10 articles draws from a deterministic pool so content never repeats.

interface Article {
    id: number;
    headline: string;
    author: string;
    date: string;
    excerpt: string;
    category: string;
}

const CATEGORIES = [
    'AI & Machine Learning',
    'Startups',
    'Cybersecurity',
    'Cloud Computing',
    'Developer Tools',
    'Hardware',
    'Enterprise',
    'Open Source',
    'Fintech',
    'Robotics',
    'Climate Tech',
    'Quantum Computing',
    'Biotech',
    'Space Tech',
    'Privacy',
];

const AUTHORS = [
    'Sarah Chen',
    'Marcus Rivera',
    'Priya Sharma',
    'James O\'Brien',
    'Anika Patel',
    'David Kim',
    'Elena Volkov',
    'Tomasz Kowalski',
    'Fatima Al-Rashid',
    'Lucas Mendes',
    'Ingrid Bergstrom',
    'Kwame Asante',
    'Mei-Lin Wu',
    'Rafael Ortiz',
    'Chloe Dubois',
];

const HEADLINES: string[] = [
    'OpenAI Announces GPT-5 With Native Multimodal Reasoning Capabilities',
    'Stripe Acquires European Neobank for $2.1 Billion in All-Cash Deal',
    'Major Zero-Day Vulnerability Discovered in Popular Container Runtime',
    'AWS Launches Graviton5 Chips Promising 60% Performance Gains',
    'GitHub Copilot Workspace Now Generates Entire Pull Requests Autonomously',
    'Apple Vision Pro 2 Enters Mass Production Ahead of Holiday Launch',
    'Salesforce Lays Off 3,000 Employees as AI Reshapes Enterprise Sales',
    'Linux Kernel 7.0 Released With Rust Driver Support as Default',
    'Revolut Secures Full US Banking License After Three-Year Review',
    'Boston Dynamics Unveils Humanoid Robot That Learns Tasks From Video',
    'Google DeepMind Achieves Breakthrough in Protein Folding Prediction Accuracy',
    'Y Combinator Winter 2026 Batch Sets Record With 400 Startups Funded',
    'SolarWinds-Style Supply Chain Attack Targets NPM Package Ecosystem',
    'Microsoft Azure Outage Disrupts Services Across North America for Six Hours',
    'JetBrains Releases AI-Native IDE That Replaces Traditional Code Editors',
    'Samsung Unveils 2-Nanometer Chip Fabrication Process for Mobile Devices',
    'Databricks Raises $5 Billion at $68 Billion Valuation in Growth Round',
    'Kubernetes 2.0 Proposal Sparks Debate Over Backward Compatibility',
    'Plaid Processes Record $1 Trillion in Payment Volume During Q1 2026',
    'Figure Robotics Partners With BMW to Deploy Humanoid Assembly Workers',
    'Anthropic Introduces Claude Model That Writes and Debugs Its Own Code',
    'Sequoia Capital Closes Largest-Ever $15 Billion Early-Stage Fund',
    'Critical Bluetooth Flaw Exposes Billions of Devices to Remote Takeover',
    'Cloudflare Reports 340% Surge in AI Bot Traffic Scraping Web Content',
    'Vercel Ships Framework-Agnostic Edge Runtime With Sub-Millisecond Cold Starts',
    'Intel Foundry Wins Major Contract to Manufacture Custom AI Accelerators',
    'Zoom Pivots to AI-First Platform With Autonomous Meeting Agents',
    'FreeBSD 15 Adds Native Container Support Challenging Linux Dominance',
    'Wise Launches Instant Cross-Border Payments in 30 New African Markets',
    'Tesla Optimus Robot Begins Pilot Deployment in Amazon Fulfillment Centers',
    'Meta AI Research Publishes Open-Source Model Rivaling GPT-5 Performance',
    'Techstars Restructures Global Accelerator Network After Funding Challenges',
    'Ransomware Group Leaks 50 Million Patient Records From Hospital Chain',
    'Oracle Cloud Infrastructure Gains Enterprise Market Share as Costs Drop',
    'Cursor IDE Surpasses 5 Million Active Users as AI Coding Goes Mainstream',
    'Qualcomm Snapdragon X2 Promises Desktop-Class Performance for Laptops',
    'Palantir Signs $800 Million Defense Contract for AI Battlefield Analytics',
    'Docker Acquires Nix Package Manager Startup to Unify Dev Environments',
    'Block Reports Cash App Has Surpassed 100 Million Monthly Active Users',
    'Agility Robotics Opens World\'s Largest Humanoid Robot Factory in Oregon',
    'Google Gemini 3 Achieves State-of-the-Art on All Major Reasoning Benchmarks',
    'Andreessen Horowitz Launches Dedicated Robotics Fund With $2.5 Billion',
    'Log4j Successor Vulnerability Found in Widely Used Python Logging Library',
    'DigitalOcean Introduces GPU Cloud Instances Targeting AI Startup Market',
    'Windsurf Editor Introduces Real-Time Collaborative AI Pair Programming',
    'NVIDIA Blackwell Ultra GPUs Ship to Hyperscalers With Record Demand',
    'Workday Acquires HR Tech Startup to Build Autonomous Recruiting Pipeline',
    'The Apache Foundation Proposes New Governance Model for Major Projects',
    'Nubank Becomes Latin America\'s Most Valuable Bank Surpassing Itau',
    'Sanctuary AI Demonstrates General-Purpose Robot Completing Novel Tasks',
    'Microsoft Phi-5 Small Language Model Outperforms GPT-4 on Code Tasks',
    'Lightspeed Venture Partners Raises $9 Billion Across Three New Funds',
    'State-Sponsored Hackers Compromise Global Telecommunications Backbone',
    'Hetzner Cloud Expands US Data Center Footprint With Three New Regions',
    'Replit Launches AI Agent That Deploys Full-Stack Applications From Prompts',
    'MediaTek Dimensity 10000 Chip Brings On-Device AI to Budget Phones',
    'ServiceNow Reports AI Workflows Now Handle 40% of Enterprise IT Tickets',
    'HashiCorp Terraform 2.0 Introduces Native Policy-as-Code Engine',
    'Mercury Bank Raises $300 Million as Startup Banking Competition Intensifies',
    'Apptronik Apollo Robot Begins Commercial Warehouse Operations',
    'Cohere Releases Open-Weight Enterprise LLM Optimized for RAG Workflows',
    'General Catalyst Launches $6 Billion Fund Focused on AI Infrastructure',
    'North Korean Hackers Steal $2 Billion in Cryptocurrency Through DeFi Exploit',
    'Vultr Deploys Bare-Metal AI Servers With H200 GPUs at Competitive Pricing',
    'Zed Editor Reaches 1 Million Downloads as Lightweight IDE Market Grows',
    'Arm Cortex-X6 Core Design Targets 40% Single-Thread Performance Uplift',
    'HubSpot Integrates Autonomous AI Sales Agent Across Entire CRM Platform',
    'Python 3.14 Released With JIT Compiler Delivering 5x Performance Boost',
    'Chime Files IPO Prospectus Valuing Digital Banking Pioneer at $40 Billion',
    'Agility Digit Robot Achieves 22-Hour Autonomous Operation in Warehouse Trial',
    'xAI Grok 4 Model Demonstrates PhD-Level Scientific Research Capabilities',
    'Khosla Ventures Closes $3.5 Billion Climate Tech and AI Crossover Fund',
    'Pegasus Spyware Variant Discovered Targeting Journalists on Android Devices',
    'Scaleway Launches European Sovereign Cloud With GDPR-Native Architecture',
    'Tabnine Pivots to Enterprise Code Security With AI-Powered Vulnerability Detection',
    'Cerebras Wafer-Scale Chip Achieves Record Inference Speed for Large Models',
    'Atlassian Eliminates Traditional Project Management With AI Workflow Agents',
    'Go 1.24 Adds Coroutines and Generic Type Constraints in Major Update',
    'Brex Expands Beyond Startups With AI-Powered Corporate Expense Platform',
    'Unitree H1 Humanoid Robot Wins DARPA Disaster Response Challenge',
    'Stability AI Releases Open-Source Video Generation Model Rivaling Sora',
    'Index Ventures Leads $18 Billion Mega-Round for European AI Chipmaker',
    'Massive Data Breach at Cloud Provider Exposes Secrets of 10,000 Companies',
    'Linode Parent Akamai Launches Distributed GPU Cloud Across 25 Regions',
    'Neovim 1.0 Released After Decade of Development With Lua-First Architecture',
    'Broadcom VMware Bundling Strategy Drives Enterprise Customers to OpenStack',
    'Notion AI Workspace Replaces Email and Slack for 50,000 Companies',
    'Rust Foundation Announces Stable ABI Commitment for Systems Programming',
    'Monzo Business Banking Surpasses 1 Million SME Customers in UK Market',
    'Honda Asimo Neo Robot Returns With Modern AI and Manipulation Capabilities',
    'Google Gemini Code Assist Handles 70% of Internal Code Reviews Automatically',
    'Tiger Global Returns to Growth Investing With $7 Billion Technology Fund',
    'Chinese APT Group Compromises Five Major US Defense Contractors Simultaneously',
    'OVHcloud Becomes First Carbon-Negative Hyperscaler With Novel Cooling System',
    'Sourcegraph Cody AI Achieves Human-Level Performance on Real-World Bug Fixes',
    'AMD Instinct MI400 AI Accelerator Closes Performance Gap With NVIDIA',
    'Shopify Replaces Middle Management Layer With AI Decision-Making Systems',
    'Zig Language Reaches 1.0 Milestone With Full C ABI Compatibility',
    'N26 Receives Pan-European Banking License Enabling Expansion to 15 Markets',
    'Physical Intelligence Demonstrates Robot Learning Complex Assembly From Demonstration',
];

const EXCERPTS: string[] = [
    'The latest model introduces a unified architecture that processes text, images, audio, and video within a single inference pass. Early benchmarks show significant improvements in complex multi-step reasoning tasks that require integrating information across modalities.',
    'The acquisition marks the largest fintech deal of 2026 so far, as Stripe moves to consolidate its European operations. The combined entity will serve over 45 million customers and process payments in 48 currencies across the continent.',
    'Security researchers at CrowdStrike identified the flaw during a routine audit of container orchestration tools. The vulnerability allows attackers to escape container sandboxes and gain root access to host systems, affecting an estimated 60% of cloud deployments.',
    'Amazon Web Services claims the fifth-generation Arm-based processors deliver unprecedented price-performance ratios for compute-intensive workloads. Early adopters report cutting their cloud computing bills by nearly half while maintaining equivalent throughput.',
    'The new Copilot Workspace feature analyzes issue descriptions, creates implementation plans, and generates complete pull requests including tests and documentation. GitHub reports that internal testing showed a 40% reduction in time from issue creation to merged code.',
    'Sources familiar with the matter say Apple has resolved the display quality issues that plagued the first generation. The new headset is expected to be 30% lighter and feature a wider field of view, with a starting price of $2,499.',
    'The enterprise software giant says the cuts represent a strategic shift toward AI-powered customer engagement tools. Affected employees will receive severance packages and career transition support, while the company plans to hire 1,500 AI specialists.',
    'The major release includes full Rust driver support compiled by default, improved memory safety guarantees, and a new scheduling algorithm that reduces latency by 25%. Linus Torvalds called it the most significant kernel release in five years.',
    'The digital banking platform can now offer FDIC-insured accounts, lending products, and wealth management services to US customers. Revolut says it expects to reach 10 million American users within the first year of full banking operations.',
    'The Atlas humanoid robot uses a novel approach that combines imitation learning with reinforcement learning to master new tasks within hours. Boston Dynamics says the technology could enable robots to work alongside humans in unstructured environments.',
    'The new AlphaFold 4 system predicts protein structures with atomic-level accuracy in seconds rather than hours. Researchers say the breakthrough could accelerate drug discovery timelines by years and reduce pharmaceutical development costs significantly.',
    'The accelerator program funded startups across 35 countries, with AI, climate tech, and biotech representing the largest sectors. The median pre-money valuation for accepted companies reached $25 million, reflecting intense competition for top talent.',
    'Attackers injected malicious code into a widely used authentication library, potentially compromising thousands of downstream applications. Security teams across the industry are scrambling to audit their dependency trees and identify affected systems.',
    'The outage began at 2:15 AM Eastern and affected Azure Active Directory, Office 365, and several Azure compute services. Microsoft attributed the incident to a misconfigured network update that cascaded across multiple availability zones.',
    'The new IDE uses AI to understand entire codebases contextually, offering intelligent refactoring, automated code reviews, and natural language programming capabilities. JetBrains says it represents the future of software development tooling.',
    'The 2nm GAA transistor architecture promises 45% better power efficiency and 30% higher performance compared to the current 3nm node. Samsung expects to begin mass production for flagship mobile processors in the second half of 2026.',
    'The funding round was led by existing investors and values Databricks as one of the most valuable private technology companies. CEO Ali Ghodsi said the capital will be used to expand the company\'s AI and machine learning platform capabilities.',
    'The proposal suggests breaking backward compatibility to simplify the container orchestration platform\'s architecture. Core maintainers are divided, with some arguing the technical debt has become unsustainable while others warn of ecosystem fragmentation.',
    'The milestone reflects the rapid growth of open banking and embedded finance, with Plaid now connecting to over 12,000 financial institutions globally. The company says transaction volume is growing at 85% year-over-year.',
    'The pilot program will deploy 100 humanoid robots across BMW\'s Spartanburg, South Carolina manufacturing facility. The robots will handle repetitive assembly tasks while human workers focus on quality control and complex problem-solving.',
    'The new model demonstrates the ability to identify bugs in its own outputs, write test cases, and iteratively improve its code quality. Anthropic says this self-correcting capability represents a significant step toward more reliable AI programming assistants.',
    'The fund targets seed through Series B investments in software, AI, and healthcare technology startups. Managing partner Roelof Botha said the firm sees unprecedented opportunity in the current wave of AI-native company formation.',
    'The vulnerability affects Bluetooth 5.3 and earlier specifications, allowing attackers within radio range to intercept communications and execute arbitrary code. The Bluetooth SIG has issued an emergency advisory recommending immediate firmware updates.',
    'The company\'s latest threat report shows AI-powered bots now account for nearly half of all web traffic, up from 15% just two years ago. Cloudflare has responded by launching new bot management tools that use behavioral analysis to distinguish human visitors.',
    'The new runtime supports React, Vue, Svelte, and SolidJS applications with consistent behavior across edge locations worldwide. Vercel CEO Guillermo Rauch says the technology eliminates the framework lock-in that has plagued cloud deployment platforms.',
    'The contract, valued at over $3 billion over five years, positions Intel as a key supplier for the growing AI chip market. The company says its 18A process node is now yielding production-quality chips ahead of schedule.',
    'The platform now includes AI agents that can attend meetings on behalf of users, summarize discussions, and create follow-up action items automatically. Zoom says the changes reflect a fundamental shift from communication tool to productivity platform.',
    'The release includes bhyve container support, a new packet filter, and jails-based isolation that rivals Docker functionality. FreeBSD developers say the features make it a viable alternative for cloud-native workloads previously exclusive to Linux.',
    'The expansion covers Nigeria, Kenya, South Africa, Ghana, and 26 other markets across the continent. Wise says it can now deliver international transfers within seconds at a fraction of the cost charged by traditional banks.',
    'The initial deployment involves 25 Optimus robots performing pick-and-pack operations at a fulfillment center in Texas. Amazon says the pilot will evaluate the robots\' ability to work safely alongside human employees in a fast-paced environment.',
    'The 70-billion parameter model, released under an open license, demonstrates competitive performance with proprietary systems on coding, reasoning, and multilingual tasks. Meta says it reflects the company\'s commitment to open AI development.',
    'The restructuring consolidates 40 city-based programs into 10 regional hubs, each focused on specific industry verticals. Techstars CEO Maelle Gavet says the changes will allow deeper support for portfolio companies while reducing operational overhead.',
    'The ransomware attack targeted a healthcare conglomerate operating 200 hospitals across 15 states. Patient data including medical records, Social Security numbers, and insurance information is now available on dark web marketplaces.',
    'Oracle says its cloud revenue grew 52% year-over-year as enterprises seek alternatives to AWS and Azure. The company attributes its gains to aggressive pricing, strong database integration, and new partnerships with major AI companies.',
    'The AI-powered code editor has become the fastest-growing developer tool in history, with users reporting 30% productivity gains on average. Cursor recently raised $400 million at a $10 billion valuation to expand its enterprise offerings.',
    'The new mobile chipset integrates a dedicated neural processing unit capable of running 50-billion parameter language models entirely on device. Qualcomm says the chip will power next-generation laptops that can handle AI workloads without cloud connectivity.',
    'The contract will fund development of AI systems that process satellite imagery, drone footage, and sensor data in real-time on the battlefield. Defense analysts say the deal represents the military\'s accelerating adoption of commercial AI technology.',
    'The acquisition brings Nix\'s reproducible build system into Docker\'s ecosystem, promising fully deterministic development environments. Docker says the integration will eliminate the "works on my machine" problem that has plagued software teams for decades.',
    'The milestone makes Cash App one of the largest financial platforms in the United States, rivaling traditional banks in terms of active users. Block CEO Jack Dorsey says the platform\'s growth is driven by younger users who prefer mobile-first banking.',
    'The 70,000 square-foot facility in Salem, Oregon can produce 10,000 Digit robots annually. Agility Robotics says pre-orders from logistics companies have already filled the factory\'s production capacity through the end of 2027.',
    'The model introduces a new "thinking" mode that shows intermediate reasoning steps, improving transparency and accuracy on complex tasks. Google says Gemini 3 outperforms all existing models on mathematical reasoning, code generation, and scientific analysis.',
    'The dedicated fund will invest in companies building humanoid robots, autonomous vehicles, industrial automation, and surgical robotics. Partner Vijay Pande says robotics is entering its "iPhone moment" where hardware and AI capabilities finally converge.',
    'The vulnerability in the popular logging framework allows remote code execution through specially crafted log messages. Security experts warn that the flaw could be as widespread as Log4Shell, affecting millions of Python applications worldwide.',
    'The new GPU instances feature NVIDIA H100 GPUs at prices 40% below AWS and GCP equivalents. DigitalOcean says the offering is designed for AI startups that need affordable compute without the complexity of traditional cloud providers.',
    'The feature allows multiple developers to work with the same AI assistant simultaneously, sharing context and building on each other\'s prompts. Windsurf says the collaborative approach can reduce development time for complex features by up to 50%.',
    'The Blackwell Ultra chips deliver 2.5 times the inference performance of the previous generation while consuming only 20% more power. NVIDIA CEO Jensen Huang says demand from cloud providers and AI labs continues to outstrip supply.',
    'The acquisition aims to create an end-to-end hiring platform that uses AI to source candidates, conduct initial screenings, and schedule interviews. Workday says the technology could reduce time-to-hire by 60% for enterprise customers.',
    'The proposed governance model introduces term limits for project management committees and establishes an independent ethics board. The Apache Foundation says the changes are needed to address concerns about corporate influence over open-source projects.',
    'The Brazilian digital bank now serves over 90 million customers across Latin America, with its market capitalization exceeding $80 billion. Nubank attributes its growth to low fees, superior mobile experience, and rapid expansion into lending products.',
    'The demonstration showed the robot completing 15 previously unseen tasks including cooking, cleaning, and basic equipment repair. Sanctuary AI says the system uses a foundation model trained on millions of hours of human task demonstrations.',
    'The three-billion parameter model runs on consumer hardware while matching GPT-4\'s performance on programming benchmarks. Microsoft says the achievement proves that model efficiency, not just scale, is the key to advancing AI capabilities.',
    'The fundraising spans an early-stage seed fund, a growth-stage fund, and a dedicated AI opportunities fund. Lightspeed partner Mercedes Bent says the firm is seeing more high-quality AI startup pitches than at any point in its history.',
    'The attackers, linked to a known state-sponsored group, maintained persistent access for over eight months before detection. Investigators say the breach may have compromised classified weapons systems data and strategic defense communications.',
    'The three new US regions in Dallas, Chicago, and Los Angeles bring Hetzner\'s global data center count to 15. The German cloud provider says it can offer prices 70% below major hyperscalers while maintaining enterprise-grade reliability.',
    'The AI agent can take a natural language description, design the architecture, write the code, configure infrastructure, and deploy to production. Replit CEO Amjad Masad says the tool represents the beginning of the end for traditional software development.',
    'The flagship mobile chip includes a neural processing unit capable of running 13-billion parameter models at 30 tokens per second on device. MediaTek says the technology will bring AI features to smartphones costing under $200.',
    'The company reports that AI-powered workflows have resolved over 100 million IT support tickets without human intervention this quarter. ServiceNow CEO Bill McDermott says the technology is transforming IT departments from cost centers to strategic assets.',
    'The new version includes a built-in policy engine that evaluates infrastructure changes against organizational compliance rules before applying them. HashiCorp says the feature eliminates the need for separate policy-as-code tools in most enterprise environments.',
    'The fundraising round was led by Sequoia Capital and values Mercury at $3.2 billion. The company says it now holds over $40 billion in deposits from technology startups and is expanding into lending and treasury management services.',
    'The humanoid robots are performing palletizing and inventory management tasks at a major logistics company\'s distribution center. Apptronik says the robots can operate for 16 hours on a single charge and handle payloads up to 55 pounds.',
    'The model achieves state-of-the-art performance on enterprise retrieval-augmented generation benchmarks while requiring 60% less compute than competing systems. Cohere says the model is specifically designed for companies that need to search and reason over internal documents.',
    'The fund targets AI infrastructure companies building data centers, chip design tools, networking equipment, and energy systems. General Catalyst managing partner Hemant Taneja says AI infrastructure will be the largest technology investment opportunity of the decade.',
    'The sophisticated attack exploited a vulnerability in a popular DeFi lending protocol, draining funds across multiple blockchain networks. Blockchain analytics firms traced the stolen cryptocurrency through a complex web of mixers and cross-chain bridges.',
    'The bare-metal GPU servers offer direct hardware access without virtualization overhead, delivering up to 15% better performance than equivalent cloud instances. Vultr says the service targets AI researchers and startups who need maximum compute efficiency.',
    'The lightweight code editor has gained popularity among developers who want fast performance without the bloat of traditional IDEs. Zed\'s real-time collaboration features and native performance have attracted users migrating from VS Code and Sublime Text.',
    'The new core design targets mobile and laptop processors, promising significant gains in single-threaded workloads like web browsing and app launching. Arm says the architecture uses a wider execution pipeline and improved branch prediction.',
    'The AI sales agent can qualify leads, send personalized follow-up emails, schedule demos, and update CRM records without human intervention. HubSpot says early adopters are seeing 3x improvement in lead conversion rates with the autonomous agent.',
    'The JIT compiler, developed over three years by a team of core developers, dramatically accelerates CPU-bound Python code while maintaining full backward compatibility. Python creator Guido van Rossum called it the most important Python release in a decade.',
    'The prospectus reveals that Chime has 22 million active accounts and generated $1.8 billion in revenue last year. The company plans to use IPO proceeds to expand its lending products and build out its financial technology platform.',
    'The extended operation test demonstrated that the Digit robot could work a full warehouse shift with minimal human supervision. Agility Robotics says the robots navigated obstacles, recovered from errors, and maintained consistent performance throughout the trial.',
    'The model demonstrates expert-level performance in physics, chemistry, biology, and mathematics, including the ability to design novel experiments and analyze results. xAI founder Elon Musk says the technology will be made available to research institutions.',
    'The fund combines climate technology investments with AI-powered solutions for energy, agriculture, and manufacturing. Khosla Ventures founder Vinod Khosla says AI will be the critical enabler for achieving global climate goals within the next decade.',
    'The new spyware variant uses zero-click exploits to infect devices through messaging applications without any user interaction. Citizen Lab researchers say at least 30 journalists in 10 countries have been confirmed as targets of the surveillance campaign.',
    'The sovereign cloud platform stores all data within EU borders and complies with GDPR, the EU AI Act, and national security requirements. Scaleway CEO Yann Lechelle says European enterprises need cloud infrastructure free from US surveillance laws.',
    'The enterprise platform uses AI to analyze code during development, identifying security vulnerabilities before they reach production. Tabnine says the technology can detect 95% of common vulnerability patterns with fewer false positives than traditional static analysis tools.',
    'The wafer-scale chip processes large language models at over 100 tokens per second for models with 1 trillion parameters. Cerebras says its technology eliminates the need for model parallelism across multiple GPUs, simplifying AI infrastructure significantly.',
    'The new AI agents handle project planning, task assignment, progress tracking, and team coordination automatically. Atlassian CEO Mike Cannon-Brookes says the change reflects a fundamental shift in how knowledge work is organized and executed.',
    'The release introduces lightweight coroutines for concurrent programming and expanded generic type constraints for safer code. The Go team says the changes represent the language\'s biggest evolution since the introduction of generics in Go 1.18.',
    'The platform uses AI to automatically categorize expenses, detect anomalies, and enforce spending policies in real-time. Brex says it now manages over $10 billion in annualized corporate spending across 30,000 companies of all sizes.',
    'The H1 robot completed a complex disaster response course that included navigating rubble, opening doors, operating tools, and carrying injured mannequins. The winning performance demonstrated locomotion and manipulation capabilities far beyond previous competition entries.',
    'The open-source model generates photorealistic video clips up to 60 seconds long from text descriptions. Stability AI says democratizing video generation technology will enable creators and small businesses to produce professional content at minimal cost.',
    'The mega-round funds a European startup developing specialized AI chips that promise 10x better energy efficiency than NVIDIA GPUs for inference workloads. The investment is the largest single venture round in European technology history.',
    'The breach exploited a misconfigured API gateway at a major cloud provider, exposing environment variables, database credentials, and API keys. Security researchers estimate that remediation costs could exceed $500 million across affected organizations.',
    'The distributed GPU cloud offers NVIDIA A100 and H100 instances across 25 global locations, enabling low-latency AI inference near end users. Akamai says the service leverages its existing CDN infrastructure to provide GPU compute at the edge.',
    'The 1.0 release delivers a stable plugin API, native LSP support, and a tree-sitter-based syntax highlighting engine. Neovim maintainers say the milestone marks the editor\'s transition from a Vim fork to a fully independent development platform.',
    'VMware customers report license cost increases of 300-500% under Broadcom\'s new bundling model, driving many to evaluate open-source alternatives. OpenStack Foundation reports a 200% increase in enterprise inquiries since the acquisition was completed.',
    'The AI-powered workspace combines document editing, project management, knowledge bases, and communication into a unified platform. Notion says companies using the integrated system report 35% fewer meetings and 50% less time spent searching for information.',
    'The stable ABI commitment means Rust libraries can be loaded dynamically without recompilation, enabling plugin architectures and system-level interoperability. The Rust Foundation says this removes one of the last barriers to Rust adoption in operating systems.',
    'The digital bank now offers business accounts, invoicing, tax estimation, and lending products to small and medium enterprises across the UK. Monzo CEO TS Anil says the SME segment represents the company\'s largest growth opportunity.',
    'The updated humanoid robot combines Honda\'s mechanical engineering expertise with modern large language models and computer vision. Honda says Asimo Neo can engage in natural conversation, navigate complex environments, and perform household tasks autonomously.',
    'The AI-powered code review system has reduced the average time for internal code reviews from 24 hours to under 30 minutes. Google says it plans to offer the technology to enterprise customers through its Cloud Platform within the next quarter.',
    'The fund marks Tiger Global\'s return to active investing after a two-year period focused on portfolio management. The firm says it will focus on AI infrastructure, enterprise software, and fintech companies at growth and late stages.',
    'The simultaneous breach of five major defense contractors is being described as one of the most significant cyber espionage operations in US history. Intelligence agencies believe the attackers had access to classified networks for over a year.',
    'The carbon-negative status was achieved through a combination of renewable energy, innovative immersion cooling, and carbon capture technology. OVHcloud says its data centers now remove more carbon dioxide from the atmosphere than they produce.',
    'The AI coding assistant achieved a 78% success rate on a benchmark of real-world GitHub issues, matching the performance of senior software engineers. Sourcegraph says the technology can automatically fix bugs, implement features, and refactor code.',
    'The MI400 accelerator delivers 2.8 petaflops of AI training performance, approaching NVIDIA Blackwell\'s capabilities at a significantly lower price point. AMD says the chip has already secured design wins with major cloud providers and AI research labs.',
    'The controversial decision eliminates several layers of management, with AI systems now handling task allocation, performance evaluation, and strategic planning for teams. Shopify CEO Tobi Lutke says the change makes the company faster and more responsive to market shifts.',
    'The 1.0 release includes a complete standard library, a package manager, and comprehensive documentation. Zig creator Andrew Kelley says the language is now ready for production use in systems programming, game development, and embedded applications.',
    'The license enables N26 to offer full banking services including deposits, lending, and investment products across the European Economic Area. N26 CEO Valentin Stalf says the company will launch in 15 new markets over the next 18 months.',
    'The robot learned to prepare a simple meal, fold laundry, and repair a leaking faucet after observing human demonstrations. Physical Intelligence says its approach requires 90% less training data than traditional robot learning methods.',
];

function generateArticles(page: number): Article[] {
    const articles: Article[] = [];
    const startIndex = page * 10;

    for (let i = 0; i < 10; i++) {
        const globalIndex = startIndex + i;
        const headlineIndex = globalIndex % HEADLINES.length;
        const excerptIndex = globalIndex % EXCERPTS.length;
        const authorIndex = globalIndex % AUTHORS.length;
        const categoryIndex = globalIndex % CATEGORIES.length;

        // Vary dates by working backward from today
        const daysAgo = globalIndex;
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        articles.push({
            id: globalIndex + 1,
            headline: HEADLINES[headlineIndex],
            author: AUTHORS[authorIndex],
            date: formattedDate,
            excerpt: EXCERPTS[excerptIndex],
            category: CATEGORIES[categoryIndex],
        });
    }

    return articles;
}

// --- Components ---

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-8 gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800" />
            <span className="text-sm text-zinc-500">Loading more articles...</span>
        </div>
    );
}

function CategoryTag({ category }: { category: string }) {
    const colorMap: Record<string, string> = {
        'AI & Machine Learning': 'bg-purple-100 text-purple-800',
        'Startups': 'bg-green-100 text-green-800',
        'Cybersecurity': 'bg-red-100 text-red-800',
        'Cloud Computing': 'bg-blue-100 text-blue-800',
        'Developer Tools': 'bg-amber-100 text-amber-800',
        'Hardware': 'bg-slate-100 text-slate-800',
        'Enterprise': 'bg-indigo-100 text-indigo-800',
        'Open Source': 'bg-teal-100 text-teal-800',
        'Fintech': 'bg-emerald-100 text-emerald-800',
        'Robotics': 'bg-orange-100 text-orange-800',
        'Climate Tech': 'bg-lime-100 text-lime-800',
        'Quantum Computing': 'bg-cyan-100 text-cyan-800',
        'Biotech': 'bg-pink-100 text-pink-800',
        'Space Tech': 'bg-violet-100 text-violet-800',
        'Privacy': 'bg-rose-100 text-rose-800',
    };

    const colors = colorMap[category] || 'bg-zinc-100 text-zinc-800';

    return (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colors}`}>
            {category}
        </span>
    );
}

function ArticleCard({ article }: { article: Article }) {
    return (
        <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mb-3 flex items-center gap-3">
                <CategoryTag category={article.category} />
                <span className="text-sm text-zinc-400">{article.date}</span>
            </div>
            <h2 className="mb-2 text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-100">
                {article.headline}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    By {article.author}
                </span>
                <a
                    href="#"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={(e) => e.preventDefault()}
                >
                    Read more &rarr;
                </a>
            </div>
        </article>
    );
}

// --- Main Page ---

export default function InfiniteScrollPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(() => {
        if (loading) return;
        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const newArticles = generateArticles(page);
            setArticles((prev) => [...prev, ...newArticles]);
            setPage((prev) => prev + 1);
            setLoading(false);
            setInitialLoad(false);
        }, initialLoad ? 0 : 500);
    }, [page, loading, initialLoad]);

    // Load initial batch
    useEffect(() => {
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // IntersectionObserver for infinite scroll
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    loadMore();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [loadMore, loading]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
                    <div>
                        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            TechPulse
                        </h1>
                        <p className="text-xs text-zinc-500">Technology News Feed</p>
                    </div>
                    <div className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {articles.length} articles loaded
                    </div>
                </div>
            </header>

            {/* Article Feed */}
            <main className="mx-auto max-w-3xl px-4 py-6">
                <div className="flex flex-col gap-4">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Loading indicator */}
                {loading && !initialLoad && <LoadingSpinner />}

                {/* Sentinel element for IntersectionObserver */}
                <div ref={sentinelRef} className="h-4" />
            </main>
        </div>
    );
}
