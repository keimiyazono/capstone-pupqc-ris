import { risApi } from '@/lib/api';
import {
  STUDENT_LIST_KEY,
  STUDENT_MY_WORKFLOW,
  USERS_KEY,
} from '@/lib/constants';
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

export interface MyWorflow {
  id: string;
  type: string;
  class_id: string;
  user_id: string;
  course: string;
  section: string;
  steps: MyWorflowStep[];
}

export interface MyWorflowStep {
  id: string;
  name: string;
  description: string;
}

export function useGetStudentMyWorkflow() {
  const { data: session, status } = useSession();

  return useQuery<MyWorflow[]>({
    queryKey: [STUDENT_MY_WORKFLOW],
    queryFn: async () => {
      const res = await risApi.get<MyWorflow[]>(STUDENT_MY_WORKFLOW, {
        headers: {
          Authorization: `Bearer ${session?.user?.authToken}`,
        },
      });
      return res.data;
    },
    enabled: status === 'authenticated',
  });
}

export interface MyAdviser {
  id: string;
  name: string;
  research_type_name: string;
  class_id: string;
}

export function useGetMyAdviserList(type: string) {
  const { data: session, status } = useSession();

  const PATH_KEY = `/student/my-adviser-list/${type}`;

  return useQuery<MyAdviser[]>({
    queryKey: [PATH_KEY],
    queryFn: async () => {
      const res = await risApi.get<MyAdviser[]>(PATH_KEY, {
        headers: {
          Authorization: `Bearer ${session?.user?.authToken}`,
        },
      });
      return res.data;
    },
    enabled: status === 'authenticated' && Boolean(type),
  });
}
