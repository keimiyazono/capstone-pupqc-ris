'use client';

import { Unauthorized } from '@/components/global';
import { useGetAdviserWithAssignedList } from '@/hooks/use-faculty-query';
import { useGetFacultyProfile } from '@/hooks/use-user-query';
import { useId, useMemo } from 'react';
import { UserAndResponsibilityCard } from './card/user-and-responsibility-card';

const AUTHORIZE_ROLES = ['research professor'];

const DEFAULT: [string, AdviserDataGroup][] = [
  ['Research', { research_type_name: 'Research', list: [] }],
  ['Capstone', { research_type_name: 'Capstone', list: [] }],
  ['Feasibility Study', { research_type_name: 'Feasibility Study', list: [] }],
  ['Business Plan', { research_type_name: 'Business Plan', list: [] }],
];

export function UserAndResponsibilitySection() {
  const cardId = useId();

  const { data: facultyProfile, isLoading: facultyProfileIsLoading } =
    useGetFacultyProfile();

  const { data: adviserAssignedList } = useGetAdviserWithAssignedList();

  const adviserAssignedListGroup = useMemo<AdviserDataGroup[]>(() => {
    const list = adviserAssignedList ?? [];

    const groupingsEntries = list.reduce((cache, data) => {
      const assignments = data?.assignments ?? [];

      for (const { research_type_name } of assignments) {
        const hasResearchType = cache.has(research_type_name);
        const previousData = cache.get(research_type_name);

        if (hasResearchType && previousData) {
          cache.set(research_type_name, {
            research_type_name,
            list: [...previousData.list, data],
          });
        } else {
          cache.set(research_type_name, { research_type_name, list: [data] });
        }
      }

      return cache;
    }, new Map<string, AdviserDataGroup>(DEFAULT));

    return Object.values(Object.fromEntries(groupingsEntries));
  }, [adviserAssignedList]);

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
            <div className="space-y-10">
              {adviserAssignedListGroup.map(
                ({ research_type_name, list }, idx) => (
                  <UserAndResponsibilityCard
                    key={cardId + idx}
                    research_type_name={research_type_name}
                    advisers={list}
                  />
                )
              )}
            </div>
          ) : (
            <Unauthorized />
          )}
        </section>
      )}
    </>
  );
}
