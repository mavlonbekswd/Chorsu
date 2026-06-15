import Link from "next/link";
import DomeLogo from "@/components/DomeLogo";

export default function SignupStub() {
  return (
    <main className="bazaar-day flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <div className="girih-texture pointer-events-none fixed inset-0 opacity-[0.4] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="relative max-w-md">
        <Link href="/" className="mx-auto flex w-fit items-center gap-2">
          <DomeLogo className="h-9 w-9" />
          <span className="font-display text-2xl font-semibold text-ink">chorsu</span>
        </Link>
        <h1 className="mt-8 font-display text-2xl font-semibold text-ink">The gate to the bazaar.</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Sign-up isn&apos;t wired up yet — this is a stub. The catalog, accounts, and unlocks come in
          the next phase of the build.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-clay/40 px-6 py-3 text-sm font-semibold text-clay-deep transition-colors hover:bg-clay/10"
        >
          ← Back to the bazaar
        </Link>
      </div>
    </main>
  );
}
