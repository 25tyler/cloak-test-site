import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

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

                {/* ── Page content ── */}
                <main className="flex-1">{children}</main>

                {/* ── Cloak SDK ── */}
                <Script
                    src={`${cloakApiUrl}/sdk/cloak.js`}
                    strategy="afterInteractive"
                />
                <Script
                    id="cloak-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function waitForCloak() {
                                if (typeof CloakSDK !== 'undefined') {
                                    CloakSDK.init({
                                        apiKey: 'test-key',
                                        apiBaseUrl: '${cloakApiUrl}'
                                    });
                                } else {
                                    setTimeout(waitForCloak, 50);
                                }
                            })();
                        `,
                    }}
                />
            </body>
        </html>
    );
}
