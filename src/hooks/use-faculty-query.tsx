import { risApi } from '@/lib/api';
import {
  ADVISER_KEY,
  ADVISER_WITH_ASSIGNED_KEY,
  FACULTY_ADVISER_KEY,
  FACULTY_LIST_KEY,
} from '@/lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useGetFacultyAdviser() {
  const { data: session, status } = useSession();

  return useQuery<Research[]>({
    queryKey: [FACULTY_ADVISER_KEY],
    queryFn: async () => {
      const res = await risApi.get<Research[]>(FACULTY_ADVISER_KEY, {
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

export function useGetFaculties() {
  const { data: session, status } = useSession();

  return useQuery<DefaultApiResponse<Faculty[]>>({
    queryKey: [FACULTY_LIST_KEY],
    queryFn: async () => {
      const res = await risApi.get<DefaultApiResponse<Faculty[]>>(
        FACULTY_LIST_KEY,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.authToken}`,
          },
        }
      );
      return res.data;
    },
    enabled: status === 'authenticated',
    refetchOnMount: false,
  });
}

export function useGetAdviserAssigned(user_id: string) {
  const { data: session, status } = useSession();

  return useQuery<AdviserData>({
    queryKey: [ADVISER_KEY, user_id],
    queryFn: async () => {
      const res = await risApi.get<AdviserData>(
        `${ADVISER_KEY}/${user_id}/assigned`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.authToken}`,
          },
        }
      );
      return res.data;
    },
    enabled: status === 'authenticated',
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useGetAdviserWithAssignedList() {
  const { data: session, status } = useSession();

  return useQuery<AdviserData[]>({
    queryKey: [ADVISER_WITH_ASSIGNED_KEY],
    queryFn: async () => {
      const res = await risApi.get<AdviserData[]>(ADVISER_WITH_ASSIGNED_KEY, {
        headers: {
          Authorization: `Bearer ${session?.user?.authToken}`,
        },
      });
      return res.data;
    },
    enabled: status === 'authenticated',
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useAssignAdviser() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostAssignAdviserPayload) => {
      return risApi.post(
        '/researchprof/assign-adviser-type-section/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${session?.user.authToken}`,
          },
        }
      );
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [ADVISER_WITH_ASSIGNED_KEY],
      });
    },
  });
}

export function useUpdateAssignAdviser() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user_id, ...payload }: PutAssignAdviserPayload) => {
      return risApi.put(
        `/researchprof/assign-adviser-update/${user_id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${session?.user.authToken}`,
          },
        }
      );
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [ADVISER_WITH_ASSIGNED_KEY],
      });
    },
  });
}
