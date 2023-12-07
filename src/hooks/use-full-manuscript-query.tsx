import { risApi } from '@/lib/api';
import { FULL_MANUSCRIPT_KEY } from '@/lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useUploadFullManusript() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UploadFullManuscriptPayload) => {
      return risApi.post(`${FULL_MANUSCRIPT_KEY}/upload`, payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [FULL_MANUSCRIPT_KEY] });
    },
  });
}

export function useDeleteFullManuscript() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ manuscript_id }: { manuscript_id: string }) => {
      return risApi.delete(
        `${FULL_MANUSCRIPT_KEY}/delete_manuscript/${manuscript_id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.authToken}`,
          },
        }
      );
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [FULL_MANUSCRIPT_KEY] });
    },
  });
}

export function useGetUserFullManuscript() {
  const { data: session, status } = useSession();

  return useQuery<FullManuscript[]>({
    queryKey: [FULL_MANUSCRIPT_KEY],
    queryFn: async () => {
      const res = await risApi.get<FullManuscript[]>(
        FULL_MANUSCRIPT_KEY + '/user',
        {
          headers: {
            Authorization: `Bearer ${session?.user?.authToken}`,
          },
        }
      );
      return res.data;
    },
    enabled: status === 'authenticated',
    refetchOnMount: true,
  });
}
