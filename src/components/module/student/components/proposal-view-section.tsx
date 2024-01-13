'use client';

import { ResearchView } from '@/components/global/research-container';
import { Button } from '@/components/ui/button';
import { useGetStudentFlowInfoStatus } from '@/hooks/use-student-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { StepStatus, Stepper } from '../../stepper';
import { useStudentWorkflowContext } from './context/student-workflow';
import { CopyrightDocumentsSection } from './copyright-documents-section';
import { DefenseSection } from './defense-section';
import { EthicsProtocolSection } from './ethics-protocol-section';
import { FullManuscriptSection } from './full-manuscript-section';

export interface ProposalViewSectionProps {
  id: string;
}

export function ProposalViewSection({ id }: ProposalViewSectionProps) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(0);

  const { workflowId } = useStudentWorkflowContext();

  const { data: flowInfoStatus = [] } = useGetStudentFlowInfoStatus({
    research_paper_id: id,
    workflow_id: workflowId,
  });

  const flowInfoSteps = flowInfoStatus[0]?.steps ?? [];

  const step = flowInfoSteps[currentStep];

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
        steps={flowInfoSteps.map(({ name, info }) => ({
          name,
          status: info['whole-info'][0]?.status as StepStatus,
        }))}
        currentStep={currentStep}
        className="justify-center"
        onChange={(value) => setCurrentStep(value)}
      />

      {step && (
        <>
          {step.name === 'Proposal' && (
            <div className="border rounded-2xl p-10">
              <ResearchView id={id} showUpdateSheet />
            </div>
          )}

          {step.name === 'Ethics' && <EthicsProtocolSection />}

          {step.name === 'Full Manuscript' && <FullManuscriptSection />}

          {step.name === 'Copyright' && <CopyrightDocumentsSection />}

          {step.name === 'Pre-Oral Defense' && (
            <DefenseSection label="Pre-Oral Defense" />
          )}

          {step.name === 'Final Defense' && (
            <DefenseSection label="Final Defense" />
          )}
        </>
      )}
    </section>
  );
}
