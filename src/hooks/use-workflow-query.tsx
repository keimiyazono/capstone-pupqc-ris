import { risApi } from '@/lib/api';
import { SUBMITTED_WORKFLOWS_KEY } from '@/lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useCreateStudentWorkflow() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ type, ...payload }: CreateStudentWorkflowsRequest) => {
      return risApi.post('/workflow/create', payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },

    async onSuccess(_, { type }) {
      await queryClient.invalidateQueries({ queryKey: [`/workflow/${type}`] });
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

export function useUpdateStudentWorkflows() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workflow_id, payload }: UpdateStudentWorkflowsRequest) => {
      return risApi.post(`/workflow/update/${workflow_id}`, payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },

    async onSuccess(_, { type }) {
      await queryClient.invalidateQueries({
        queryKey: [`/workflow/${type}`],
      });
    },
  });
}

export function useGetStudentWorkflows(type: string) {
  const { data: session, status } = useSession();

  const PATH_KEY = `/workflow/${type}`;

  return useQuery<StudentWorkflowProcess[]>({
    queryKey: [PATH_KEY],
    queryFn: async () => {
      const res = await risApi.get<StudentWorkflowProcess[]>(PATH_KEY, {
        headers: {
          Authorization: `Bearer ${session?.user?.authToken}`,
        },
      });
      return res.data;
    },
    enabled: status === 'authenticated',
  });
}

export function useDeleteStudentWorkflow() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workflow_id }: { workflow_id: string; type: string }) => {
      return risApi.delete(`/workflow/delete-workflow/${workflow_id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },

    async onSuccess(_, { type }) {
      await queryClient.invalidateQueries({
        queryKey: [`/workflow/${type}`],
      });
    },
  });
}
