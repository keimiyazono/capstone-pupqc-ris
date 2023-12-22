'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StudentWorkflowRow } from './student-workflow-row';

export interface WorkflowCardProps {
  research_type: string;
}

export function WorkflowCard({ research_type }: WorkflowCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">{research_type}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          <StudentWorkflowRow research_type={research_type} />

          <Separator className="col-span-2" />

          {/* <div className="col-span-2 grid grid-cols-2 gap-x-20">
            <div className="col-span-1 row-span-2">
              <WorkflowSections sections={[]} />
            </div>
            <div className="col-span-1">process</div>
            <div className="col-span-1">process</div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
