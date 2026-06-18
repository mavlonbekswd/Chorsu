import { Suspense } from "react";
import IdeasMarketplace from "@/components/dashboard/IdeasMarketplace";

export default function DashboardHome() {
  return (
    <Suspense fallback={<div className="px-5 py-8 text-sm text-d-faint sm:px-8">Loading…</div>}>
      <IdeasMarketplace />
    </Suspense>
  );
}
