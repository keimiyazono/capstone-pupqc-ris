'use client';

import { DashboardContent, Sidebar } from '@/components/global';
import { ADMIN_NAVIGATION } from '@/lib/constants';
import { useSidebarStore } from '@/store/sidebar-store';
import { SidebarData } from '@/types/navigation';
import { useEffect, useMemo } from 'react';

export function AdminLayout({ children }: React.PropsWithChildren) {
  const { selectSidebar } = useSidebarStore();

  const sidebars = useMemo<SidebarData[]>(() => {
    return [
      {
        key: 'admin',
        label: 'Admin',
        navigations: ADMIN_NAVIGATION,
      },
      {
        key: 'Research',
        label: 'Research',
        navigations: ADMIN_NAVIGATION,
      },
      {
        key: 'Feasibility Study',
        label: 'Feasibility Study',
        navigations: ADMIN_NAVIGATION,
      },
      {
        key: 'Capstone',
        label: 'Capstone',
        navigations: ADMIN_NAVIGATION,
      },
      {
        key: 'Business Plan',
        label: 'Business Plan',
        navigations: ADMIN_NAVIGATION,
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
      <DashboardContent role="Admin">{children}</DashboardContent>
    </div>
  );
}
