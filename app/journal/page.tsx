"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddTradeDialog } from "@/components/dialogs/add-trade-dialog";
import { CalendarIcon, TrendingUpIcon, TrendingDownIcon, BarChart3Icon } from "lucide-react";

export default function JournalPage() {
  // Mock data for demonstration - now with state
  const [trades, setTrades] = useState([
    {
      id: 1,
      date: "2024-01-15",
      symbol: "AAPL",
      type: "Long",
      entry: 185.50,
      exit: 192.30,
      quantity: 100,
      pnl: 680,
      pnlPercent: 3.67,
      strategy: "Breakout",
      notes: "Clean breakout above resistance with strong volume. Held for 3 days.",
      tags: ["momentum", "tech", "earnings-play"]
    },
    {
      id: 2,
      date: "2024-01-14",
      symbol: "TSLA",
      type: "Short",
      entry: 240.80,
      exit: 235.20,
      quantity: 50,
      pnl: 280,
      pnlPercent: 2.33,
      strategy: "Mean Reversion",
      notes: "Overextended after gap up. Quick scalp on pullback.",
      tags: ["scalp", "gap-fade"]
    },
    {
      id: 3,
      date: "2024-01-13",
      symbol: "SPY",
      type: "Long",
      entry: 478.20,
      exit: 475.80,
      quantity: 200,
      pnl: -480,
      pnlPercent: -1.00,
      strategy: "Index Following",
      notes: "Failed to hold support. Cut losses quickly as planned.",
      tags: ["index", "support-break"]
    }
  ]);

  interface Trade {
    id: number;
    date: string;
    symbol: string;
    type: string;
    entry: number;
    exit: number;
    quantity: number;
    pnl: number;
    pnlPercent: number;
    strategy: string;
    notes: string;
    tags: string[];
  }

  const handleAddTrade = (newTrade: Trade) => {
    setTrades(prev => [newTrade, ...prev]);
  };

  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winningTrades = trades.filter(trade => trade.pnl > 0).length;
  const winRate = (winningTrades / trades.length) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trading Journal</h1>
          <p className="text-muted-foreground">Track and analyze your trading performance</p>
        </div>
        <AddTradeDialog onAddTrade={handleAddTrade} />
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{winningTrades} of {trades.length} trades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trades.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${(totalPnL / trades.length) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {((totalPnL / trades.length) >= 0) ? '+' : ''}${(totalPnL / trades.length).toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">Per trade</p>
          </CardContent>
        </Card>
      </div>

      {/* Trades List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Trades</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </div>

        <div className="space-y-3">
          {trades.map((trade) => (
            <Card key={trade.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{trade.symbol}</h3>
                      <Badge variant={trade.type === 'Long' ? 'default' : 'destructive'}>
                        {trade.type}
                      </Badge>
                      <Badge variant="outline">{trade.strategy}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Entry:</span>
                        <div className="font-medium">${trade.entry}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Exit:</span>
                        <div className="font-medium">${trade.exit}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>
                        <div className="font-medium">{trade.quantity}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <div className="font-medium">{trade.date}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{trade.notes}</p>
                      <div className="flex gap-1">
                        {trade.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1 ml-4">
                    <div className={`text-2xl font-bold flex items-center ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trade.pnl >= 0 ? (
                        <TrendingUpIcon className="w-5 h-5 mr-1" />
                      ) : (
                        <TrendingDownIcon className="w-5 h-5 mr-1" />
                      )}
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toLocaleString()}
                    </div>
                    <div className={`text-sm ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({trade.pnlPercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
