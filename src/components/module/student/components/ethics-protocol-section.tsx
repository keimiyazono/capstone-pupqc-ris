'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useGetUserEthics } from '@/hooks/use-ethics-query';
import { useGetUserResearchPapersData } from '@/hooks/use-research-query';
import { useEffect, useMemo } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { columns } from './ethics-protocol-section-table/columns';
import { DataTable } from './ethics-protocol-section-table/data-table';
import UploadEthicProtocolSheet from './upload-ethics-protocol-sheet';

export function EthicsProtocolSection() {
  const { data: ethics, error } = useGetUserEthics();

  const data = useMemo(() => {
    if (!ethics || error) return [];

    return ethics.map(({ research_paper_id, id }) => {
      return {
        research_paper_id,
        data_id: id ?? '',
      };
    });
  }, [ethics, error]);

  const {
    data: researches,
    isLoading,
    isRefetching,
    refetch: refetchUserResearchPapersData,
  } = useGetUserResearchPapersData({
    data,
    key: 'ETHICS',
  });

  useEffect(() => {
    refetchUserResearchPapersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <section>
        <div className="border bg-muted rounded shadow flex justify-center items-center h-96">
          <UploadEthicProtocolSheet />
        </div>

        {/* <Card>
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
        )} */}
      </section>
    </>
  );
}
