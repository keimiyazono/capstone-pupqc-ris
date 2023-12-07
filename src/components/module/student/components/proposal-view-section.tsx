'use client';

import { ResearchView } from '@/components/global/research-container';

export interface ProposalViewSectionProps {
  id: string;
}

export function ProposalViewSection({ id }: ProposalViewSectionProps) {
  return (
    <section className="py-10 space-y-10 h-fit">
      <ResearchView id={id} showUpdateSheet />
    </section>
  );
}
