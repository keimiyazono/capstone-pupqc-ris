'use client';

import { DashboardContent, Sidebar } from '@/components/global';
import { STUDENT_NAVIGATION1 } from '@/lib/constants';

export function StudentLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Sidebar nav={STUDENT_NAVIGATION1} />
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
}
