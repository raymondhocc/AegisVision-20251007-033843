import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { DemographicsData, GenderDistribution } from '@/types';
interface DemographicsWidgetProps {
  ageData: DemographicsData[];
  genderData: GenderDistribution[];
}
const GENDER_COLORS = {
  Male: 'hsl(var(--primary))',
  Female: 'hsl(var(--primary) / 0.5)',
};
export function DemographicsWidget({ ageData, genderData }: DemographicsWidgetProps) {
  const totalPeople = ageData.reduce((acc, curr) => acc + curr.male + curr.female, 0);
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5}>
                {genderData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={GENDER_COLORS[entry.name]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 text-sm">
          {genderData.map(item => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: GENDER_COLORS[item.name] }} />
              <span>{item.name}</span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Age Distribution</h4>
          {ageData.map((ageGroup) => {
            const groupTotal = ageGroup.male + ageGroup.female;
            const percentage = totalPeople > 0 ? (groupTotal / totalPeople) * 100 : 0;
            return (
              <div key={ageGroup.age}>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-medium">{ageGroup.age}</span>
                  <span className="text-muted-foreground">{groupTotal}</span>
                </div>
                <Progress value={percentage} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}