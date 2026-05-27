"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { Badge } from "@/components/ui/badge";
import { BarChart3Icon, TrendingUpIcon, AlertTriangleIcon } from "lucide-react";

interface TradingPerformanceProps {
  data: {
    totalTrades: number;
    winRate: number;
    totalPnL: number;
    avgTrade: number;
    bestTrade: number;
    worstTrade: number;
    monthlyData: Array<{ month: string; pnl: number; trades: number }>;
    riskMetrics: {
      sharpeRatio: number;
      maxDrawdown: number;
      winLossRatio: number;
    };
  };
}

export function TradingPerformance({ data }: TradingPerformanceProps) {
  const winRateColor = data.winRate >= 60 ? "text-green-600" : data.winRate >= 50 ? "text-yellow-600" : "text-red-600";
  const pnlColor = data.totalPnL >= 0 ? "text-green-600" : "text-red-600";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3Icon className="w-5 h-5" />
          Trading Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{data.totalTrades}</div>
              <div className="text-xs text-muted-foreground">Total Trades</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${winRateColor}`}>
                {data.winRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${pnlColor}`}>
                {data.totalPnL >= 0 ? '+' : ''}${data.totalPnL.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total P&L</div>
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Risk Metrics</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Sharpe Ratio</span>
                <Badge variant={data.riskMetrics.sharpeRatio >= 1 ? "default" : "secondary"}>
                  {data.riskMetrics.sharpeRatio.toFixed(2)}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Max Drawdown</span>
                <Badge variant={data.riskMetrics.maxDrawdown <= 5 ? "default" : "destructive"}>
                  {data.riskMetrics.maxDrawdown.toFixed(2)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-muted-foreground">Win/Loss</span>
                <Badge variant={data.riskMetrics.winLossRatio >= 2 ? "default" : "secondary"}>
                  {data.riskMetrics.winLossRatio.toFixed(2)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Monthly P&L Chart */}
          <div>
            <h4 className="text-sm font-medium mb-3">Monthly P&L</h4>
            <SimpleBarChart
              data={data.monthlyData}
              color="#3b82f6"
              height={200}
            />
          </div>

          {/* Trade Extremes */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <TrendingUpIcon className="w-4 h-4" />
                Best Trade
              </div>
              <div className="text-lg font-semibold">+${data.bestTrade.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
              <div className="flex items-center gap-2 text-red-600 mb-1">
                <AlertTriangleIcon className="w-4 h-4" />
                Worst Trade
              </div>
              <div className="text-lg font-semibold">-${Math.abs(data.worstTrade).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
