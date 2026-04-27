/** @jsxImportSource react */
// Per-file pragma override: layout.tsx uses React's default JSX runtime
// instead of @cloak/next's auto-wrap. Why: the nav, dev toolbar, and SDK
// <Script> live OUTSIDE <CloakProvider> and must render as plaintext —
// auto-wrapping their string children in <CloakText> creates a hydration
// mismatch (server-side <Link> spreads CloakText props onto the <a>,
// adding data-cloak-encrypted attributes that the client tree never
// emits). The mismatch makes React 19 bail hydration on the entire
// subtree and re-render against an inconsistent context, producing
// the double-ciphered text users saw on intermittent reloads.
//
// Pages and any components they import keep auto-wrap via the project-
// wide tsconfig setting; this pragma only opts the layout itself out.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { CloakProvider } from "@cloak/next";
import "./globals.css";
import RedeploySdkButton from "@/components/RedeploySdkButton";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Cloak SDK Test Harness",
    description:
        "Comprehensive test site for the Cloak SDK — exercises every dynamic web pattern against font-based encryption.",
};

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/infinite-scroll", label: "Infinite Scroll" },
    { href: "/hydration", label: "Hydration" },
    { href: "/virtual-scroll", label: "Virtual Scroll" },
    { href: "/lazy-load", label: "Lazy Load" },
    { href: "/shadow-dom", label: "Shadow DOM" },
    { href: "/spa-nav", label: "SPA Nav" },
    { href: "/re-renders", label: "Re-renders" },
    { href: "/rich-content", label: "Rich Content" },
    { href: "/skipped-text", label: "Skipped Text" },
    { href: "/formatting", label: "Formatting" },
    { href: "/formatting-plain", label: "Formatting (Plain)" },
    { href: "/languages", label: "Languages" },
];

const cloakApiUrl =
    process.env.NEXT_PUBLIC_CLOAK_API_URL ?? "http://localhost:8001";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
                {/* ── Navigation ── */}
                <nav className="sticky top-0 z-50 bg-zinc-900 text-zinc-100 shadow-md">
                    <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-3 text-sm font-medium">
                        <Link
                            href="/"
                            className="shrink-0 text-base font-bold tracking-tight text-white"
                        >
                            Cloak Test
                        </Link>

                        <div className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="shrink-0 rounded-md px-3 py-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                    </div>
                </nav>

                {/* Floating bottom-right dev toolbar — always visible. */}
                <RedeploySdkButton />

                {/* CloakProvider in the layout is fine because
                    @cloak/next now keys cipher mappings on
                    (apiKey, domain) only — every page in the same app
                    shares one mapping, so Next.js's App Router caching
                    of the layout subtree never causes the server tree
                    and client tree to disagree on which mapping to
                    use. (Earlier per-path mappings tripped exactly
                    that disagreement on every client-side nav and
                    fell into the "This page couldn't load" error
                    boundary.) */}
                <main className="flex-1">
                    {/*
                     * fontFamily="__nextjs-Geist" tells <CloakText> what
                     * data-cloak-family value to write on every cipher
                     * span so the SDK's per-family routing CSS rule
                     *   [data-cloak-family="__nextjs-Geist"] {
                     *     font-family: 'CloakEncrypted-__nextjs-Geist' !important
                     *   }
                     * matches and the cipher text renders with the
                     * correctly-glyph-mapped Geist font.
                     *
                     * This site uses next/font's Geist wrapper (see the
                     * `geistSans = Geist({ ... })` call above), which
                     * renames the family at runtime to "__nextjs-Geist"
                     * — that's the exact name the page elements'
                     * computed font-family resolves to. Without this
                     * prop every cipher span falls through to the
                     * catch-all CloakFont (Supertest-derived) and the
                     * page renders as Times.
                     */}
                    <CloakProvider
                        apiKey="test-key"
                        apiUrl={cloakApiUrl}
                        fontFamily="__nextjs-Geist"
                    >
                        {children}
                    </CloakProvider>
                </main>

                <Script
                    src={`${cloakApiUrl}/sdk.js`}
                    strategy="afterInteractive"
                    data-api-key="test-key"
                    data-api-url={cloakApiUrl}
                    data-debug=""
                />
            </body>
        </html>
    );
}
