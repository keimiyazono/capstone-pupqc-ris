'use client';

import { Unauthorized } from '@/components/global';
import { FullManuscriptView } from '@/components/global/full-manuscript-container';
import { useFacultyWorkflowContext } from './context/faculty-workflow';
import { CopyrightView } from '@/components/global/copyright-container';

export interface CopyrightViewSectionProps {
  id: string;
}

export function CopyrightViewSection({
  id,
}: CopyrightViewSectionProps) {
  const { selectedProcess } = useFacultyWorkflowContext();
  return (
    <section className="py-10 space-y-10 h-fit">
      {selectedProcess?.process?.[0]?.has_submitted_copyright ? (
        <CopyrightView
          id={id}
          showApproveDialog
          showRejectDialog
          showBackButton
        />
      ) : (
        <Unauthorized />
      )}
    </section>
  );
}
