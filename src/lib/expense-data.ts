export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
};

export const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health",
  "Travel",
  "Education",
  "Other",
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "#3b82f6",
  Transportation: "#8b5cf6",
  Shopping: "#ec4899",
  Entertainment: "#f59e0b",
  "Bills & Utilities": "#10b981",
  Health: "#ef4444",
  Travel: "#06b6d4",
  Education: "#6366f1",
  Other: "#64748b",
};

const now = new Date();
const sampleExpenses: Expense[] = [
  { id: "1", title: "Grocery Shopping", amount: 85.5, category: "Food & Dining", date: new Date(now.getFullYear(), now.getMonth(), 2).toISOString() },
  { id: "2", title: "Electric Bill", amount: 120, category: "Bills & Utilities", date: new Date(now.getFullYear(), now.getMonth(), 5).toISOString() },
  { id: "3", title: "Uber Ride", amount: 24.99, category: "Transportation", date: new Date(now.getFullYear(), now.getMonth(), 7).toISOString() },
  { id: "4", title: "Netflix Subscription", amount: 15.99, category: "Entertainment", date: new Date(now.getFullYear(), now.getMonth(), 10).toISOString() },
  { id: "5", title: "New Sneakers", amount: 129.99, category: "Shopping", date: new Date(now.getFullYear(), now.getMonth(), 12).toISOString() },
  { id: "6", title: "Gym Membership", amount: 49.99, category: "Health", date: new Date(now.getFullYear(), now.getMonth(), 15).toISOString() },
  { id: "7", title: "Online Course", amount: 199.99, category: "Education", date: new Date(now.getFullYear(), now.getMonth() - 1, 20).toISOString() },
  { id: "8", title: "Flight Tickets", amount: 350, category: "Travel", date: new Date(now.getFullYear(), now.getMonth() - 1, 8).toISOString() },
  { id: "9", title: "Restaurant Dinner", amount: 67.5, category: "Food & Dining", date: new Date(now.getFullYear(), now.getMonth() - 1, 14).toISOString() },
  { id: "10", title: "Gas Station", amount: 45, category: "Transportation", date: new Date(now.getFullYear(), now.getMonth() - 2, 22).toISOString() },
  { id: "11", title: "Phone Bill", amount: 65, category: "Bills & Utilities", date: new Date(now.getFullYear(), now.getMonth() - 2, 3).toISOString() },
  { id: "12", title: "Concert Tickets", amount: 89, category: "Entertainment", date: new Date(now.getFullYear(), now.getMonth() - 2, 18).toISOString() },
];

export function getInitialExpenses(): Expense[] {
  const stored = localStorage.getItem("expenses");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("expenses", JSON.stringify(sampleExpenses));
  return sampleExpenses;
}

export function saveExpenses(expenses: Expense[]) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
