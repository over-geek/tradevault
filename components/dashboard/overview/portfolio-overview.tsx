"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleLineChart } from "@/components/charts/simple-line-chart";
import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, PercentIcon } from "lucide-react";

interface PortfolioOverviewProps {
  data: {
    totalValue: number;
    dayChange: number;
    dayChangePercent: number;
    weekChange: number;
    monthChange: number;
    performanceData: Array<{ date: string; value: number }>;
  };
}

export function PortfolioOverview({ data }: PortfolioOverviewProps) {
  const isPositive = data.dayChange >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSignIcon className="w-5 h-5" />
          Portfolio Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">${data.totalValue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Value</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
                {isPositive ? '+' : ''}${data.dayChange.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${data.dayChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.dayChangePercent >= 0 ? '+' : ''}{data.dayChangePercent.toFixed(2)}%
              </div>
              <div className="text-xs text-muted-foreground">Today %</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${data.monthChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.monthChange >= 0 ? '+' : ''}{data.monthChange.toFixed(2)}%
              </div>
              <div className="text-xs text-muted-foreground">Month</div>
            </div>
          </div>

          {/* Performance Chart */}
          <div>
            <h4 className="text-sm font-medium mb-3">30-Day Performance</h4>
            <SimpleLineChart
              data={data.performanceData}
              color={isPositive ? "#22c55e" : "#ef4444"}
              height={200}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
