'use client';

import { Button } from '@/components/ui/button';
import { ComboboxOptions } from '@/components/ui/combobox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import {
  useAssignAdviserSection,
  useRemoveAdviserSection,
} from '@/hooks/use-faculty-query';
import { useGetCourseWithYearList } from '@/hooks/use-user-query';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Row, Table } from '@tanstack/react-table';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import { updateAdviserSectionFormSchema } from '../../validation';

export type SectionsComboboxOptions = {
  data: SectionsComboboxOptionsData;
} & ComboboxOptions;

export type SectionsComboboxOptionsData = {
  section: string;
  course: string;
};

const DEFAULT_OPTIONS: SectionsComboboxOptions[] = [];

interface DataTableRowSectionDistributionProps<TData> {
  row: Row<TData>;
  table: Table<AdviserData>;
}

export function DataTableRowSectionDistribution<TData>({
  row,
  table,
}: DataTableRowSectionDistributionProps<TData>) {
  const { toast } = useToast();

  const user_profile = row.getValue('user_profile') as UserProfile;
  const assignments = row.getValue('assignments') as Assignment[];

  const researchType = table.options.meta?.researchType;

  const assignment = assignments.find(
    ({ research_type_name }) => researchType === research_type_name
  );

  const research_type_id = assignment?.research_type_id;

  const sections = assignment?.assign_sections ?? [];

  const user_id = user_profile.id;
  const name = user_profile.name;

  const { data: courses } = useGetCourseWithYearList();
  const assign = useAssignAdviserSection();
  const deleteAssignment = useRemoveAdviserSection();

  const form = useForm<z.infer<typeof updateAdviserSectionFormSchema>>({
    resolver: zodResolver(updateAdviserSectionFormSchema),
    shouldFocusError: false,
    defaultValues: {
      sections: [],
    },
  });

  const {
    fields: sectionsFields,
    append: appendSection,
    update: sectionUpdate,
    remove: removeSection,
  } = useFieldArray({ control: form.control, name: 'sections' });

  const courseList = useMemo<SectionsComboboxOptions[]>(() => {
    return courses?.result
      ? courses.result.map(({ course, section }) => ({
          value: uuidv4(),
          label: `${course} ${section}`,
          data: {
            course,
            section,
          },
        }))
      : DEFAULT_OPTIONS;
  }, [courses]);

  const courseListFiltered = courseList.filter(
    (option) => !sectionsFields.some((author) => author.value === option.value)
  );

  useEffect(() => {
    if (sections.length > 0) {
      const collection = sections
        .map((assignment) => {
          const data = courseList.find(
            ({ data }) =>
              data.course === assignment.course &&
              data.section === assignment.section
          );

          return { value: data?.value ?? '' };
        })
        .filter(({ value }) => Boolean(value));

      sectionsFields.forEach(({ value }, idx) => {
        if (!Boolean(value)) {
          removeSection(idx);
        }
      });

      appendSection(collection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id, courseList, sections]);

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="sections"
            render={() => (
              <FormItem className="col-span-2 flex flex-col">
                {sectionsFields.map((sectionsField, idx) => (
                  <div
                    key={sectionsField.id}
                    className="flex items-center gap-3"
                  >
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'flex-1 justify-between',
                              !sectionsField.value && 'text-muted-foreground'
                            )}
                            disabled={Boolean(sectionsField.value)}
                          >
                            {_.truncate(
                              sectionsField.value
                                ? courseList.find(
                                    (option) =>
                                      option.value === sectionsField.value
                                  )?.label
                                : 'Select section',
                              { length: 60 }
                            )}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-fit">
                        <Command className="popover-content-width-same-as-its-trigger">
                          <CommandInput
                            placeholder="Search sections..."
                            className="h-9"
                          />
                          <ScrollArea
                            className="flex max-h-80 flex-col"
                            type="always"
                          >
                            <CommandEmpty>No sections found.</CommandEmpty>

                            <CommandGroup>
                              {courseListFiltered.map((option) => (
                                <CommandItem
                                  value={option.label}
                                  key={option.value}
                                  onSelect={async () => {
                                    try {
                                      if (!research_type_id) return;

                                      sectionUpdate(idx, option);

                                      await assign.mutateAsync({
                                        research_type_id,
                                        assignment: [
                                          {
                                            course: option.data.course,
                                            section: option.data.section,
                                          },
                                        ],
                                      });

                                      toast({
                                        title: 'Assign Section Success',
                                        description: `You assigned the ${option.label} section to ${name}.`,
                                      });
                                    } catch (error) {
                                      toast({
                                        title: 'Assign Section Failed',
                                        variant: 'destructive',
                                      });
                                    }
                                  }}
                                  className="flex max-w-none"
                                >
                                  <div className="font-medium">
                                    {option.label}
                                  </div>
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      option.value === sectionsField.value ||
                                        sectionsFields.some(
                                          (author) =>
                                            author.value === option.value
                                        )
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

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={async () => {
                        removeSection(idx);

                        const section = sections.find((assignment) => {
                          const data = courseList.some(
                            ({ data, value }) =>
                              data.course === assignment.course &&
                              data.section === assignment.section &&
                              value === sectionsField.value
                          );

                          return Boolean(data);
                        });

                        if (typeof section === 'undefined') return;

                        try {
                          await deleteAssignment.mutateAsync({
                            section_id: section.id,
                          });

                          toast({
                            title: 'Remove Assignment Section Success',
                            description: `You removed the assignment of the ${section.course} ${section.section} section from ${name}.`,
                          });
                        } catch (error) {
                          toast({
                            title: 'Remove Assignment Section Failed',
                            variant: 'destructive',
                          });
                        }
                      }}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  className="gap-2 items-center"
                  disabled={
                    courseListFiltered.length < 1 ||
                    sectionsFields.length === courseList.length
                  }
                  onClick={() => appendSection({ value: '' })}
                >
                  <IoAdd /> <span>Add more section</span>
                </Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
