import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}
export function SettingsCard({ title, description, children, className }: SettingsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}