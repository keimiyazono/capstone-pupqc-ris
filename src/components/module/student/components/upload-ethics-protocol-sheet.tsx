'use client';

import { FormSheetWrapper } from '@/components/global/wrappers/form-sheet-wrapper';
import { Button } from '@/components/ui/button';
import { ComboboxOptions } from '@/components/ui/combobox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { FileUploadInput } from '@/components/ui/file-upload-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { useUploadEthics } from '@/hooks/use-ethics-query';
import { useGetUserResearchPapers } from '@/hooks/use-research-query';
import { uploadFile } from '@/lib/upload-file';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import _ from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiLoaderAlt } from 'react-icons/bi';
import { IoCloudUploadOutline } from 'react-icons/io5';
import * as z from 'zod';
import { uploadEthicsProtocolFormSchema } from '../validation';

const DEFAULT_OPTIONS: ComboboxOptions[] = [];

export default function UploadEthicProtocolSheet() {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { data: userResearchPapers } = useGetUserResearchPapers();

  const researchPapers: ComboboxOptions[] = userResearchPapers
    ? userResearchPapers.map((data) => ({ label: data.title, value: data.id }))
    : DEFAULT_OPTIONS;

  const create = useUploadEthics();

  const form = useForm<z.infer<typeof uploadEthicsProtocolFormSchema>>({
    resolver: zodResolver(uploadEthicsProtocolFormSchema),
    shouldFocusError: false,
  });

  const { isSubmitting } = form.formState;

  async function onSubmit({
    research_paper_id,
    ...files
  }: z.infer<typeof uploadEthicsProtocolFormSchema>) {
    try {
      const letter_of_intent = await uploadFile({
        file: files.letter_of_intent,
        fileName: files.letter_of_intent?.name,
      });

      if (!letter_of_intent && files.letter_of_intent) {
        toast({
          title: 'Upload File Failed',
          variant: 'destructive',
        });

        return;
      }

      const urec_9 = await uploadFile({
        file: files.urec_9,
        fileName: files.urec_9?.name,
      });

      if (!urec_9 && files.urec_9) {
        toast({
          title: 'Upload File Failed',
          variant: 'destructive',
        });

        return;
      }

      const urec_10 = await uploadFile({
        file: files.urec_10,
        fileName: files.urec_10?.name,
      });

      if (!urec_10 && files.urec_10) {
        toast({
          title: 'Upload File Failed',
          variant: 'destructive',
        });

        return;
      }

      const urec_11 = await uploadFile({
        file: files.urec_11,
        fileName: files.urec_11?.name,
      });

      if (!urec_11 && files.urec_11) {
        toast({
          title: 'Upload File Failed',
          variant: 'destructive',
        });

        return;
      }

      const urec_12 = await uploadFile({
        file: files.urec_12,
        fileName: files.urec_12?.name,
      });

      if (!urec_12 && files.urec_12) {
        toast({
          title: 'Upload File Failed',
          variant: 'destructive',
        });

        return;
      }

      const certificate_of_validation = await uploadFile({
        file: files.certificate_of_validation,
        fileName: files.certificate_of_validation?.name,
      });

      if (!certificate_of_validation && files.certificate_of_validation) {
        toast({
          title: 'Upload File Failed',
          variant: 'destructive',
        });

        return;
      }

      const co_authorship = await uploadFile({
        file: files.co_authorship,
        fileName: files.co_authorship?.name,
      });

      if (!co_authorship && files.co_authorship) {
        toast({
          title: 'Upload File Failed',
          variant: 'destructive',
        });

        return;
      }

      const modifiedValues: UploadEthicsPayload = {
        research_paper_id,
        letter_of_intent,
        urec_9,
        urec_10,
        urec_11,
        urec_12,
        certificate_of_validation,
        co_authorship,
      };

      await create.mutateAsync(modifiedValues);

      toast({
        title: 'Upload Ethics Success',
      });

      form.reset({
        research_paper_id: '',
        letter_of_intent: undefined,
        urec_9: undefined,
        urec_10: undefined,
        urec_11: undefined,
        urec_12: undefined,
        certificate_of_validation: undefined,
        co_authorship: undefined,
      });

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Upload Ethics Failed',
        variant: 'destructive',
      });
    }
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  return (
    <FormSheetWrapper
      open={open}
      toggle={toggle}
      ButtonTrigger={
        <Button className="gap-2 text-white">
          <IoCloudUploadOutline />
          <span>Upload Ethics/Protocol</span>
        </Button>
      }
      formTitle="Upload Ethics/Protocol"
      formDescrition="Prior to uploading the research protocol document, please ensure
    that it is in PDF format, and that it has been scanned for
    submission. Additionally, verify that all required signatures are
    present, and that the document has been approved by the Sta. Mesa
    Branch. These steps are essential for a smooth and efficient review
    process. Thank you for your attention to these instructions."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 flex flex-col flex-grow"
        >
          <ScrollArea className="h-96 rounded-md flex flex-grow">
            <div className="grid grid-cols-2 gap-6 items-end p-6">
              <FormField
                control={form.control}
                name="research_paper_id"
                render={({ field }) => (
                  <FormItem className="col-span-2 flex flex-col">
                    <FormLabel>Research title</FormLabel>
                    <FormControl>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'flex flex-1 justify-between line-clamp-1',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {_.truncate(
                                field.value
                                  ? researchPapers.find(
                                      (option) => option.value === field.value
                                    )?.label
                                  : 'Select research title',
                                { length: 60 }
                              )}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-fit">
                          <Command className="popover-content-width-same-as-its-trigger">
                            <ScrollArea
                              className="flex max-h-80 flex-col"
                              type="always"
                            >
                              <CommandInput
                                placeholder="Search research title..."
                                className="h-9"
                              />
                              <CommandEmpty>
                                No research title found.
                              </CommandEmpty>

                              <CommandGroup>
                                {researchPapers.map((option) => (
                                  <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    onSelect={() => {
                                      field.onChange(option.value);
                                    }}
                                  >
                                    {option.label}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        option.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FileUploadInput
                control={form.control}
                name="letter_of_intent"
                label="Letter of Intent"
                accept=".pdf"
              />

              <FileUploadInput
                control={form.control}
                name="urec_9"
                label="Application Form / UREC FORM 9"
                accept=".pdf"
              />

              <FileUploadInput
                control={form.control}
                name="urec_10"
                label="Research Protocol / UREC FORM 10"
                accept=".pdf"
              />

              <FileUploadInput
                control={form.control}
                name="urec_11"
                label="Consent Forms / UREC 11"
                accept=".pdf"
              />

              <FileUploadInput
                control={form.control}
                name="urec_12"
                label="UREC 12"
                description="only if participants are minors; otherwise, exclude it."
                accept=".pdf"
              />

              <FileUploadInput
                control={form.control}
                name="certificate_of_validation"
                label="Certificate of Validation"
                accept=".pdf"
              />

              <FileUploadInput
                control={form.control}
                name="co_authorship"
                label="Co-Authorship Agreement for Multiple Authorship"
                accept=".pdf"
              />
            </div>
          </ScrollArea>

          <div className="flex flex-0 px-6">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <span className="h-fit w-fit animate-spin">
                  <BiLoaderAlt />
                </span>
              ) : (
                'Upload'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormSheetWrapper>
  );
}
