'use client';

import { useGetFacultyFacultyManuscriptById } from '@/components/module/faculty/hooks/use-faculty-manuscript-query';
import { TiptapRenderer } from '@/components/module/tiptap/components/tiptap-renderer';
import { Button } from '@/components/ui/button';
import { FileUploadInput } from '@/components/ui/file-upload-input';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoChevronBackSharp } from 'react-icons/io5';
import * as z from 'zod';
import { fullManuscriptFormSchema } from '../validation';
import { ApproveDialog } from './approve-dialog';
import { RejectDialog } from './reject-dialog';

export interface FullManuscriptViewProps {
  id: string;
  showApproveDialog?: boolean;
  showRejectDialog?: boolean;
  showBackButton?: boolean;
}

export function FullManuscriptView({
  id,
  showApproveDialog = false,
  showRejectDialog = false,
  showBackButton = false,
}: FullManuscriptViewProps) {
  const router = useRouter();

  const { data: fullManuscript } = useGetFacultyFacultyManuscriptById({ id });

  const form = useForm<z.infer<typeof fullManuscriptFormSchema>>({
    resolver: zodResolver(fullManuscriptFormSchema),
    shouldFocusError: false,
  });

  return (
    <>
      <div className="flex items-center">
        {showBackButton && (
          <div>
            <Button
              type="button"
              variant="secondary"
              className="gap-2"
              onClick={() => router.back()}
            >
              <IoChevronBackSharp />
              <span>Back</span>
            </Button>
          </div>
        )}

        {fullManuscript && (
          <div className="flex items-center ml-auto gap-2">
            {showApproveDialog && (
              <ApproveDialog
                id={id}
                disabled={fullManuscript.status === 'Approved'}
              />
            )}
            {showRejectDialog && (
              <RejectDialog
                id={id}
                disabled={fullManuscript.status === 'Rejected'}
              />
            )}
          </div>
        )}
      </div>

      {fullManuscript && (
        <div className="flex flex-col">
          <Form {...form}>
            <form className="space-y-6">
              {fullManuscript?.file && (
                <FileUploadInput
                  control={form.control}
                  name="letter_of_intent"
                  label="Letter of Intent"
                  defaultFile={fullManuscript?.file}
                  defaultFileName={fullManuscript?.file}
                  hideDeleteButton
                />
              )}

              {fullManuscript?.content && (
                <div className="space-y-3">
                  <div className="text-sm font-medium leading-none">
                    Content
                  </div>
                  <TiptapRenderer html={fullManuscript?.content} />
                </div>
              )}

              {fullManuscript?.abstract && (
                <div className="space-y-3">
                  <div className="text-sm font-medium leading-none">
                    Abstract
                  </div>
                  <TiptapRenderer html={fullManuscript?.abstract} />
                </div>
              )}

              {fullManuscript?.keywords && (
                <div className="space-y-3">
                  <div className="text-sm font-medium leading-none">
                    Keywords
                  </div>
                  <TiptapRenderer html={fullManuscript?.keywords} />
                </div>
              )}
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
