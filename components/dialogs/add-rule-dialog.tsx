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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";

interface AddRuleDialogProps {
  onAddRule: (rule: any) => void;
  children?: React.ReactNode;
}

export function AddRuleDialog({ onAddRule, children }: AddRuleDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    rule: "",
  });

  const categories = [
    "Risk Management",
    "Entry Rules",
    "Exit Rules",
    "Position Sizing",
    "Market Conditions",
    "Psychology",
    "Money Management",
    "Technical Analysis",
    "Fundamental Analysis",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.rule) {
      return;
    }

    const newRule = {
      id: Date.now(),
      category: formData.category,
      rule: formData.rule,
      status: "active",
      violations: 0,
    };

    onAddRule(newRule);
    setFormData({ category: "", rule: "" });
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const ruleTemplates = {
    "Risk Management": [
      "Never risk more than 2% of account per trade",
      "Set stop loss before entering any position",
      "Maximum 3 consecutive losing trades before taking a break",
      "Never add to losing positions",
    ],
    "Entry Rules": [
      "Only enter trades with 3:1 risk/reward ratio minimum",
      "Wait for confirmation candle before entry",
      "Enter only during high volume periods",
      "Avoid trading during major news events",
    ],
    "Exit Rules": [
      "Take partial profits at 2:1 risk/reward",
      "Trail stop loss after reaching 1:1 ratio",
      "Exit immediately if thesis is invalidated",
      "Close all positions before market close on Friday",
    ],
    "Position Sizing": [
      "Maximum 5 positions open simultaneously",
      "Reduce position size by 50% after 2 consecutive losses",
      "Risk no more than 6% of portfolio in correlated trades",
      "Size positions based on volatility",
    ],
    "Market Conditions": [
      "Reduce trading frequency during low volatility",
      "Avoid swing trades during earnings season",
      "Focus on defensive stocks during market downturns",
      "Increase cash position when VIX > 30",
    ],
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Rule
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Trading Rule</DialogTitle>
          <DialogDescription>
            Create a new rule to help maintain discipline in your trading strategy.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rule-category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select rule category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rule-text">Rule</Label>
            <Input
              id="rule-text"
              placeholder="Enter your trading rule..."
              value={formData.rule}
              onChange={(e) => handleInputChange("rule", e.target.value)}
              required
            />
          </div>

          {formData.category && ruleTemplates[formData.category as keyof typeof ruleTemplates] && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Suggested rules for {formData.category}:</p>
              <div className="space-y-1">
                {ruleTemplates[formData.category as keyof typeof ruleTemplates].map((template, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto text-xs text-left justify-start p-2 whitespace-normal"
                    onClick={() => handleInputChange("rule", template)}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Rule</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
