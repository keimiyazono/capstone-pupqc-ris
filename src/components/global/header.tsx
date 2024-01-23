'use client';

import { ProfileGear } from './profile-gear';

export interface HeaderProps {
  role: string;
}

export function Header({ role }: HeaderProps) {
  return (
    <div className="flex items-center justify-end bg-card px-2 xl:px-6 transition-transform border-b z-20">
      <ProfileGear role={role} />
    </div>
  );
}
