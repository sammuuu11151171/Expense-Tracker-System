import { DollarSign, TrendingDown, ArrowUpCircle, Receipt } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ExpensePieChart, ExpenseLineChart, ExpenseBarChart } from "@/components/ExpenseCharts";
import { ExpenseList } from "@/components/ExpenseList";
import { useExpenseContext } from "@/contexts/ExpenseContext";

export default function Dashboard() {
  const { expenses, editExpense, deleteExpense, stats } = useExpenseContext();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Track your spending at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Expenses" value={`₹${stats.total.toFixed(2)}`} icon={DollarSign} gradient="gradient-primary" delay={0} />
        <StatCard title="Budget Remaining" value={`₹${stats.remaining.toFixed(2)}`} icon={TrendingDown} gradient="gradient-success" delay={100} />
        <StatCard title="Highest Expense" value={`₹${stats.highest.toFixed(2)}`} icon={ArrowUpCircle} gradient="gradient-warning" delay={200} />
        <StatCard title="Transactions" value={stats.count.toString()} icon={Receipt} gradient="gradient-danger" delay={300} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensePieChart expenses={expenses} />
        <ExpenseLineChart expenses={expenses} />
      </div>

      <ExpenseList expenses={expenses} onEdit={editExpense} onDelete={deleteExpense} />
    </div>
  );
}
