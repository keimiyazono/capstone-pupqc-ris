import { risApi } from '@/lib/api';
import {
  ADMIN_FACULTY_WITH_ROLES_KEY,
  ASSIGN_PROF_TO_SECTION_KEY,
} from '@/lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useGetFacultyWithRoles() {
  const { data: session, status } = useSession();

  return useQuery<DefaultApiResponse<AdminFacultyWithRoles[]>>({
    queryKey: [ADMIN_FACULTY_WITH_ROLES_KEY],
    queryFn: async () => {
      const res = await risApi.get<DefaultApiResponse<AdminFacultyWithRoles[]>>(
        ADMIN_FACULTY_WITH_ROLES_KEY,
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

export function useAdminAssignRoles() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user_id, roles }: { user_id: string; roles: string[] }) => {
      return risApi.post(`/admin/assign-roles/${user_id}`, roles, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_FACULTY_WITH_ROLES_KEY],
      });
    },
  });
}

export function useAdminAssignProfToSection() {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: ({
      user_id,
      sections,
    }: {
      user_id: string;
      sections: Array<{
        section: string;
        course: string;
      }>;
    }) => {
      return risApi.post(`/admin/assign-prof-to-section/${user_id}`, sections, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },
  });
}

export function useAdminDeleteAssignment() {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: ({
      user_id,
      sections,
    }: {
      user_id: string;
      sections: Array<{
        sections: string;
        course: string;
      }>;
    }) => {
      return risApi.delete(`/admin/delete-assignment/${user_id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
        data: sections,
      });
    },
  });
}

export function useGetAssignProfToSection() {
  const { data: session, status } = useSession();

  return useQuery<DefaultApiResponse<AssignProfToSection[]>>({
    queryKey: [ASSIGN_PROF_TO_SECTION_KEY],
    queryFn: async () => {
      const res = await risApi.get<DefaultApiResponse<AssignProfToSection[]>>(
        ASSIGN_PROF_TO_SECTION_KEY,
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
