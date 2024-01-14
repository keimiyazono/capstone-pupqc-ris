'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { BiLoaderAlt } from 'react-icons/bi';
// import { columns } from './ethics-protocol-section-table/columns';
// import { DataTable } from './ethics-protocol-section-table/data-table';
import { Button } from '@/components/ui/button';
import { StudentFlowInfoStep } from '@/hooks/use-student-query';
import UpdateEthicsForm from './ethics/update-ethics-form';
import UploadEthicsForm from './ethics/upload-ethics-form';

export interface EthicsData {
  modified_at: string;
  created_at: string;
  research_paper_id: string;
  urec_9: string;
  urec_11: string;
  certificate_of_validation: string;
  status: string;
  id: string;
  letter_of_intent: string;
  urec_10: string;
  urec_12: string;
  co_authorship: string;
  workflow_step_id: string;
}

export interface EthicsProtocolSectionProps {
  research_type: string;
  className?: string;
  researchPaperId: string;
  step: StudentFlowInfoStep;
  updateStepCallback: () => void;
}

export function EthicsProtocolSection({
  research_type,
  className,
  researchPaperId,
  step,
  updateStepCallback,
}: EthicsProtocolSectionProps) {
  const wholeInfo = (step.info['whole-info'] ?? [])[0] as unknown as EthicsData;

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
              <UploadEthicsForm
                workflow_step_id={workflow_step_id}
                research_paper_id={researchPaperId}
              />
            ) : (
              <UpdateEthicsForm ethics={wholeInfo} />
            )}
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="button"
              variant="secondary"
              className="w-40 text-lg"
              onClick={updateStepCallback}
              // disabled={isSubmitting}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
