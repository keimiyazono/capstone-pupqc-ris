'use client';

import { ProfileGear } from './profile-gear';

export function Header() {
  return (
    <div className="flex items-center justify-end bg-card px-2 xl:px-6 transition-transform border-b z-20">
      <ProfileGear />
    </div>
  );
}
