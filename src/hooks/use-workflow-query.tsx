import { risApi } from '@/lib/api';
import {
  SUBMITTED_WORKFLOWS_KEY,
  WORKFLOW_LIST_NAME_PROCESS_STUDENT,
} from '@/lib/constants';
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

export function useGetWorkflowListNameProcessStudent() {
  const { data: session, status } = useSession();

  return useQuery<Record<string, string>>({
    queryKey: [WORKFLOW_LIST_NAME_PROCESS_STUDENT],
    queryFn: async () => {
      const res = await risApi.get<Record<string, string>>(
        WORKFLOW_LIST_NAME_PROCESS_STUDENT,
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

export function useDeleteStudentWorkflowSteps() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workflow_step_ids,
    }: {
      workflow_step_ids: string[];
      type: string;
    }) => {
      return Promise.all(
        workflow_step_ids.map((workflow_step_id) =>
          risApi.delete(`/workflow/delete-workflows-step/${workflow_step_id}`, {
            headers: {
              Authorization: `Bearer ${session?.user.authToken}`,
            },
          })
        )
      );
    },

    async onSuccess(_, { type }) {
      await queryClient.invalidateQueries({
        queryKey: [`/workflow/${type}`],
      });
    },
  });
}

export function useUpdateStudentWorkflowsProcess() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateStudentWorkflowProcessRequest) => {
      return risApi.put('/workflow/update_by_type', payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },

    async onSuccess(_, { research_type }) {
      await queryClient.invalidateQueries({
        queryKey: [`/workflow/${research_type}`],
      });
    },
  });
}
