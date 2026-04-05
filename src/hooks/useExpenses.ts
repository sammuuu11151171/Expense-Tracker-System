import { useState, useCallback, useMemo } from "react";
import { Expense, getInitialExpenses, saveExpenses } from "@/lib/expense-data";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(getInitialExpenses);

  const update = useCallback((next: Expense[]) => {
    setExpenses(next);
    saveExpenses(next);
  }, []);

  const addExpense = useCallback((e: Omit<Expense, "id">) => {
    const newExp = { ...e, id: crypto.randomUUID() };
    update([newExp, ...expenses]);
  }, [expenses, update]);

  const editExpense = useCallback((e: Expense) => {
    update(expenses.map((x) => (x.id === e.id ? e : x)));
  }, [expenses, update]);

  const deleteExpense = useCallback((id: string) => {
    update(expenses.filter((x) => x.id !== id));
  }, [expenses, update]);

  const stats = useMemo(() => {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const highest = expenses.length ? Math.max(...expenses.map((e) => e.amount)) : 0;
    const budget = 3000;
    return { total, remaining: budget - total, highest, count: expenses.length, budget };
  }, [expenses]);

  return { expenses, addExpense, editExpense, deleteExpense, stats };
}
