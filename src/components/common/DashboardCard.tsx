import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { DashboardStat } from '@/types';

interface DashboardCardProps {
  stat: DashboardStat;
}

export default function DashboardCard({ stat }: DashboardCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'bg-brand-50 text-brand-600',
    green: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-violet-50 text-violet-600',
    orange: 'bg-orange-50 text-orange-600',
    rose: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  const colorClass = colorMap[stat.color] ?? colorMap.blue;

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-500 font-medium mb-1 truncate">{stat.label}</p>
          <p className="font-display font-bold text-2xl text-slate-900 leading-tight">
            {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
          </p>
        </div>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${colorClass}`}>
          {stat.icon}
        </div>
      </div>

      {/* Change indicator */}
      <div className="flex items-center gap-1.5 mt-3">
        {stat.changeType === 'increase' && (
          <>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600">+{stat.change}%</span>
          </>
        )}
        {stat.changeType === 'decrease' && (
          <>
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-xs font-semibold text-rose-600">-{stat.change}%</span>
          </>
        )}
        {stat.changeType === 'neutral' && (
          <>
            <Minus className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">{stat.change}%</span>
          </>
        )}
        <span className="text-xs text-slate-400">vs last month</span>
      </div>
    </div>
  );
}

// Grid wrapper
export function DashboardCardGrid({ stats }: { stats: DashboardStat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <DashboardCard key={i} stat={stat} />
      ))}
    </div>
  );
}
