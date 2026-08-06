"use client";

import { HomePageClient } from "@/components/HomePageClient";

export default function HomePage() {
  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100 relative">
      <HomePageClient />
    </div>
  );
}
