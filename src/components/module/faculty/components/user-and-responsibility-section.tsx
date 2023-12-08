'use client';

import { Unauthorized } from '@/components/global';
import { Button } from '@/components/ui/button';
import { useGetFacultyProfile } from '@/hooks/use-user-query';
import { PlusIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';
import { UserAndResponsibilityCard } from './card/user-and-responsibility-card';

const AUTHORIZE_ROLES = ['research professor'];

export function UserAndResponsibilitySection() {
  const { data: facultyProfile, isLoading: facultyProfileIsLoading } =
    useGetFacultyProfile();

  const [length, setLength] = useState<number>(1);

  const profile = facultyProfile?.result;

  const isAuthorized = useMemo<boolean>(() => {
    return Boolean(
      profile && profile.roles.some((role) => AUTHORIZE_ROLES.includes(role))
    );
  }, [profile]);

  return (
    <>
      {profile && !facultyProfileIsLoading && (
        <section>
          {isAuthorized ? (
            <div className="space-y-6">
              <div className="space-y-3 divide-y">
                {Array.from({ length }).map((_, idx) => (
                  <UserAndResponsibilityCard key={Date.now() + idx} />
                ))}
              </div>

              <Button
                className="gap-3 text-lg font-medium w-full"
                onClick={() => setLength((prev) => prev + 1)}
              >
                <PlusIcon /> <span>Add more</span>
              </Button>
            </div>
          ) : (
            <Unauthorized />
          )}
        </section>
      )}
    </>
  );
}
