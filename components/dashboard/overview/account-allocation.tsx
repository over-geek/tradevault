"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimplePieChart } from "@/components/charts/simple-pie-chart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChartIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";

interface AccountAllocationProps {
  data: {
    accounts: Array<{
      name: string;
      value: number;
      percentage: number;
      change: number;
      changePercent: number;
      type: "Live" | "Demo";
    }>;
    totalValue: number;
  };
}

export function AccountAllocation({ data }: AccountAllocationProps) {
  const chartData = data.accounts.map(account => ({
    name: account.name,
    value: account.value,
    percentage: account.percentage
  }));

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="w-5 h-5" />
          Account Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="flex justify-center">
            <SimplePieChart
              data={chartData}
              colors={colors}
              size={250}
            />
          </div>

          {/* Account Details */}
          <div className="space-y-3">
            {data.accounts.map((account, index) => (
              <div key={account.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="text-sm font-medium">{account.name}</span>
                    <Badge variant={account.type === 'Live' ? 'default' : 'secondary'} className="text-xs">
                      {account.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">${account.value.toLocaleString()}</div>
                    <div className={`text-xs flex items-center gap-1 ${account.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {account.changePercent >= 0 ? <TrendingUpIcon className="w-3 h-3" /> : <TrendingDownIcon className="w-3 h-3" />}
                      {account.changePercent >= 0 ? '+' : ''}{account.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={account.percentage} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-12">
                    {account.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Portfolio Value</span>
              <span className="text-lg font-bold">${data.totalValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
