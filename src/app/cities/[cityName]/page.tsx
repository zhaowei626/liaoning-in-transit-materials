"use client";

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { cityRoutes, getCityDashboardData, getCityNameByRouteParam } from "@/data/mockData";

const DashboardPage = dynamic(() => import("@/components/DashboardPage"), {
  ssr: false,
});

export interface CityTransitPageProps {
  params: Promise<{
    cityName: string;
  }>;
}

export function generateStaticParams() {
  return cityRoutes.map((city) => ({ cityName: city.slug }));
}

export default async function CityTransitPage({ params }: CityTransitPageProps) {
  const { cityName } = await params;
  const resolvedCityName = getCityNameByRouteParam(cityName);
  const dashboardData = resolvedCityName ? getCityDashboardData(resolvedCityName) : null;

  if (!dashboardData) {
    notFound();
  }

  return <DashboardPage backHref="/" cards={dashboardData.cards} panels={dashboardData.panels} />;
}
