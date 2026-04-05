import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, gradient, delay = 0 }: StatCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-card-foreground animate-count-up">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${gradient}`}>
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full ${gradient}`} />
    </div>
  );
}
