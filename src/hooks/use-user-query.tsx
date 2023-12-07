import { risApi } from '@/lib/api';
import {
  ALL_USER_KEY,
  COURSE_LIST_KEY,
  COURSE_WITH_YEAR_LIST_KEY,
} from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useGetAllUser() {
  const { data: session, status } = useSession();

  return useQuery<DefaultApiResponse<Faculty[]>>({
    queryKey: [ALL_USER_KEY],
    queryFn: async () => {
      const res = await risApi.get<DefaultApiResponse<Faculty[]>>(
        ALL_USER_KEY,
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

export function useGetCourseList() {
  const { data: session, status } = useSession();

  return useQuery<Record<string, string>>({
    queryKey: [COURSE_LIST_KEY],
    queryFn: async () => {
      const res = await risApi.get<Record<string, string>>(COURSE_LIST_KEY, {
        headers: {
          Authorization: `Bearer ${session?.user?.authToken}`,
        },
      });
      return res.data;
    },
    enabled: status === 'authenticated',
  });
}

export function useGetCourseWithYearList() {
  const { data: session, status } = useSession();

  return useQuery<DefaultApiResponse<CourseWithYearList[]>>({
    queryKey: [COURSE_WITH_YEAR_LIST_KEY],
    queryFn: async () => {
      const res = await risApi.get<DefaultApiResponse<CourseWithYearList[]>>(
        COURSE_WITH_YEAR_LIST_KEY,
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
