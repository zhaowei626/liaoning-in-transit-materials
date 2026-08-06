import { notFound } from "next/navigation";
import DashboardPage from "@/components/DashboardPage";
import { cityRoutes, getCityDashboardData, getCityNameByRouteParam } from "@/data/mockData";

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
