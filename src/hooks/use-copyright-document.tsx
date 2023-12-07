import { risApi } from "@/lib/api";
import { COPYRIGHT_DOCUMENTS_KEY } from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useUploadCopyrightDocument() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UploadCopyrightDocumentsPayload) => {
      return risApi.post(`${COPYRIGHT_DOCUMENTS_KEY}/upload`, payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [COPYRIGHT_DOCUMENTS_KEY] });
    },
  });
}

export function useDeleteCopyrightDocuments() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ copyright_id }: { copyright_id: string }) => {
      return risApi.delete(
        `${COPYRIGHT_DOCUMENTS_KEY}/delete_copyright/${copyright_id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.authToken}`,
          },
        }
      );
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [COPYRIGHT_DOCUMENTS_KEY] });
    },
  });
}

export function useGetUserUserCopyrightDocuments() {
  const { data: session, status } = useSession();

  return useQuery<CopyrightDocument[]>({
    queryKey: [COPYRIGHT_DOCUMENTS_KEY],
    queryFn: async () => {
      const res = await risApi.get<CopyrightDocument[]>(
        COPYRIGHT_DOCUMENTS_KEY + '/user',
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