import { risApi } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export interface FacultyMyResearchPaper {
  created_at: string;
  modified_at: string;
  id: string;
  title: string;
  content: string;
  abstract: string;
  file_path: string;
  date_publish: string;
  category: string;
  publisher: string;
  user_id: string;
}

export const FACULTY_MY_RESEARCH_PAPERS_KEY = '/faculty/my-research-papers';

export function useGetFacultyMyResearchPapers() {
  const { data: session, status } = useSession();

  return useQuery<FacultyMyResearchPaper[]>({
    queryKey: [FACULTY_MY_RESEARCH_PAPERS_KEY],
    queryFn: async () => {
      const res = await risApi.get<FacultyMyResearchPaper[]>(
        FACULTY_MY_RESEARCH_PAPERS_KEY,
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

export interface FacultyUploadCopyrightResearch {
  title: string;
  content: string;
  abstract: string;
  file_path: string;
  category: string;
  publisher: string;
  date_publish: string;
}

export function useFacultyUploadCopyrightResearch() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FacultyUploadCopyrightResearch) => {
      return risApi.post('/faculty/upload-my-papers', payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [FACULTY_MY_RESEARCH_PAPERS_KEY],
      });
    },
  });
}

export const FACULTY_COPYRIGHT_CATEGORY_LIST_KEY = '/faculty/category_list';

export interface FacultyCopyrightCategoryList {
  categories: string[];
}

export function useFacultyCopyrightCategoryList() {
  const { data: session, status } = useSession();

  return useQuery<FacultyCopyrightCategoryList>({
    queryKey: [FACULTY_COPYRIGHT_CATEGORY_LIST_KEY],
    queryFn: async () => {
      const res = await risApi.get<FacultyCopyrightCategoryList>(
        FACULTY_COPYRIGHT_CATEGORY_LIST_KEY,
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


export const FACULTY_COPYRIGHT_PUBLISHERS_LIST_KEY = '/faculty/publisher_list';

export interface FacultyCopyrightPublishersList {
  publishers: string[]
}

export function useFacultyCopyrightPublishersList() {
  const { data: session, status } = useSession();

  return useQuery<FacultyCopyrightPublishersList>({
    queryKey: [FACULTY_COPYRIGHT_PUBLISHERS_LIST_KEY],
    queryFn: async () => {
      const res = await risApi.get<FacultyCopyrightPublishersList>(
        FACULTY_COPYRIGHT_PUBLISHERS_LIST_KEY,
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