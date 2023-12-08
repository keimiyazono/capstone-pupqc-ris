import { risApi } from '@/lib/api';
import {
  ADVISER_KEY,
  FACULTY_ADVISER_KEY,
  FACULTY_LIST_KEY,
} from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
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
  });
}
