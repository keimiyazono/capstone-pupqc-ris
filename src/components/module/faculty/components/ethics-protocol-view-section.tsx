'use client';

import { Unauthorized } from '@/components/global';
import { EthicsProtocolView } from '@/components/global/ethics-protocol-container';
import { useFacultyWorkflowContext } from './context/faculty-workflow';

export interface EthicsProtocolViewSectionProps {
  id: string;
}

export function EthicsProtocolViewSection({
  id,
}: EthicsProtocolViewSectionProps) {
  const { selectedProcess } = useFacultyWorkflowContext();
  return (
    <section className="py-10 space-y-10 h-fit">
      {selectedProcess?.process?.[0]?.has_submitted_ethics_protocol ? (
        <EthicsProtocolView
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
