"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, XIcon } from "lucide-react";

interface Plan {
  name: string;
  startDate: string;
  endDate: string;
  targetReturn: number;
  currentReturn: number;
  maxDrawdown: number;
  currentDrawdown: number;
  riskPerTrade: number;
  strategies: string[];
}

interface NewPlanDialogProps {
  onCreatePlan: (plan: Plan) => void;
}

export function NewPlanDialog({ onCreatePlan }: NewPlanDialogProps) {
  const [open, setOpen] = useState(false);
  const [strategies, setStrategies] = useState<string[]>([]);
  const [newStrategy, setNewStrategy] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    targetReturn: "",
    maxDrawdown: "",
    riskPerTrade: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.endDate || !formData.targetReturn || !formData.maxDrawdown || !formData.riskPerTrade) {
      return;
    }

    const newPlan = {
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      targetReturn: parseFloat(formData.targetReturn),
      currentReturn: 0,
      maxDrawdown: parseFloat(formData.maxDrawdown),
      currentDrawdown: 0,
      riskPerTrade: parseFloat(formData.riskPerTrade),
      strategies: strategies,
    };

    onCreatePlan(newPlan);
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      targetReturn: "",
      maxDrawdown: "",
      riskPerTrade: "",
    });
    setStrategies([]);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addStrategy = () => {
    if (newStrategy.trim() && !strategies.includes(newStrategy.trim())) {
      setStrategies(prev => [...prev, newStrategy.trim()]);
      setNewStrategy("");
    }
  };

  const removeStrategy = (strategyToRemove: string) => {
    setStrategies(prev => prev.filter(strategy => strategy !== strategyToRemove));
  };

  const handleStrategyKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStrategy();
    }
  };

  const suggestedStrategies = [
    "Momentum Breakouts",
    "Mean Reversion",
    "Earnings Plays",
    "Swing Trading",
    "Scalping",
    "Position Trading",
    "Technical Analysis",
    "Fundamental Analysis",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Trading Plan</DialogTitle>
          <DialogDescription>
            Define your trading strategy, goals, and risk management parameters.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plan-name">Plan Name</Label>
            <Input
              id="plan-name"
              placeholder="Q1 2024 Growth Strategy"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-return">Target Return (%)</Label>
              <Input
                id="target-return"
                type="number"
                placeholder="15"
                step="0.1"
                min="0"
                value={formData.targetReturn}
                onChange={(e) => handleInputChange("targetReturn", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-drawdown">Max Drawdown (%)</Label>
              <Input
                id="max-drawdown"
                type="number"
                placeholder="5"
                step="0.1"
                min="0"
                value={formData.maxDrawdown}
                onChange={(e) => handleInputChange("maxDrawdown", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="risk-per-trade">Risk Per Trade (%)</Label>
              <Input
                id="risk-per-trade"
                type="number"
                placeholder="2"
                step="0.1"
                min="0"
                max="100"
                value={formData.riskPerTrade}
                onChange={(e) => handleInputChange("riskPerTrade", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="strategies">Trading Strategies</Label>
            <div className="flex gap-2">
              <Input
                id="strategies"
                placeholder="Add strategy..."
                value={newStrategy}
                onChange={(e) => setNewStrategy(e.target.value)}
                onKeyPress={handleStrategyKeyPress}
              />
              <Button type="button" variant="outline" onClick={addStrategy}>
                Add
              </Button>
            </div>
            
            {/* Suggested strategies */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Suggested strategies:</p>
              <div className="flex flex-wrap gap-1">
                {suggestedStrategies.map((strategy) => (
                  <Button
                    key={strategy}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => {
                      if (!strategies.includes(strategy)) {
                        setStrategies(prev => [...prev, strategy]);
                      }
                    }}
                  >
                    + {strategy}
                  </Button>
                ))}
              </div>
            </div>

            {strategies.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {strategies.map((strategy) => (
                  <Badge key={strategy} variant="secondary" className="text-xs">
                    {strategy}
                    <button
                      type="button"
                      onClick={() => removeStrategy(strategy)}
                      className="ml-1 hover:text-destructive"
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
