import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { AlertsBySeverity } from '@/types';
interface AlertsBySeverityChartProps {
  data: AlertsBySeverity[];
}
const COLORS = {
  Critical: '#ef4444', // red-500
  High: '#f97316',     // orange-500
  Medium: '#eab308',   // yellow-500
  Low: '#3b82f6',      // blue-500
};
export function AlertsBySeverityChart({ data }: AlertsBySeverityChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Legend wrapperStyle={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}