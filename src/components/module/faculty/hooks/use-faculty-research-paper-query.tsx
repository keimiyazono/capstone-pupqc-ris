import { risApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
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
