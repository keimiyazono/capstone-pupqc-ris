'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentWorkflowRow } from './student-workflow-row';
import { FacultyWorkflowRow } from './faculty-workflow-row';

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
      <CardContent className="space-y-6">
        <div className="border rounded">
          <StudentWorkflowRow research_type={research_type} />
        </div>

        <div className="border rounded">
          <FacultyWorkflowRow research_type={research_type} />
        </div>
      </CardContent>
    </Card>
  );
}
