'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FacultyWorkflowRow } from './faculty-workflow-row';
import { StudentWorkflowRow } from './student-workflow-row';

export interface WorkflowCardProps {
  research_type: string;
}

export function WorkflowCard({ research_type }: WorkflowCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary uppercase">
          {research_type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-10 border rounded">
          <StudentWorkflowRow research_type={research_type} />

          <Separator className="col-span-2" />

          <FacultyWorkflowRow research_type={research_type} />
        </div>
      </CardContent>
    </Card>
  );
}
