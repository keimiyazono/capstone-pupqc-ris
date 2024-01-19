'use client';

import { DashboardContent } from '@/components/global';
import { useState } from 'react';
import type { Assignsection } from '../hooks/use-faculty-process';
import { FacultyWorkflowContext } from './context/faculty-workflow';
import { FacultySidebar } from './faculty-sidebar';

export function FacultyLayout({ children }: React.PropsWithChildren) {
  const [researchType, setResearchType] = useState<string>('');
  const [selectedProcess, setSelectedProcess] = useState<Assignsection | null>(
    null
  );

  // const sidebars = useMemo<SidebarData[]>(() => {
  //   const navigations: SidebarData[] = [];

  // const navigations = [
  //   {
  //     key: 'research professor',
  //     label: 'Professor',
  //     navigations: [
  //       {
  //         label: 'Dashboard',
  //         Icon: BiSolidDashboard,
  //         href: '/faculty/dashboard',
  //       },
  //       {
  //         label: 'Faculty Roles',
  //         nodeList: [
  //           {
  //             label: 'User and responsibility',
  //             Icon: FaUsersCog,
  //             href: '/faculty/user-and-responsibility',
  //           },
  //           {
  //             label: 'Adviser and section distribution',
  //             Icon: FaChalkboardTeacher,
  //             href: '/faculty/adviser-and-section-distribution',
  //           },
  //           {
  //             label: 'Section and process selection',
  //             Icon: FaArrowRotateRight,
  //             href: '/faculty/section-and-process-selection',
  //           },
  //         ],
  //       },
  //       {
  //         label: 'Collaboration',
  //         Icon: HiMiniUserGroup,
  //         href: '/faculty/collaboration',
  //       },
  //       {
  //         label: 'Repository',
  //         Icon: SlBookOpen,
  //         href: '/faculty/repository',
  //       },
  //       {
  //         label: 'Copyrighted research submissions',
  //         Icon: FaCopyright,
  //         href: '/faculty/copyrighted-research-submissions',
  //       },
  //     ],
  //   },
  //   {
  //     key: 'research adviser',
  //     label: 'Research Adviser',
  //     navigations: [
  //       {
  //         label: 'Dashboard',
  //         Icon: BiSolidDashboard,
  //         href: '/faculty/dashboard',
  //       },
  //       {
  //         label: 'Students Documents',
  //         nodeList: [
  //           {
  //             label: 'Submitted Proposal',
  //             Icon: BsGraphUpArrow,
  //             href: '/faculty/submitted-proposal',
  //           },
  //           {
  //             label: 'Set Pre-Oral Defense Date',
  //             Icon: TbCalendarStats,
  //             href: '/faculty/set-pre-oral-defense',
  //           },
  //           {
  //             label: 'Submitted Ethics/Protocol',
  //             Icon: IoShieldHalf,
  //             href: '/faculty/submitted-ethics-protocol',
  //           },
  //           {
  //             label: 'Submitted Full Manuscript',
  //             Icon: GiFeather,
  //             href: '/faculty/submitted-full-manuscript',
  //           },
  //           {
  //             label: 'Set Final Defense Date',
  //             Icon: TbCalendarStats,
  //             href: '/faculty/set-final-defense',
  //           },
  //           {
  //             label: 'Submitted Copyright Documents',
  //             Icon: FaCopyright,
  //             href: '/faculty/submitted-copyright-documents',
  //           },
  //         ],
  //       },
  //       ...STATIC_NAVIGATION
  //     ],
  //   },
  // ];

  // const roles = facultyProfile?.result?.roles ?? [];

  // return navigations.filter(({ key }) => roles.includes(key));
  // }, [facultyProfile]);

  return (
    <div>
      <FacultyWorkflowContext.Provider
        value={{
          researchType,
          setResearchType,
          selectedProcess,
          setSelectedProcess,
        }}
      >
        <FacultySidebar />
        <DashboardContent>{children}</DashboardContent>
      </FacultyWorkflowContext.Provider>
    </div>
  );
}
