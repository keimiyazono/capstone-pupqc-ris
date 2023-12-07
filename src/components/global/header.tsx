'use client';

import { useSidebarStore } from '@/store/sidebar-store';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';
import { ProfileGear } from './profile-gear';

export function Header() {
  // const { show, toggleHandler } = useSidebarStore();

  return (
    <div className="flex items-center justify-end bg-card px-2 xl:px-6 transition-transform border-b z-20">
      {/* <Button onClick={toggleHandler}>
        <HamburgerMenuIcon />
      </Button> */}

      <ProfileGear />
    </div>
  );
}
