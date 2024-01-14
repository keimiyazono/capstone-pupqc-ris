'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StudentFlowInfoStep } from '@/hooks/use-student-query';
import UpdateCopyrightDocuments from './copyright-documents/update-copyright-documents';
import UploadCopyrightDocuments from './copyright-documents/upload-copyright-documents';

export interface CopyrightDocumentsData {
  co_authorship: string;
  recordal_template: string;
  affidavit_co_ownership: string;
  ureb_18: string;
  modified_at: string;
  joint_authorship: string;
  journal_publication: string;
  approval_sheet: string;
  copyright_manuscript: string;
  created_at: string;
  receipt_payment: string;
  status: string;
  id: string;
  recordal_slip: string;
  workflow_step_id: string;
  research_paper_id: string;
  acknowledgement_receipt: string;
  certificate_copyright: string;
}

export interface CopyrightDocumentsSectionProps {
  researchPaperId: string;
  step: StudentFlowInfoStep;
  updateStepCallback: () => void;
}

export function CopyrightDocumentsSection({
  researchPaperId,
  step,
  updateStepCallback,
}: CopyrightDocumentsSectionProps) {
  const wholeInfo = (step.info['whole-info'] ??
    [])[0] as unknown as CopyrightDocumentsData;

  const action = Boolean(wholeInfo?.id) ? 'update' : 'submit';

  const workflow_step_id = wholeInfo?.workflow_step_id ?? step?.id ?? '';

  const status = step?.info?.['whole-info']?.[0]?.status ?? '';

  const APPROVE_LIST = ['Approve', 'Approved'];

  const isApproved = APPROVE_LIST.includes(status);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Copyright Documents</CardTitle>
          <CardDescription>
            Please provide all the necessary information in the designated
            fields, and click the &quot;upload&quot; button once you&apos;ve
            completed the form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded p-6">
            {action === 'submit' ? (
              <UploadCopyrightDocuments
                workflow_step_id={workflow_step_id}
                research_paper_id={researchPaperId}
              />
            ) : (
              <UpdateCopyrightDocuments copyright={wholeInfo} />
            )}
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="button"
              variant="secondary"
              className="w-40 text-lg"
              onClick={updateStepCallback}
              disabled={!isApproved}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
