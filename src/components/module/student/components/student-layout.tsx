'use client';

import { DashboardContent, Sidebar } from '@/components/global';
import { STUDENT_NAVIGATION1 } from '@/lib/constants';
import { useSidebarStore } from '@/store/sidebar-store';
import { SidebarData } from '@/types/navigation';
import { useEffect, useMemo } from 'react';

export function StudentLayout({ children }: React.PropsWithChildren) {
  const { selectSidebar } = useSidebarStore();

  const sidebars = useMemo<SidebarData[]>(() => {
    return [
      {
        label: 'Research',
        navigations: STUDENT_NAVIGATION1,
      },
    ];
  }, []);

  useEffect(() => {
    if (sidebars.length > 0) {
      selectSidebar(sidebars[0]);
    }
  }, [sidebars, selectSidebar]);

  return (
    <div>
      <Sidebar sidebars={sidebars} />
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
}
