'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useGetUserUserCopyrightDocuments } from '@/hooks/use-copyright-document';
import { useGetUserResearchPapersData } from '@/hooks/use-research-query';
import { useEffect, useMemo } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { columns } from './copyright-documents-section-table/columns';
import { DataTable } from './copyright-documents-section-table/data-table';

export function CopyrightDocumentsSection() {
  const { data: copyrightDocuments, error } =
    useGetUserUserCopyrightDocuments();

  const data = useMemo(() => {
    if (!copyrightDocuments || error) return [];

    return copyrightDocuments.map(({ research_paper_id, id }) => {
      return {
        research_paper_id,
        data_id: id ?? '',
      };
    });
  }, [copyrightDocuments, error]);

  const {
    data: researches,
    isLoading,
    isRefetching,
    refetch: refetchUserResearchPapersData,
  } = useGetUserResearchPapersData({
    data,
    key: 'COPYRIGHT_DOCUMENTS',
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
