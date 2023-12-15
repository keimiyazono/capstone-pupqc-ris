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
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { useUploadFullManusript } from '@/hooks/use-full-manuscript-query';
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
import { TiptapEditor } from '../../tiptap';
import { uploadFullManuscriptFormSchema } from '../validation';

const DEFAULT_OPTIONS: ComboboxOptions[] = [];

export default function UploadFullManuscriptSheet() {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { data: userResearchPapers } = useGetUserResearchPapers();

  const researchPapers: ComboboxOptions[] = userResearchPapers
    ? userResearchPapers.map((data) => ({ label: data.title, value: data.id }))
    : DEFAULT_OPTIONS;

  const create = useUploadFullManusript();

  const form = useForm<z.infer<typeof uploadFullManuscriptFormSchema>>({
    resolver: zodResolver(uploadFullManuscriptFormSchema),
    shouldFocusError: false,
    defaultValues: {
      status: 'Pending',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit({
    file,
    ...rest
  }: z.infer<typeof uploadFullManuscriptFormSchema>) {
    try {
      const file_path = await uploadFile({ file, fileName: file.name });

      if (!file_path) {
        toast({
          title: 'Upload File Failed',
          variant: 'destructive',
        });

        return;
      }

      const modifiedValues: UploadFullManuscriptPayload = {
        file: file_path,
        ...rest,
      };

      await create.mutateAsync(modifiedValues);

      toast({
        title: 'Upload Full Manuscript Success',
      });

      form.reset({
        research_paper_id: '',
        content: '',
        abstract: '',
        keywords: '',
        file: undefined,
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: 'Upload Full Manuscript Failed',
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
          <span>Upload Full Manuscript</span>
        </Button>
      }
      formTitle="Upload Full Manuscript"
      formDescrition='Please provide all the necessary information in the designated
      fields, and click the "upload" button once you&apos;ve
      completed the form.'
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

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <TiptapEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Write content here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="abstract"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Abstract</FormLabel>
                    <FormControl>
                      <TiptapEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Write abstract here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter keywords here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FileUploadInput
                control={form.control}
                name="file"
                label="File input"
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
