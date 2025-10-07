import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
interface ChartCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  loading: boolean;
  className?: string;
}
export function ChartCard({ title, description, children, loading, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="h-[300px] w-full">{children}</div>
        )}
      </CardContent>
    </Card>
  );
}