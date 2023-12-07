import { risApi } from '@/lib/api';
import { FACULTY_ADVISER_KEY, FACULTY_LIST_KEY } from '@/lib/constants';
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
