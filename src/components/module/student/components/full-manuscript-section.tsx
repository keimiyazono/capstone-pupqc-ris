'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useGetUserFullManuscript } from '@/hooks/use-full-manuscript-query';
import { useGetUserResearchPapersData } from '@/hooks/use-research-query';
import { useEffect, useMemo } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { columns } from './full-manuscript-section-table/columns';
import { DataTable } from './full-manuscript-section-table/data-table';

export function FullManuscriptSection() {
  const { data: fullManuscripts, error } = useGetUserFullManuscript();

  const data = useMemo(() => {
    if (!fullManuscripts || error) return [];

    return fullManuscripts.map(({ research_paper_id, id }) => {
      return {
        research_paper_id,
        data_id: id ?? '',
      };
    });
  }, [fullManuscripts, error]);

  const {
    data: researches,
    isLoading,
    isRefetching,
    refetch: refetchUserResearchPapersData,
  } = useGetUserResearchPapersData({
    data,
    key: 'FULL_MANUSCRIPT',
  });

  useEffect(() => {
    refetchUserResearchPapersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <section>
        <Card>
          <CardContent className="py-5 space-y-10">
            <DataTable data={researches} columns={columns} />
          </CardContent>
        </Card>

        {(isLoading || isRefetching) && (
          <div className="w-full h-40 relative flex items-center justify-center">
            <div className="flex items-center gap-2 font-semibold">
              The table is currently loading. Please wait for a moment.
              <span className="h-fit w-fit text-2xl animate-spin">
                <BiLoaderAlt />
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
