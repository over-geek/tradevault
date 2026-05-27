"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon } from "lucide-react";

interface RecentActivityProps {
  data: {
    recentTrades: Array<{
      id: string;
      symbol: string;
      type: "Long" | "Short";
      pnl: number;
      pnlPercent: number;
      date: string;
      status: "completed" | "pending";
    }>;
    recentTransactions: Array<{
      id: string;
      type: "deposit" | "withdrawal" | "dividend";
      amount: number;
      account: string;
      date: string;
    }>;
  };
}

export function RecentActivity({ data }: RecentActivityProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <TrendingUpIcon className="w-4 h-4 text-green-600" />;
      case "withdrawal":
        return <TrendingDownIcon className="w-4 h-4 text-red-600" />;
      case "dividend":
        return <DollarSignIcon className="w-4 h-4 text-blue-600" />;
      default:
        return <ActivityIcon className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ActivityIcon className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recent Trades */}
          <div>
            <h4 className="text-sm font-medium mb-3">Recent Trades</h4>
            <div className="space-y-2">
              {data.recentTrades.slice(0, 5).map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant={trade.type === 'Long' ? 'default' : 'destructive'} className="text-xs">
                      {trade.type}
                    </Badge>
                    <span className="font-medium text-sm">{trade.symbol}</span>
                    <Badge variant="outline" className="text-xs">
                      {trade.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(trade.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h4 className="text-sm font-medium mb-3">Recent Transactions</h4>
            <div className="space-y-2">
              {data.recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center gap-2">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <div className="text-sm font-medium capitalize">{transaction.type}</div>
                      <div className="text-xs text-muted-foreground">{transaction.account}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      transaction.type === 'deposit' || transaction.type === 'dividend' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' || transaction.type === 'dividend' ? '+' : '-'}
                      ${transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
