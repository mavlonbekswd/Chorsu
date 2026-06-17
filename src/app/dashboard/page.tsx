import { Suspense } from "react";
import IdeasMarketplace from "@/components/dashboard/IdeasMarketplace";

export default function DashboardHome() {
  return (
    <Suspense fallback={<div className="px-5 py-8 text-sm text-muted sm:px-8">Loading the bazaar…</div>}>
      <IdeasMarketplace />
    </Suspense>
  );
}
