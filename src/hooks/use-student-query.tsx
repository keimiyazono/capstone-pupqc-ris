import { risApi } from '@/lib/api';
import { FACULTY_LIST_KEY, STUDENT_LIST_KEY, USERS_KEY } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useGetStudentProfile() {
  const { data: session, status } = useSession();

  return useQuery<DefaultApiResponse<Profile>>({
    queryKey: [USERS_KEY, '/profile/student'],
    queryFn: async () => {
      const res = await risApi.get<DefaultApiResponse<Profile>>(
        USERS_KEY + '/profile/student',
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

export function useGetStudents() {
  const { data: session, status } = useSession();

  return useQuery<DefaultApiResponse<Student[]>>({
    queryKey: [STUDENT_LIST_KEY],
    queryFn: async () => {
      const res = await risApi.get<DefaultApiResponse<Student[]>>(
        STUDENT_LIST_KEY,
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


