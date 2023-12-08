import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAdminAssignRoles } from '@/hooks/use-admin-query';
import { Row } from '@tanstack/react-table';

interface DataTableRowCheckboxProps<TData> {
  row: Row<TData>;
  value: string;
  disabled?: boolean;
}

export function DataTableRowCheckbox<TData>({
  row,
  value,
  disabled = false,
}: DataTableRowCheckboxProps<TData>) {
  const { toast } = useToast();
  const id = row.getValue('id') as string;
  const facultyName = row.getValue('faculty_name') as string;

  const roles = (row.getValue('role_names') ?? []) as string[];

  const hasRole = roles.includes(value);

  const update = useAdminAssignRoles();

  async function toggleHandler() {
    try {
      if (hasRole) {
        const filteredRoles = roles.filter((role) => role !== value);

        await update.mutateAsync({ user_id: id, roles: filteredRoles });

        toast({
          title: 'Update Roles Success',
          description: `Disabled the \'${value}\' role for ${facultyName}.`,
        });
      } else {
        const updatedRoles = [...roles, value];
        await update.mutateAsync({ user_id: id, roles: updatedRoles });

        toast({
          title: 'Update Roles Success',
          description: `Enabled the \'${value}\' role for ${facultyName}.`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Update Roles Failed',
        variant: 'destructive',
        description: error?.message,
      });
    }
  }

  return (
    <Checkbox checked={hasRole} onClick={toggleHandler} disabled={disabled} />
  );
}
