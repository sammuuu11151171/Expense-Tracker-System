import { useState } from "react";
import { CATEGORIES } from "@/lib/expense-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useExpenseContext } from "@/contexts/ExpenseContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export default function AddExpense() {
  const { addExpense } = useExpenseContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;
    addExpense({ title: title.trim(), amount: parseFloat(amount), category, date: new Date(date).toISOString() });
    toast.success("Expense added successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Add Expense</h2>
        <p className="text-muted-foreground mt-1">Record a new transaction</p>
      </div>

      <div className="rounded-xl bg-card p-6 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Grocery Shopping" className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" step="0.01" min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="mt-1.5" required />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5" required />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground h-11">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </form>
      </div>
    </div>
  );
}
