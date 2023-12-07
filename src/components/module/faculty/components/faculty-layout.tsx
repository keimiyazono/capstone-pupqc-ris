'use client';

import { DashboardContent, Sidebar } from '@/components/global';
import { FACULTY_NAVIGATION } from '@/lib/constants';

export function FacultyLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Sidebar nav={FACULTY_NAVIGATION} />
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
}
