import { risApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export interface FacultyDefense {
  id: string
  title: string
  time: string
  date: string
}

export function useGetFacultyDefense({
  course,
  section,
  research_type,
  defense_type,
}: {
  course?: string;
  section?: string;
  defense_type?: string;
  research_type?: string;
}) {
  const { data: session, status } = useSession();

  const PATH_KEY = `/faculty/adviser/defense/${course}/${section}`;

  return useQuery<FacultyDefense[]>({
    queryKey: [PATH_KEY, research_type, defense_type],
    queryFn: async () => {
      const res = await risApi.get<FacultyDefense[]>(PATH_KEY, {
        headers: {
          Authorization: `Bearer ${session?.user?.authToken}`,
        },
        params: {
          research_type,
          defense_type,
        },
      });
      return res.data;
    },
    enabled:
      status === 'authenticated' &&
      Boolean(research_type) &&
      Boolean(course) &&
      Boolean(section) &&
      Boolean(defense_type),
  });
}
