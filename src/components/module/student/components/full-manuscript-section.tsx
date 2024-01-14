'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentFlowInfoStep } from '@/hooks/use-student-query';
import UpdateFullManuscript from './full-manuscript/update-full-manuscript';
import UploadFullManuscript from './full-manuscript/upload-full-manuscript';

export interface FullManuscriptData {
  created_at: string;
  modified_at: string;
  research_paper_id: string;
  keywords: string;
  abstract: string;
  workflow_step_id: string;
  id: string;
  content: string;
  file: string;
  status: string;
}

export interface FullManuscriptSectionProps {
  researchPaperId: string;
  step: StudentFlowInfoStep;
  updateStepCallback: () => void;
}

export function FullManuscriptSection({
  researchPaperId,
  step,
  updateStepCallback,
}: FullManuscriptSectionProps) {
  const wholeInfo = (step.info['whole-info'] ??
    [])[0] as unknown as FullManuscriptData;

  const action = Boolean(wholeInfo?.id) ? 'update' : 'submit';

  const workflow_step_id = wholeInfo?.workflow_step_id ?? step?.id ?? '';

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Ethics/Protocol</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded p-6">
            {action === 'submit' ? (
              <UploadFullManuscript
                workflow_step_id={workflow_step_id}
                research_paper_id={researchPaperId}
              />
            ) : (
              <UpdateFullManuscript manuscript={wholeInfo}/>
            )}
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="button"
              variant="secondary"
              className="w-40 text-lg"
              onClick={updateStepCallback}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
