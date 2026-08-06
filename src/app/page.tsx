import HomePageClient from "@/components/HomePageClient";

export interface HomePageProps extends Readonly<Record<string, never>> {}

export default function HomePage(_props: HomePageProps) {
  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100 relative">
      <HomePageClient />
    </div>
  );
}
