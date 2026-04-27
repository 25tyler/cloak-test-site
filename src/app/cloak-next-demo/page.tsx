/**
 * Demo page for the @cloak/next plugin.
 *
 * Wraps the page content in <CloakProvider>, then renders text via
 * <CloakText>. The provider fetches the cipher mapping server-side,
 * passes it through React Context (serialized in the RSC payload),
 * and CloakText computes cipher consistently on both server and
 * client. Hydration matches by construction — no warnings, no
 * flickers.
 *
 * Compare to the other routes (/virtual-scroll, /infinite-scroll,
 * etc.) which rely on the edge proxy's post-render HTML cipher.
 * That path produces hydration warnings on client-component-heavy
 * pages because the markers we add to HTML get stripped by
 * components that don't spread unknown props. The plugin avoids
 * that whole class of bug by ciphering inside React.
 */

import { CloakProvider, CloakText } from '@cloak/next';

const CLOAK_API_URL =
  process.env.NEXT_PUBLIC_CLOAK_API_URL ?? 'http://localhost:7249';

export default function CloakNextDemoPage() {
  return (
    <CloakProvider apiKey="test-key" apiUrl={CLOAK_API_URL}>
      <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            <CloakText>{'Cloak Next Plugin Demo'}</CloakText>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            <CloakText>{
              'This page renders cipher inside React, not after it. ' +
              'Server-rendered HTML and client-side JSX produce the ' +
              'same span structure with the same cipher characters, ' +
              'so hydration matches by construction.'
            }</CloakText>
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            <CloakText>{'How it works'}</CloakText>
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <CloakText>{
                'CloakProvider is an async server component — on every ' +
                'request it calls /api/sdk/init to fetch the per-page ' +
                'character mapping and font URL.'
              }</CloakText>
            </li>
            <li>
              <CloakText>{
                'The mapping is passed to a client-side context provider ' +
                'via props. RSC serializes the props automatically, so ' +
                'the client receives the mapping in the flight payload.'
              }</CloakText>
            </li>
            <li>
              <CloakText>{
                'CloakText reads the mapping from context and emits a ' +
                'span with data-cloak-encrypted plus the cipher text. ' +
                'Both sides compute the same cipher, so React sees ' +
                'identical output and never throws a hydration warning.'
              }</CloakText>
            </li>
          </ol>
        </section>

        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
            <CloakText>{'Sample article'}</CloakText>
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            <CloakText>{
              'OpenAI announced GPT-5 today with native multimodal ' +
              'reasoning across text, images, audio, and video in a ' +
              'single inference pass. Early benchmarks show significant ' +
              'improvements on multi-step tasks that require integrating ' +
              'information across modalities.'
            }</CloakText>
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <CloakText raw>{'By '}</CloakText>
            <CloakText>{'Sarah Chen'}</CloakText>
          </p>
        </section>
      </main>
    </CloakProvider>
  );
}
