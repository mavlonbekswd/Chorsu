import Link from "next/link";
import BazaarScene from "./BazaarScene";

export default function Hero() {
  return (
    <section id="top" className="bazaar-day relative isolate overflow-hidden">
      {/* faint tile wash, top corners only */}
      <div className="girih-texture pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(60%_50%_at_50%_-10%,black,transparent)]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-12 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-16">
        {/* copy — left */}
        <div className="order-2 lg:order-1">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3 py-1 text-xs font-medium tracking-wide text-clay-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            The bazaar of ideas · Central Asia
          </p>

          <h1 className="max-w-xl font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Every great build starts at the bazaar.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Chorsu is a marketplace of ready-to-build startup ideas — each one carrying its full
            architecture: the problem, the solution, the database, the API, and the road to revenue.
            Pick an idea. Carry it home. Build.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-clay px-6 py-3 text-center text-sm font-semibold text-cream shadow-[0_10px_24px_-12px_rgba(162,63,34,0.9)] transition-transform hover:scale-[1.03]"
            >
              Enter the bazaar
            </Link>
            <a
              href="#stalls"
              className="rounded-full border border-ink/15 px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-clay/50 hover:text-clay-deep"
            >
              See the stalls
            </a>
          </div>
        </div>

        {/* illustration — right */}
        <div className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <BazaarScene />
        </div>
      </div>

      {/* gentle settle into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
