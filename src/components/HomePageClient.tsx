"use client";

import Link from "next/link";
import MainHeader from "@/components/MainHeader";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { PackageSearch, Warehouse, Network, Box, Database, ArrowRight } from "lucide-react";
import { formatAmount, formatQuantity } from "@/lib/format";

export function HomePageClient() {
  const clock = useClock();

  return (
    <>
      <MainHeader clock={clock} title={dashboardTitle} />
      <main className="relative flex-1 min-h-[calc(100vh-100px)] w-full overflow-hidden flex items-center justify-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
          style={{ backgroundImage: 'linear-gradient(rgba(0, 242, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.2) 1px, transparent 1px)', backgroundSize: '50px 50px', transform: 'perspective(500px) rotateX(60deg) scale(2.5) translateY(-50%)' }}
        />

        <div className="relative w-full max-w-7xl h-[800px] flex items-center justify-center">
          
          {/* Central Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="mb-4 text-2xl font-display font-bold text-cyanCore tracking-widest relative">
              <span className="relative z-10 px-6 py-2 bg-panelStrong border border-cyanCore/40 rounded-full shadow-[0_0_15px_rgba(0,242,255,0.3)]">
                “五库一仓”
              </span>
            </div>
            <div className="relative w-64 h-64 flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-cyanCore/10 rounded-full blur-3xl group-hover:bg-cyanCore/20 transition-all duration-500"></div>
              <div className="relative w-48 h-48 bg-panelStrong border-2 border-cyanCore/50 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,242,255,0.3)] group-hover:shadow-[0_0_80px_rgba(0,242,255,0.5)] transition-all duration-500">
                <div className="absolute inset-2 border border-cyanCore/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-cyanCore/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <Database className="w-20 h-20 text-cyanCore" />
              </div>
            </div>
          </div>

          {/* Lines connecting center to nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'drop-shadow(0 0 4px rgba(0,242,255,0.5))' }}>
            {/* Top Left */}
            <path d="M 640 400 L 400 250 L 300 250" fill="none" stroke="rgba(0, 242, 255, 0.4)" strokeWidth="2" />
            {/* Middle Left */}
            <path d="M 640 400 L 400 500 L 300 500" fill="none" stroke="rgba(0, 242, 255, 0.4)" strokeWidth="2" />
            {/* Top Right */}
            <path d="M 640 400 L 880 250 L 980 250" fill="none" stroke="rgba(0, 242, 255, 0.4)" strokeWidth="2" />
            {/* Middle Right */}
            <path d="M 640 400 L 880 500 L 980 500" fill="none" stroke="rgba(0, 242, 255, 0.4)" strokeWidth="2" />
            {/* Bottom */}
            <path d="M 640 400 L 640 580" fill="none" stroke="rgba(0, 242, 255, 0.4)" strokeWidth="2" />
          </svg>

          {/* Node 1: 在途订单库 (Top Left) */}
          <Link href="/transit" className="absolute top-[120px] left-[50px] group z-10 w-[320px] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-panelStrong border border-cyanLine/50 rounded-lg p-4 shadow-[0_0_20px_rgba(0,242,255,0.1)] relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyanCore to-transparent"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyanCore/10 rounded-md">
                  <PackageSearch className="w-6 h-6 text-cyanCore" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">在途订单库</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">在途批次订单</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(4587)}</span> <span className="text-xs text-slate-400">条</span>
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-amberCore font-bold font-display">{formatAmount(17)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-300">在途电商订单</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(4226)}</span> <span className="text-xs text-slate-400">条</span>
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-amberCore font-bold font-display">{formatAmount(20)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Node 2: 虚拟库 (Middle Left) */}
          <Link href="/virtual" className="absolute top-[380px] left-[50px] group z-10 w-[320px] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-panelStrong border border-cyanLine/50 rounded-lg p-4 shadow-[0_0_20px_rgba(0,242,255,0.1)] relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyanCore to-transparent"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyanCore/10 rounded-md">
                  <Network className="w-6 h-6 text-cyanCore" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">虚拟库</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">中转物资虚拟库</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(2556)}</span> <span className="text-xs text-slate-400">条</span>
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-amberCore font-bold font-display">{formatAmount(16)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">应急物资虚拟库</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(1244)}</span> <span className="text-xs text-slate-400">条</span>
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-amberCore font-bold font-display">{formatAmount(12.5)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">废旧现场虚拟库</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(850)}</span> <span className="text-xs text-slate-400">条</span>
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-amberCore font-bold font-display">{formatAmount(624)}</span> <span className="text-xs text-slate-400">万元</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-300">废旧拆解暂存库</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(2321)}</span> <span className="text-xs text-slate-400">条</span>
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-amberCore font-bold font-display">{formatAmount(454)}</span> <span className="text-xs text-slate-400">万元</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Node 3: 物资库 (Top Right) */}
          <Link href="/materials" className="absolute top-[120px] right-[50px] group z-10 w-[320px] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-panelStrong border border-cyanLine/50 rounded-lg p-4 shadow-[0_0_20px_rgba(0,242,255,0.1)] relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-cyanCore to-transparent"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyanCore/10 rounded-md">
                  <Warehouse className="w-6 h-6 text-cyanCore" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">物资库</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">周转库</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(242)}</span> <span className="text-xs text-slate-400">条</span>
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-amberCore font-bold font-display">{formatAmount(12.3)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-300">终端库</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(2233)}</span> <span className="text-xs text-slate-400">条</span>
                    <span className="mx-2 text-slate-600">|</span>
                    <span className="text-amberCore font-bold font-display">{formatAmount(22.3)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Node 4: 综合材料站 (Middle Right) */}
          <Link href="/station" className="absolute top-[380px] right-[50px] group z-10 w-[320px] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-panelStrong border border-cyanLine/50 rounded-lg p-4 shadow-[0_0_20px_rgba(0,242,255,0.1)] relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-cyanCore to-transparent"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyanCore/10 rounded-md">
                  <Box className="w-6 h-6 text-cyanCore" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">综合材料站</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">注册数量</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(1243)}</span> <span className="text-xs text-slate-400">个</span>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">库存金额</span>
                  <div className="text-right">
                    <span className="text-amberCore font-bold font-display">{formatAmount(14.2)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">累计入库金额</span>
                  <div className="text-right">
                    <span className="text-amberCore font-bold font-display">{formatAmount(0)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-300">累计出库金额</span>
                  <div className="text-right">
                    <span className="text-amberCore font-bold font-display">{formatAmount(0)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Node 5: 专业仓 (Bottom) */}
          <Link href="/special" className="absolute bottom-[100px] left-1/2 -translate-x-1/2 group z-10 w-[320px] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-panelStrong border border-cyanLine/50 rounded-lg p-4 shadow-[0_0_20px_rgba(0,242,255,0.1)] relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyanCore to-transparent"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyanCore/10 rounded-md">
                  <Warehouse className="w-6 h-6 text-cyanCore" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">专业仓</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end border-b border-slate-700/50 pb-2">
                  <span className="text-sm text-slate-300">专业仓数量</span>
                  <div className="text-right">
                    <span className="text-cyanCore font-bold font-display">{formatQuantity(1211)}</span> <span className="text-xs text-slate-400">个</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-300">专业仓库存金额</span>
                  <div className="text-right">
                    <span className="text-amberCore font-bold font-display">{formatAmount(11.5)}</span> <span className="text-xs text-slate-400">亿元</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          
        </div>
        
        {/* Bottom Buttons */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-6 z-20">
          <Link href="/project-monitoring">
            <button className="px-8 py-2 rounded-full border border-cyanCore/60 bg-panelStrong text-cyanCore font-semibold hover:bg-cyanCore/20 hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all">
              工程监控
            </button>
          </Link>
          <button className="px-8 py-2 rounded-full border border-cyanCore/60 bg-panelStrong text-cyanCore font-semibold hover:bg-cyanCore/20 hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all">
            甘特图
          </button>
        </div>
      </main>
    </>
  );
}
