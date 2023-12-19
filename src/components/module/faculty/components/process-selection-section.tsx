'use client';

import { Unauthorized } from '@/components/global';
import { useGetFacultyProfile } from '@/hooks/use-user-query';
import { useGetUserSubmittedWorkflows } from '@/hooks/use-workflow-query';
import { useEffect, useId, useMemo, useState } from 'react';
import { WorkflowCard } from './card/workflow-card';

const AUTHORIZE_ROLES = ['research professor'];


// function reduceCB(cache, value) {
//   const key = value.course.toLowerCase();

//   if (cache.has(key)) {
//     const previous = cache.get(key);

//     cache.set(key, [...previous, value]);
//   } else {
//     cache.set(key, [value]);
//   }

//   return cache;
// }

// const grouping = Object.fromEntries(items.reduce(reduceCB, new Map()));

export function ProcessSelectionSection() {
  const cardId = useId();

  const [workflows, setWorkflows] = useState<WorkflowGroup[]>([]);

  const { data: facultyProfile, isLoading: facultyProfileIsLoading } =
    useGetFacultyProfile();

  const profile = facultyProfile?.result;

  const isAuthorized = useMemo<boolean>(() => {
    return Boolean(
      profile && profile.roles.some((role) => AUTHORIZE_ROLES.includes(role))
    );
  }, [profile]);

  const { data: userSubmittedWorkflows } = useGetUserSubmittedWorkflows();

  useEffect(() => {
    if (typeof userSubmittedWorkflows !== 'undefined') {
      const grouping = Object.values(
        Object.fromEntries(
          userSubmittedWorkflows.reduce((cache, data) => {
            const type = data.type;

            if (cache.has(type)) {
              const previous = cache.get(type);

              const updatedData = {
                type,
                workflows: [...(previous?.workflows ?? []), data],
              };

              cache.set(type, updatedData);
            } else {
              const updatedData = {
                type,
                workflows: [data],
              };

              cache.set(type, updatedData);
            }

            return cache;
          }, new Map<string, WorkflowGroup>())
        )
      );

      setWorkflows(grouping);
    }
  }, [userSubmittedWorkflows]);

  console.log({ userSubmittedWorkflows });

  return (
    <>
      {profile && !facultyProfileIsLoading && (
        <section>
          {isAuthorized ? (
            <div className="space-y-10">
              {workflows.map((data, idx) => (
                <WorkflowCard key={cardId + idx} data={data} />
              ))}
            </div>
          ) : (
            <Unauthorized />
          )}
        </section>
      )}
    </>
  );
}
