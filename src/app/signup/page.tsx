"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";

export default function SignupStub() {
  const { t } = useLang();
  return (
    <main className="bazaar-day flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <div className="girih-texture pointer-events-none fixed inset-0 opacity-[0.4] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="relative max-w-md">
        <Link href="/" className="mx-auto flex w-fit items-center" aria-label="Chorsu home">
          <Image src="/chorsu-logo.png" alt="Chorsu" width={240} height={70} className="h-11 w-auto" priority />
        </Link>
        <h1 className="mt-8 font-display text-2xl font-semibold text-ink">{t.signup.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t.signup.body}</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-clay/40 px-6 py-3 text-sm font-semibold text-clay-deep transition-colors hover:bg-clay/10"
        >
          {t.signup.back}
        </Link>
      </div>
    </main>
  );
}
