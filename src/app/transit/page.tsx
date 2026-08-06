"use client";

import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("@/components/DashboardPage"), {
  ssr: false,
});

export interface HomePageProps extends Readonly<Record<string, never>> {}

export default function HomePage(_props: HomePageProps) {
  return <DashboardPage />;
}
