'use client';

import { Unauthorized } from '@/components/global';
import { useGetFacultyProfile } from '@/hooks/use-user-query';
import { useSidebarStore } from '@/store/sidebar-store';
import { useMemo } from 'react';

const AUTHORIZE_ROLES = ['research professor'];

export function UserAndResponsibilitySection() {
  const { data: facultyProfile } = useGetFacultyProfile();

  const { currentSidebar } = useSidebarStore();

  const profile = facultyProfile?.result;

  const isAuthorized = useMemo<boolean>(() => {
    const isProfessor = Boolean(
      profile && profile.roles.some((role) => AUTHORIZE_ROLES.includes(role))
    );

    const currentSidebarRoleIsProf =
      currentSidebar?.label?.toLowerCase() === 'professor';

    return isProfessor && currentSidebarRoleIsProf;
  }, [profile, currentSidebar]);

  return (
    <>
      {profile && (
        <section>
          {isAuthorized ? <div>Authorized</div> : <Unauthorized />}
        </section>
      )}
    </>
  );
}
