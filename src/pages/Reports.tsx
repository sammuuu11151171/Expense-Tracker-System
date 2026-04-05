import { ExpensePieChart, ExpenseLineChart, ExpenseBarChart } from "@/components/ExpenseCharts";
import { useExpenseContext } from "@/contexts/ExpenseContext";

export default function Reports() {
  const { expenses } = useExpenseContext();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground mt-1">Detailed breakdown of your spending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensePieChart expenses={expenses} />
        <ExpenseLineChart expenses={expenses} />
      </div>

      <ExpenseBarChart expenses={expenses} />
    </div>
  );
}
