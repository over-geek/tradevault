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
import { Badge } from "@/components/ui/badge";
import { PlusIcon, XIcon } from "lucide-react";

interface AddTradeDialogProps {
  onAddTrade: (trade: any) => void;
}

export function AddTradeDialog({ onAddTrade }: AddTradeDialogProps) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [formData, setFormData] = useState({
    symbol: "",
    type: "",
    entry: "",
    exit: "",
    quantity: "",
    strategy: "",
    notes: "",
    date: new Date().toISOString().split('T')[0],
  });

  const strategies = [
    "Breakout",
    "Mean Reversion",
    "Momentum",
    "Scalping",
    "Swing Trading",
    "Index Following",
    "Earnings Play",
    "Technical Analysis",
    "Fundamental Analysis",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.symbol || !formData.type || !formData.entry || !formData.exit || !formData.quantity) {
      return;
    }

    const entryPrice = parseFloat(formData.entry);
    const exitPrice = parseFloat(formData.exit);
    const quantity = parseInt(formData.quantity);
    
    let pnl: number;
    let pnlPercent: number;

    if (formData.type === "Long") {
      pnl = (exitPrice - entryPrice) * quantity;
      pnlPercent = ((exitPrice - entryPrice) / entryPrice) * 100;
    } else {
      pnl = (entryPrice - exitPrice) * quantity;
      pnlPercent = ((entryPrice - exitPrice) / entryPrice) * 100;
    }

    const newTrade = {
      id: Date.now(),
      date: formData.date,
      symbol: formData.symbol.toUpperCase(),
      type: formData.type,
      entry: entryPrice,
      exit: exitPrice,
      quantity,
      pnl,
      pnlPercent,
      strategy: formData.strategy,
      notes: formData.notes,
      tags,
    };

    onAddTrade(newTrade);
    setFormData({
      symbol: "",
      type: "",
      entry: "",
      exit: "",
      quantity: "",
      strategy: "",
      notes: "",
      date: new Date().toISOString().split('T')[0],
    });
    setTags([]);
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Trade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Trade</DialogTitle>
          <DialogDescription>
            Record a new trade to track your trading performance and analysis.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="AAPL"
                value={formData.symbol}
                onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trade-type">Trade Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Long">Long</SelectItem>
                  <SelectItem value="Short">Short</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entry">Entry Price</Label>
              <Input
                id="entry"
                type="number"
                placeholder="100.00"
                step="0.01"
                min="0"
                value={formData.entry}
                onChange={(e) => handleInputChange("entry", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exit">Exit Price</Label>
              <Input
                id="exit"
                type="number"
                placeholder="105.00"
                step="0.01"
                min="0"
                value={formData.exit}
                onChange={(e) => handleInputChange("exit", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="100"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategy">Strategy</Label>
              <Select value={formData.strategy} onValueChange={(value) => handleInputChange("strategy", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  {strategies.map((strategy) => (
                    <SelectItem key={strategy} value={strategy}>
                      {strategy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Trade Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              placeholder="Trade analysis and reasoning..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleTagKeyPress}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
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
            <Button type="submit">Add Trade</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
