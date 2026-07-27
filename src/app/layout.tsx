import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppProviders } from "@/components/AppProviders";
import { dashboardTitle } from "@/data/mockData";
import "./globals.css";

export const metadata: Metadata = {
  title: dashboardTitle,
  description: "在途物资库资源全景可视化大屏"
};

export interface RootLayoutProps
  extends Readonly<{
    children: ReactNode;
  }> {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="dark" lang="zh-CN">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
