'use client';

import { DashboardContent, Sidebar } from '@/components/global';
import { ADMIN_NAVIGATION } from '@/lib/constants';

export function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Sidebar nav={ADMIN_NAVIGATION} />
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
}
