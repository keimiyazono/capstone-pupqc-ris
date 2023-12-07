'use client';

import UpdateResearchSheet from '@/components/module/student/components/update-research-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { risApi } from '@/lib/api';
import { RESEARCH_KEY } from '@/lib/constants';
import { cn, isURL } from '@/lib/utils';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoChevronBackSharp } from 'react-icons/io5';
import { ApproveDialog } from './approve-dialog';
import { CommentSection } from './comment-section';
import { RejectDialog } from './reject-dialog';

export interface ResearchViewProps {
  id: string;
  showUpdateSheet?: boolean;
  showApproveDialog?: boolean;
  showRejectDialog?: boolean;
}

export function ResearchView({
  id,
  showUpdateSheet = false,
  showApproveDialog = false,
  showRejectDialog = false,
}: ResearchViewProps) {
  const router = useRouter();
  const researchId = useId();

  const { data: session, status } = useSession();

  const {
    data: researchWithAuthors,
    isFetching,
    isLoading,
    isRefetching,
  } = useQuery<ResearchWithAuthors>({
    queryKey: [RESEARCH_KEY, id],
    queryFn: async () => {
      const res = await risApi.get<ResearchWithAuthors>(
        `${RESEARCH_KEY}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.authToken}`,
          },
        }
      );
      return res.data;
    },
    enabled: status === 'authenticated',
  });

  const research = researchWithAuthors?.research_paper;
  const authors = researchWithAuthors?.authors;

  const docs = [
    {
      uri: research?.file_path ?? '',
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() => router.back()}
        >
          <IoChevronBackSharp />
          <span>Back</span>
        </Button>

        {research && (
          <div className="flex items-center gap-2">
            {showUpdateSheet && <UpdateResearchSheet research={research} />}

            {showApproveDialog && (
              <ApproveDialog
                id={id}
                disabled={research.status === 'Approved'}
              />
            )}
            {showRejectDialog && (
              <RejectDialog id={id} disabled={research.status === 'Rejected'} />
            )}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="h-12 w-full" />

          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-28" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-40" />
          </div>

          <Skeleton className="h-96 w-full" />
        </div>
      )}

      {research && (
        <article className="prose max-w-none">
          <div className="text-xs pb-5 text-muted-foreground uppercase">
            {research.submitted_date}
          </div>

          <h1>{research.title}</h1>

          <div className="flex items-center gap-2">
            <Badge>{research.research_type}</Badge>
            <Badge
              className={cn(
                research.status === 'Pending' &&
                  'bg-yellow-500 hover:bg-yellow-500/80',
                research.status === 'Approved' &&
                  'bg-green-500 hover:bg-green-500/80',
                research.status === 'Rejected' &&
                  'bg-red-500 hover:bg-red-500/80'
              )}
            >
              {research.status}
            </Badge>
          </div>
          {authors && (
            <div className="mt-5 flex items-center gap-3">
              {authors.map(({ user_id, student_name }) => (
                <div
                  key={user_id}
                  className="flex items-center gap-2 capitalize"
                >
                  <BsFillPersonFill /> <span>{student_name}</span>
                </div>
              ))}
            </div>
          )}
        </article>
      )}

      {research?.file_path && isURL(research.file_path) && (
        <div className="mt-10">
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            theme={{
              primary: '#f4f4f4',
              textPrimary: '#000000',
            }}
          />
        </div>
      )}

      {research && <CommentSection id={id} />}
    </>
  );
}
