import { useFacultyWorkflowContext } from '@/components/module/faculty/components/context/faculty-workflow';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { risApi } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { FaXmark } from 'react-icons/fa6';

export interface RejectDialogProps {
  id: string;
  disabled?: boolean;
}

export function RejectDialog({ id, disabled = false }: RejectDialogProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const { researchType, selectedProcess } = useFacultyWorkflowContext();

  const update = useMutation({
    mutationFn: (payload: { status: string }) => {
      return risApi.put(`/faculty/approve_manuscript/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
      });
    },

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [
          `/faculty/adviser/manuscript/${selectedProcess?.course}/${selectedProcess?.section}`,
          researchType,
        ],
      });
    },
  });

  async function rejectHandler() {
    try {
      setIsSubmitting(true);

      await update.mutateAsync({ status: 'Rejected' });

      toast({
        title: 'Reject Full Manuscript Success',
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: 'Reject Full Manuscript Failed',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      defaultOpen={open}
      onOpenChange={() => setOpen((prev) => !prev)}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-2" disabled={disabled}>
          <FaXmark /> <span>Reject</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject full manuscript</DialogTitle>
        </DialogHeader>
        <div>
          <p>Do you want to reject this full manuscript?</p>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={rejectHandler}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="h-fit w-fit animate-spin">
                <BiLoaderAlt />
              </span>
            ) : (
              'Reject'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
