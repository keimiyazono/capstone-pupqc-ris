import { risApi } from '@/lib/api';
import { ETHICS_KEY } from '@/lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useUploadEthics() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UploadEthicsPayload) => {
      return risApi.post(`${ETHICS_KEY}/upload`, payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [ETHICS_KEY] });
    },
  });
}

export function useDeleteEthics() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ethics_id }: { ethics_id: string }) => {
      return risApi.delete(`${ETHICS_KEY}/delete_ethics/${ethics_id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [ETHICS_KEY] });
    },
  });
}

export function useGetUserEthics() {
  const { data: session, status } = useSession();

  return useQuery<Ethics[]>({
    queryKey: [ETHICS_KEY],
    queryFn: async () => {
      const res = await risApi.get<Ethics[]>(ETHICS_KEY + '/user', {
        headers: {
          Authorization: `Bearer ${session?.user?.authToken}`,
        },
      });
      return res.data;
    },
    enabled: status === 'authenticated',
    refetchOnMount: true,
  });
}
