'use client';

import { ResearchView } from '@/components/global/research-container';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Stepper } from '../../stepper';
import { useStudentWorkflowContext } from './context/student-workflow';

export interface ProposalViewSectionProps {
  id: string;
}

export function ProposalViewSection({ id }: ProposalViewSectionProps) {
  const router = useRouter();

  const { researchType, workflowId } = useStudentWorkflowContext();

  console.log({ researchType, workflowId });

  

  return (
    <section className="py-10 space-y-10 h-fit">
      <Button
        type="button"
        variant="secondary"
        className="gap-2"
        onClick={() => router.back()}
      >
        <IoChevronBackSharp />
        <span>Back</span>
      </Button>

      <Stepper
        steps={[
          'Proposal',
          'Pre-Oral Defense',
          'Ethics',
          'Full Manuscript',
          'Final Defense',
          'Copyright',
        ]}
        currentStep={0}
        className="justify-center"
      />

      <div className="border rounded p-10">
        <ResearchView id={id} showUpdateSheet />
      </div>
    </section>
  );
}
