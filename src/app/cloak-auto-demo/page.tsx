/** @jsxImportSource @cloak/next */

/**
 * Phase 2 demo for @cloak/next.
 *
 * Same content as /cloak-next-demo, but every text literal is bare
 * — there's no <CloakText> wrap anywhere in the source. The JSX
 * pragma at the top routes every JSX element through @cloak/next's
 * custom `jsx` / `jsxDEV` functions, which inspect children and
 * auto-wrap any string in <CloakText>. Publisher-side this means:
 * write your JSX normally, get cipher rendering for free.
 *
 * The pragma is per-file. Apply it project-wide by adding
 * `"jsxImportSource": "@cloak/next"` to the App's tsconfig.json
 * compilerOptions. We keep it per-file here so the rest of the
 * test harness (which compares against the edge-proxy cipher path)
 * stays unaffected.
 */

import { CloakProvider } from '@cloak/next';

const CLOAK_API_URL =
  process.env.NEXT_PUBLIC_CLOAK_API_URL ?? 'http://localhost:7249';

export default function CloakAutoDemoPage() {
  return (
    <CloakProvider apiKey="test-key" apiUrl={CLOAK_API_URL}>
      <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cloak Auto-Wrap Demo
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            This page wraps zero text manually. Every string in the JSX
            is auto-wrapped by the @cloak/next JSX runtime, configured
            via the pragma at the top of this file.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            What you should see
          </h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Every heading and paragraph rendering through CloakFont, decoded back to readable English.</li>
            <li>Zero hydration warnings, zero error overlays.</li>
            <li>Identical cipher chars between the server-rendered HTML and the client-rendered DOM.</li>
            <li>The dev toolbar buttons in the top right (Cloak Test, Reset Cache, etc.) staying as plaintext — they live outside this page&apos;s CloakProvider.</li>
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
            Sample article body
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            OpenAI announced GPT-5 today with native multimodal reasoning across
            text, images, audio, and video in a single inference pass. Early
            benchmarks show significant improvements on multi-step tasks that
            require integrating information across modalities.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            The launch comes alongside a developer preview that exposes the new
            modality routing primitives directly. Pricing remains comparable
            to GPT-4 Turbo for text-only requests.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            By Sarah Chen
          </p>
        </section>
      </main>
    </CloakProvider>
  );
}
