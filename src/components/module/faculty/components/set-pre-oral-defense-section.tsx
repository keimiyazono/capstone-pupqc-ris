'use client';

import { Unauthorized } from '@/components/global';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { useGetFacultyDefense } from '../hooks/use-faculty-defense-query';
import { useFacultyWorkflowContext } from './context/faculty-workflow';
import { columns } from './set-pre-oral-defense-table/columns';
import { DataTable } from './set-pre-oral-defense-table/data-table';

export function SetPreOralDefenseSection() {
  const { researchType, selectedProcess } = useFacultyWorkflowContext();

  const {
    data: facultyDefense = [],
    isLoading,
    refetch,
  } = useGetFacultyDefense({
    course: selectedProcess?.course,
    section: selectedProcess?.section,
    research_type: researchType,
    defense_type: 'pre-oral',
  });

  useEffect(() => {
    if (researchType && selectedProcess) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [researchType, selectedProcess]);

  return (
    <section>
      {selectedProcess?.process?.[0]?.has_pre_oral_defense_date ? (
        <Card>
          <CardContent className="py-5 space-y-10">
            {isLoading && (
              <div className="w-full h-40 relative flex items-center justify-center">
                <div className="flex items-center gap-2 font-semibold">
                  The table is currently loading. Please wait for a moment.
                  <span className="h-fit w-fit text-2xl animate-spin">
                    <BiLoaderAlt />
                  </span>
                </div>
              </div>
            )}
            {!isLoading && (
              <DataTable data={facultyDefense} columns={columns} />
            )}
          </CardContent>
        </Card>
      ) : (
        <Unauthorized />
      )}
    </section>
  );
}
