"use client";

import { useState } from "react";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { NewPlanDialog } from "@/components/dialogs/new-plan-dialog";
import { EditPlanDialog } from "@/components/dialogs/edit-plan-dialog";
import { AddRuleDialog } from "@/components/dialogs/add-rule-dialog";
import { PlusIcon, TargetIcon, AlertTriangleIcon, TrendingUpIcon, BookOpenIcon, EditIcon } from "lucide-react";

export default function TradingPlanPage() {
  const { isCollapsed } = useSidebarState();
  
  // Mock data for demonstration - now with state
  const [currentPlan, setCurrentPlan] = useState({
    name: "Q1 2024 Growth Strategy",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    targetReturn: 15,
    currentReturn: 8.5,
    maxDrawdown: 5,
    currentDrawdown: 2.1,
    riskPerTrade: 2,
    strategies: ["Momentum Breakouts", "Mean Reversion", "Earnings Plays"]
  });

  const [rules, setRules] = useState([
    {
      id: 1,
      category: "Risk Management",
      rule: "Never risk more than 2% of account per trade",
      status: "active",
      violations: 0
    },
    {
      id: 2,
      category: "Entry Rules",
      rule: "Only enter trades with 3:1 risk/reward ratio minimum",
      status: "active",
      violations: 1
    },
    {
      id: 3,
      category: "Position Sizing",
      rule: "Maximum 5 positions open simultaneously",
      status: "active",
      violations: 0
    },
    {
      id: 4,
      category: "Exit Rules",
      rule: "Set stop loss immediately after entry",
      status: "active",
      violations: 2
    },
    {
      id: 5,
      category: "Market Conditions",
      rule: "Reduce position size by 50% in high volatility periods",
      status: "active",
      violations: 0
    }
  ]);

  const handleCreatePlan = (newPlan: any) => {
    setCurrentPlan(newPlan);
  };

  const handleUpdatePlan = (updatedPlan: any) => {
    setCurrentPlan(updatedPlan);
  };

  const handleAddRule = (newRule: any) => {
    setRules(prev => [...prev, newRule]);
  };

  const goals = [
    {
      id: 1,
      goal: "Achieve 15% annual return",
      target: 15,
      current: 8.5,
      deadline: "2024-12-31"
    },
    {
      id: 2,
      goal: "Maintain win rate above 60%",
      target: 60,
      current: 66.7,
      deadline: "Ongoing"
    },
    {
      id: 3,
      goal: "Keep max drawdown under 5%",
      target: 5,
      current: 2.1,
      deadline: "Ongoing"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trading Plan</h1>
          <p className="text-muted-foreground">Define your strategy and track adherence to your trading rules</p>
        </div>
        <NewPlanDialog onCreatePlan={handleCreatePlan} />
      </div>

      {/* Current Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TargetIcon className="w-5 h-5" />
              {currentPlan.name}
            </div>
            <EditPlanDialog plan={currentPlan} onUpdatePlan={handleUpdatePlan}>
              <Button variant="outline" size="sm">
                <EditIcon className="w-4 h-4 mr-2" />
                Edit Plan
              </Button>
            </EditPlanDialog>
          </CardTitle>
          <CardDescription>
            {currentPlan.startDate} - {currentPlan.endDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Target Return: {currentPlan.targetReturn}%</span>
                  <span className="text-sm text-muted-foreground">{currentPlan.currentReturn}%</span>
                </div>
                <Progress value={(currentPlan.currentReturn / currentPlan.targetReturn) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Max Drawdown: {currentPlan.maxDrawdown}%</span>
                  <span className="text-sm text-muted-foreground">{currentPlan.currentDrawdown}%</span>
                </div>
                <Progress 
                  value={(currentPlan.currentDrawdown / currentPlan.maxDrawdown) * 100} 
                  className="h-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Active Strategies</h4>
              <div className="flex flex-wrap gap-2">
                {currentPlan.strategies.map((strategy, index) => (
                  <Badge key={index} variant="outline">{strategy}</Badge>
                ))}
              </div>
              <div className="pt-2">
                <span className="text-sm text-muted-foreground">Risk per trade: {currentPlan.riskPerTrade}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Tracking */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TrendingUpIcon className="w-5 h-5" />
          Goals & Targets
        </h2>
        <div className={`grid gap-4 ${isCollapsed ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{goal.goal}</h3>
                  <Badge variant={goal.current >= goal.target ? "default" : "secondary"}>
                    {goal.deadline}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.current}% / {goal.target}%</span>
                  </div>
                  <Progress 
                    value={Math.min((goal.current / goal.target) * 100, 100)} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trading Rules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5" />
            Trading Rules
          </h2>
          <AddRuleDialog onAddRule={handleAddRule} />
        </div>
        <div className={`grid gap-4 ${isCollapsed ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {rules.map((rule) => (
            <Card key={rule.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {rule.category}
                      </Badge>
                      {rule.violations > 0 && (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangleIcon className="w-3 h-3" />
                          <span className="text-xs">{rule.violations} violations</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium">{rule.rule}</p>
                  </div>
                  <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                    {rule.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline">View History</Button>
        <Button variant="outline">Export Plan</Button>
      </div>
    </div>
  );
}
