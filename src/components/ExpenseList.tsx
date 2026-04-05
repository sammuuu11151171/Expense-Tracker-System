import { useState } from "react";
import { Expense, CATEGORIES, CATEGORY_COLORS } from "@/lib/expense-data";
import { format } from "date-fns";
import { Search, Pencil, Trash2, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ExpenseFormDialog } from "./ExpenseFormDialog";

interface Props {
  expenses: Expense[];
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const filtered = expenses.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || e.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="rounded-xl bg-card shadow-card animate-fade-in">
      <div className="border-b border-border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Transactions</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="divide-y divide-border">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No expenses found</div>
        ) : (
          filtered.map((expense, i) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 sm:px-6 hover:bg-muted/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[expense.category] + "20", color: CATEGORY_COLORS[expense.category] }}
                >
                  {expense.category.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-card-foreground truncate">{expense.title}</p>
                  <p className="text-xs text-muted-foreground">{expense.category} · {format(new Date(expense.date), "MMM d, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="font-semibold text-card-foreground whitespace-nowrap">
                  ₹{expense.amount.toFixed(2)}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setEditingExpense(expense)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onDelete(expense.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingExpense && (
        <ExpenseFormDialog
          open
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={(e) => {
            onEdit(e as Expense);
            setEditingExpense(null);
          }}
        />
      )}
    </div>
  );
}
