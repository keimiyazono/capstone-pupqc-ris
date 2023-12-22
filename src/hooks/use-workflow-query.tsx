import { risApi } from '@/lib/api';
import { SUBMITTED_WORKFLOWS_KEY } from '@/lib/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useCreateWorkflow() {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (payload: CreateWorlflowPayload) => {
      return risApi.post('/researchprof/workflows/', payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },
  });
}

export function useGetSubmittedWorkflows() {
  const { data: session, status } = useSession();

  return useQuery<Workflow[]>({
    queryKey: [SUBMITTED_WORKFLOWS_KEY],
    queryFn: async () => {
      const res = await risApi.get<Workflow[]>(SUBMITTED_WORKFLOWS_KEY, {
        headers: {
          Authorization: `Bearer ${session?.user?.authToken}`,
        },
      });
      return res.data;
    },
    enabled: status === 'authenticated',
  });
}
