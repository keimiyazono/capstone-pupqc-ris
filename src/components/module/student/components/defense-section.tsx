import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface DefenseSectionProps {
  label: string;
  className?: string;
}

export function DefenseSection({ label, className }: DefenseSectionProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>
          Only click the &ldquo;Done&ldquo; button after completing your
          pre-oral defense presentation. Please refrain from clicking the button
          if your presentation is not yet concluded.
        </CardDescription>
      </CardHeader>
      <CardContent>test</CardContent>
    </Card>
  );
}
