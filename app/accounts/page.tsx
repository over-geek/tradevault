"use client";

import { useState } from "react";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddAccountDialog } from "@/components/dialogs/add-account-dialog";
import { DollarSignIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";

export default function AccountsPage() {
  const { isCollapsed } = useSidebarState();
  
  // Mock data for demonstration - now with state
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Main Trading Account",
      type: "Live",
      broker: "Interactive Brokers",
      balance: 50000,
      dayChange: 1250,
      dayChangePercent: 2.5,
      currency: "USD",
      status: "active"
    },
    {
      id: 2,
      name: "Demo Account",
      type: "Demo",
      broker: "MetaTrader 5",
      balance: 10000,
      dayChange: -150,
      dayChangePercent: -1.5,
      currency: "USD",
      status: "active"
    },
    {
      id: 3,
      name: "Swing Trading",
      type: "Live",
      broker: "TD Ameritrade",
      balance: 25000,
      dayChange: 800,
      dayChangePercent: 3.2,
      currency: "USD",
      status: "active"
    }
  ]);

  interface Account {
    id: number;
    name: string;
    type: string;
    broker: string;
    balance: number;
    dayChange: number;
    dayChangePercent: number;
    currency: string;
    status: string;
  }

  const handleAddAccount = (newAccount: Account) => {
    setAccounts(prev => [...prev, newAccount]);
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalDayChange = accounts.reduce((sum, account) => sum + account.dayChange, 0);
  const totalDayChangePercent = (totalDayChange / (totalBalance - totalDayChange)) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage your trading accounts and monitor performance</p>
        </div>
        <AddAccountDialog onAddAccount={handleAddAccount} />
      </div>

      {/* Summary Cards */}
      <div className={`grid gap-4 ${isCollapsed ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
            <div className={`text-xs flex items-center ${totalDayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalDayChange >= 0 ? (
                <TrendingUpIcon className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDownIcon className="w-3 h-3 mr-1" />
              )}
              {totalDayChange >= 0 ? '+' : ''}${totalDayChange.toLocaleString()} ({totalDayChangePercent.toFixed(2)}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.filter(acc => acc.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              {accounts.filter(acc => acc.type === 'Live').length} Live, {accounts.filter(acc => acc.type === 'Demo').length} Demo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3.2%</div>
            <p className="text-xs text-muted-foreground">Swing Trading Account</p>
          </CardContent>
        </Card>

        {/* Additional card that shows when collapsed */}
        <Card className={isCollapsed ? 'block' : 'hidden xl:block'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+8.7%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Accounts</h2>
        <div className={`grid gap-4 ${isCollapsed ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {accounts.map((account) => (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{account.name}</h3>
                      <Badge variant={account.type === 'Live' ? 'default' : 'secondary'}>
                        {account.type}
                      </Badge>
                      <Badge variant="outline">{account.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{account.broker}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-2xl font-bold">
                      ${account.balance.toLocaleString()} {account.currency}
                    </div>
                    <div className={`text-sm flex items-center justify-end ${account.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {account.dayChange >= 0 ? (
                        <TrendingUpIcon className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDownIcon className="w-3 h-3 mr-1" />
                      )}
                      {account.dayChange >= 0 ? '+' : ''}${account.dayChange.toLocaleString()} ({account.dayChangePercent.toFixed(2)}%)
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
