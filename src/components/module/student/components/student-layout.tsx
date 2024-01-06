'use client';

import { DashboardContent } from '@/components/global';
import { useGetStudentMyWorkflow } from '@/hooks/use-student-query';
import { STUDENT_NAVIGATION1 } from '@/lib/constants';
import { SidebarData } from '@/types/navigation';
import { useEffect, useMemo, useState } from 'react';
import { StudentWorkflowContext } from './context/student-workflow';
import { StudentSidebar } from './student-sidebar';

export function StudentLayout({ children }: React.PropsWithChildren) {
  const [researchType, setResearchType] = useState<string>('');

  const { data: myWorkflow = [] } = useGetStudentMyWorkflow();

  const sidebars = useMemo<SidebarData[]>(() => {
    const flows: SidebarData[] = myWorkflow.map(({ type }) => ({
      key: type,
      label: type,
      navigations: STUDENT_NAVIGATION1,
    }));

    return flows;
  }, [myWorkflow]);

  useEffect(() => {
    if (sidebars.length > 0) {
      setResearchType(sidebars[0].key);
    }
  }, [sidebars, setResearchType]);

  return (
    <div>
      <StudentWorkflowContext.Provider
        value={{ researchType, setResearchType }}
      >
        <StudentSidebar sidebars={sidebars} />
        <DashboardContent>{children}</DashboardContent>
      </StudentWorkflowContext.Provider>
    </div>
  );
}
