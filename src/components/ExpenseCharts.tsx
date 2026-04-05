import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from "recharts";
import { Expense, CATEGORY_COLORS } from "@/lib/expense-data";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

interface Props {
  expenses: Expense[];
}

export function ExpensePieChart({ expenses }: Props) {
  const data = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value: +value.toFixed(2) }));
  }, [expenses]);

  if (!data.length) return <EmptyChart />;

  return (
    <ChartCard title="Spending by Category">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#64748b"} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `₹${v.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ExpenseLineChart({ expenses }: Props) {
  const data = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = subMonths(new Date(), 5 - i);
      const start = startOfMonth(d);
      const end = endOfMonth(d);
      const total = expenses
        .filter((e) => isWithinInterval(new Date(e.date), { start, end }))
        .reduce((s, e) => s + e.amount, 0);
      return { month: format(d, "MMM"), total: +total.toFixed(2) };
    });
    return months;
  }, [expenses]);

  return (
    <ChartCard title="Monthly Spending Trend">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${v}`} />
          <Tooltip formatter={(v: number) => `₹${v.toFixed(2)}`} />
          <Line type="monotone" dataKey="total" stroke="hsl(217 91% 60%)" strokeWidth={3} dot={{ fill: "hsl(217 91% 60%)", r: 5 }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ExpenseBarChart({ expenses }: Props) {
  const data = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map)
      .map(([category, amount]) => ({ category, amount: +amount.toFixed(2) }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  if (!data.length) return null;

  return (
    <ChartCard title="Category Comparison">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={11} angle={-20} textAnchor="end" height={60} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${v}`} />
          <Tooltip formatter={(v: number) => `₹${v.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || "#64748b"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-fade-in">
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">{title}</h3>
      {children}
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card flex items-center justify-center h-[320px]">
      <p className="text-muted-foreground">No data to display</p>
    </div>
  );
}
