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

interface AddAccountDialogProps {
  onAddAccount: (account: Account) => void;
}

export function AddAccountDialog({ onAddAccount }: AddAccountDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    broker: "",
    balance: "",
    currency: "USD",
  });

  const brokers = [
    "Interactive Brokers",
    "TD Ameritrade",
    "E*TRADE",
    "Charles Schwab",
    "Fidelity",
    "MetaTrader 5",
    "MetaTrader 4",
    "TradingView",
    "Other",
  ];

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.broker || !formData.balance) {
      return;
    }

    const newAccount = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      broker: formData.broker,
      balance: parseFloat(formData.balance),
      dayChange: 0,
      dayChangePercent: 0,
      currency: formData.currency,
      status: "active",
    };

    onAddAccount(newAccount);
    setFormData({
      name: "",
      type: "",
      broker: "",
      balance: "",
      currency: "USD",
    });
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Trading Account</DialogTitle>
          <DialogDescription>
            Create a new trading account to track your investments and performance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              id="account-name"
              placeholder="My Trading Account"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="account-type">Account Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Live">Live Trading</SelectItem>
                <SelectItem value="Demo">Demo/Paper Trading</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="broker">Broker</Label>
            <Select value={formData.broker} onValueChange={(value) => handleInputChange("broker", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your broker" />
              </SelectTrigger>
              <SelectContent>
                {brokers.map((broker) => (
                  <SelectItem key={broker} value={broker}>
                    {broker}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="balance">Initial Balance</Label>
              <Input
                id="balance"
                type="number"
                placeholder="10000"
                step="0.01"
                min="0"
                value={formData.balance}
                onChange={(e) => handleInputChange("balance", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
