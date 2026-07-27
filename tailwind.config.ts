import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "#020b1c",
        nebula: "#0a254d",
        panel: "rgba(10, 25, 47, 0.66)",
        panelStrong: "rgba(8, 20, 40, 0.92)",
        cyanCore: "#00f2ff",
        cyanSoft: "rgba(0, 242, 255, 0.18)",
        cyanLine: "rgba(0, 242, 255, 0.36)",
        amberCore: "#ffbf00",
        amberSoft: "rgba(255, 191, 0, 0.14)",
        inkMuted: "#94a3b8",
        inkDim: "#64748b",
        slateGlass: "rgba(15, 23, 42, 0.58)"
      },
      fontFamily: {
        sans: ["PingFang SC", "Microsoft YaHei", "Arial", "sans-serif"],
        display: ["Orbitron", "PingFang SC", "Microsoft YaHei", "sans-serif"]
      },
      spacing: {
        dashboard: "1rem",
        panel: "1rem",
        compact: "0.375rem"
      },
      borderRadius: {
        dashboard: "0.375rem"
      },
      fontSize: {
        dashboardTitle: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        metric: ["1.625rem", { lineHeight: "2rem", fontWeight: "700" }]
      },
      boxShadow: {
        cyanInset: "inset 0 0 15px rgba(0, 242, 255, 0.12), 0 0 12px rgba(0, 242, 255, 0.12)",
        cyanGlow: "0 0 12px rgba(0, 242, 255, 0.75)",
        amberGlow: "0 0 12px rgba(255, 191, 0, 0.72)"
      }
    }
  },
  plugins: []
};

export default config;
