'use client';

import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';
import { Header } from './header';

export function DashboardContent({ children }: React.PropsWithChildren) {
  const { show } = useSidebarStore();

  return (
    <div
      className={cn(
        'xl:pl-64 transition-all ease-out duration-500 h-screen flex flex-col',
        !show && 'xl:pl-20'
      )}
    >
      <Header />
      {/* <ScrollArea className="flex flex-col flex-1 overflow-y-auto px-2 xl:px-6"> */}
      <main className="px-2 xl:px-6">{children}</main>
      {/* </ScrollArea> */}
    </div>
  );
}
