'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import {
  UpdateDefensePayload,
  UploadDefensePayload,
  useUpdateDefense,
  useUploadDefense,
} from '@/hooks/use-defense-query';
import { StudentFlowInfoStep } from '@/hooks/use-student-query';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { BiLoaderAlt } from 'react-icons/bi';
import * as z from 'zod';
import { uploadDefenseFormSchema } from '../validation';
import { useStudentWorkflowContext } from './context/student-workflow';

export interface DefenseData {
  modified_at: string;
  created_at: string;
  research_paper_id: string;
  date: any;
  workflow_step_id: string;
  id: string;
  type: string;
  time: string;
}

export interface DefenseSectionProps {
  label: string;
  className?: string;
  researchPaperId: string;
  step: StudentFlowInfoStep;
  updateStepCallback: () => void;
}

export function DefenseSection({
  label,
  className,
  step,
  researchPaperId,
  updateStepCallback,
}: DefenseSectionProps) {
  const wholeInfo = (step.info['whole-info'] ??
    [])[0] as unknown as DefenseData;

  const action = Boolean(wholeInfo?.id) ? 'update' : 'submit';

  const { toast } = useToast();

  const form = useForm<z.infer<typeof uploadDefenseFormSchema>>({
    resolver: zodResolver(uploadDefenseFormSchema),
    shouldFocusError: false,
    defaultValues: {
      date: wholeInfo?.date ? new Date(wholeInfo.date) : undefined,
      time: wholeInfo?.time ?? undefined,
    },
  });

  const { workflowId } = useStudentWorkflowContext();

  const upload = useUploadDefense({ workflowId });
  const update = useUpdateDefense({ workflowId });

  const { isSubmitting } = form.formState;

  const status = step?.info?.['whole-info']?.[0]?.status ?? '';

  const APPROVE_LIST = ['Approve', 'Approved'];

  const isApproved = APPROVE_LIST.includes(status);

  const onSubmit = async (values: z.infer<typeof uploadDefenseFormSchema>) => {
    if (action === 'submit') {
      try {
        const payload: UploadDefensePayload = {
          research_paper_id:
            wholeInfo?.research_paper_id ?? researchPaperId ?? '',
          type: label === 'Pre-Oral Defense' ? 'pre-oral' : 'final',
          workflow_step_id: wholeInfo?.workflow_step_id ?? step.id ?? '',
          time: values.time + ':00',
          date: moment(values.date).format('YYYY-MM-DD'),
        };

        await upload.mutateAsync(payload);

        toast({
          title: `Submit ${label} Success`,
        });
      } catch {
        toast({
          title: `Submit ${label} Failed`,
          variant: 'destructive',
        });
      }
    }

    if (action === 'update') {
      try {
        const timeRegex = /^\d{2}\:\d{2}\:\d{2}$/;

        const isValidTime = timeRegex.test(values.time);

        const payload: UpdateDefensePayload = {
          defense_id: wholeInfo?.id,
          type: label === 'Pre-Oral Defense' ? 'pre-oral' : 'final',
          time: isValidTime ? values.time : values.time + ':00',
          date: moment(values.date).format('YYYY-MM-DD'),
        };

        await update.mutateAsync(payload);

        toast({
          title: `Update ${label} Success`,
        });
      } catch {
        toast({
          title: `Update ${label} Failed`,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>
          Only click the &ldquo;Done&ldquo; button after completing your{' '}
          {label.toLowerCase()} presentation. Please refrain from clicking the
          button if your presentation is not yet concluded.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full text-lg capitalize"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="h-fit w-fit animate-spin">
                      <BiLoaderAlt />
                    </span>
                  ) : (
                    action
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="button"
            variant="secondary"
            className="w-40 text-lg"
            onClick={updateStepCallback}
            disabled={!isApproved}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
