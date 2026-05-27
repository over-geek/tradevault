"use client";

import { PortfolioOverview } from "@/components/dashboard/overview/portfolio-overview";
import { TradingPerformance } from "@/components/dashboard/overview/trading-performance";
import { AccountAllocation } from "@/components/dashboard/overview/account-allocation";
import { RecentActivity } from "@/components/dashboard/overview/recent-activity";

export default function Home() {
  const portfolioData = {
    totalValue: 85000,
    dayChange: 1250,
    dayChangePercent: 1.49,
    weekChange: 3.2,
    monthChange: 8.7,
    performanceData: [
      { date: "Jan 1", value: 75000 },
      { date: "Jan 5", value: 76500 },
      { date: "Jan 10", value: 74800 },
      { date: "Jan 15", value: 78200 },
      { date: "Jan 20", value: 79500 },
      { date: "Jan 25", value: 82000 },
      { date: "Jan 30", value: 85000 },
    ],
  };

  const tradingData = {
    totalTrades: 47,
    winRate: 66.7,
    totalPnL: 8750,
    avgTrade: 186,
    bestTrade: 2500,
    worstTrade: -850,
    monthlyData: [
      { month: "Oct", pnl: 2100, trades: 15 },
      { month: "Nov", pnl: 3200, trades: 18 },
      { month: "Dec", pnl: 1800, trades: 12 },
      { month: "Jan", pnl: 4200, trades: 22 },
    ],
    riskMetrics: {
      sharpeRatio: 1.34,
      maxDrawdown: 3.2,
      winLossRatio: 2.1,
    },
  };

  const accountData = {
    accounts: [
      { name: "Main Trading", value: 50000, percentage: 58.8, change: 1200, changePercent: 2.5, type: "Live" as const },
      { name: "Swing Trading", value: 25000, percentage: 29.4, change: 800, changePercent: 3.2, type: "Live" as const },
      { name: "Demo Account", value: 10000, percentage: 11.8, change: -150, changePercent: -1.5, type: "Demo" as const },
    ],
    totalValue: 85000,
  };

  const activityData = {
    recentTrades: [
      { id: "1", symbol: "AAPL", type: "Long" as const, pnl: 680, pnlPercent: 3.67, date: "2024-01-15", status: "completed" as const },
      { id: "2", symbol: "TSLA", type: "Short" as const, pnl: 280, pnlPercent: 2.33, date: "2024-01-14", status: "completed" as const },
      { id: "3", symbol: "SPY", type: "Long" as const, pnl: -480, pnlPercent: -1.00, date: "2024-01-13", status: "completed" as const },
      { id: "4", symbol: "MSFT", type: "Long" as const, pnl: 320, pnlPercent: 1.8, date: "2024-01-12", status: "completed" as const },
      { id: "5", symbol: "GOOGL", type: "Short" as const, pnl: -150, pnlPercent: -0.8, date: "2024-01-11", status: "completed" as const },
    ],
    recentTransactions: [
      { id: "1", type: "deposit" as const, amount: 5000, account: "Main Trading", date: "2024-01-10" },
      { id: "2", type: "dividend" as const, amount: 125, account: "Main Trading", date: "2024-01-08" },
      { id: "3", type: "withdrawal" as const, amount: 1000, account: "Swing Trading", date: "2024-01-05" },
      { id: "4", type: "deposit" as const, amount: 2000, account: "Demo Account", date: "2024-01-03" },
    ],
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s your trading overview.</p>
        </div>
      </div>

      {/* Top Row - Portfolio Overview and Trading Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioOverview data={portfolioData} />
        <TradingPerformance data={tradingData} />
      </div>

      {/* Bottom Row - Account Allocation and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccountAllocation data={accountData} />
        <RecentActivity data={activityData} />
      </div>
    </div>
  );
}
