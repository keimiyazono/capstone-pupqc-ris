'use client';

import { Header } from './header';

export function DashboardContent({ children }: React.PropsWithChildren) {
  return (
    <div className="xl:pl-64 transition-all ease-out duration-500 h-screen flex flex-col">
      <Header />
      <main className="px-2 xl:px-6">{children}</main>
    </div>
  );
}
