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

const DEFENSE_LIST = ['Pre-Oral Defense', 'Final Defense'];

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

  console.log({ flowInfoStatus });

  const researchType = flowInfoStatus[0]?.type ?? '';

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
          status: DEFENSE_LIST.includes(name)
            ? Boolean(info['whole-info'][0])
              ? 'Approved'
              : 'Pending'
            : (info['whole-info'][0]?.status as StepStatus),
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

              <div className="flex justify-end pt-6">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-40 text-lg"
                  onClick={() => {
                    setCurrentStep((prev) => prev + 1);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step.name === 'Ethics' && (
            <EthicsProtocolSection
              step={step}
              researchPaperId={id}
              updateStepCallback={() => {
                setCurrentStep((prev) => prev + 1);
              }}
            />
          )}

          {step.name === 'Full Manuscript' && (
            <FullManuscriptSection
              step={step}
              researchPaperId={id}
              updateStepCallback={() => {
                setCurrentStep((prev) => prev + 1);
              }}
            />
          )}

          {step.name === 'Copyright' && <CopyrightDocumentsSection />}

          {step.name === 'Pre-Oral Defense' && (
            <DefenseSection
              label="Pre-Oral Defense"
              step={step}
              researchPaperId={id}
              updateStepCallback={() => {
                setCurrentStep((prev) => prev + 1);
              }}
            />
          )}

          {step.name === 'Final Defense' && (
            <DefenseSection
              label="Final Defense"
              step={step}
              researchPaperId={id}
              updateStepCallback={() => {
                setCurrentStep((prev) => prev + 1);
              }}
            />
          )}
        </>
      )}
    </section>
  );
}
