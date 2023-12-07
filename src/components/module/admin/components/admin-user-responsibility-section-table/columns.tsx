'use client';

import { ColumnDef } from '@tanstack/react-table';

import { FACULTY_TYPES } from '@/lib/constants';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowCheckbox } from './data-table-row-checkbox';

export const columns: ColumnDef<AdminFacultyWithRoles>[] = [
  {
    accessorKey: 'faculty_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[400px] truncate font-medium">
          {row.getValue('faculty_name')}
        </div>
      );
    },
  },
  {
    accessorKey: FACULTY_TYPES.RESEARCH_PROFESSOR,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Research Professor" />
    ),
    cell: ({ row }) => (
      <DataTableRowCheckbox
        row={row}
        value={FACULTY_TYPES.RESEARCH_PROFESSOR}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: FACULTY_TYPES.ADMIN,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Admin" />
    ),
    cell: ({ row }) => (
      <DataTableRowCheckbox row={row} value={FACULTY_TYPES.ADMIN} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'role_names',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="faculty roles" />
    ),
    cell: ({ column }) => column.toggleVisibility(),
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ column }) => column.toggleVisibility(),
    enableSorting: false,
  },
];
