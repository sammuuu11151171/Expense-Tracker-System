import { createContext, useContext, ReactNode } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { Expense } from "@/lib/expense-data";

type ExpenseContextType = ReturnType<typeof useExpenses>;

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const value = useExpenses();
  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenseContext() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenseContext must be used within ExpenseProvider");
  return ctx;
}
