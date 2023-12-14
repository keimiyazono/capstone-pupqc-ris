'use client';

import { DashboardContent, Sidebar } from '@/components/global';
import { useGetFacultyProfile } from '@/hooks/use-user-query';
import { useSidebarStore } from '@/store/sidebar-store';
import { SidebarData } from '@/types/navigation';
import { useEffect, useMemo } from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaChalkboardTeacher, FaCopyright, FaUsersCog } from 'react-icons/fa';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { GiFeather } from 'react-icons/gi';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoShieldHalf } from 'react-icons/io5';
import { SlBookOpen } from 'react-icons/sl';
import { TbCalendarStats } from 'react-icons/tb';

export function FacultyLayout({ children }: React.PropsWithChildren) {
  const { data: facultyProfile, isLoading: facultyProfileIsLoading } =
    useGetFacultyProfile();

  const { selectSidebar } = useSidebarStore();

  const sidebars = useMemo<SidebarData[]>(() => {
    const navigations = [
      {
        key: 'research professor',
        label: 'Research Professor',
        navigations: [
          {
            label: 'Dashboard',
            Icon: BiSolidDashboard,
            href: '/faculty/dashboard',
          },
          {
            label: 'Faculty Roles',
            nodeList: [
              {
                label: 'User and responsibility',
                Icon: FaUsersCog,
                href: '/faculty/user-and-responsibility',
              },
              {
                label: 'Adviser and section distribution',
                Icon: FaChalkboardTeacher,
                href: '/faculty/adviser-and-section-distribution',
              },
              {
                label: 'Section and process selection',
                Icon: FaArrowRotateRight,
                href: '/faculty/section-and-process-selection',
              },
            ],
          },
          {
            label: 'Students Documents',
            nodeList: [
              {
                label: 'Submitted Proposal',
                Icon: BsGraphUpArrow,
                href: '/faculty/submitted-proposal',
              },
              {
                label: 'Set Pre-Oral Defense Date',
                Icon: TbCalendarStats,
                href: '/faculty/set-pre-oral-defense',
              },
              {
                label: 'Submitted Ethics/Protocol',
                Icon: IoShieldHalf,
                href: '/faculty/submitted-ethics-protocol',
              },
              {
                label: 'Submitted Full Manuscript',
                Icon: GiFeather,
                href: '/faculty/submitted-full-manuscript',
              },
              {
                label: 'Set Final Defense Date',
                Icon: TbCalendarStats,
                href: '/faculty/set-final-defense',
              },
              {
                label: 'Submitted Copyright Documents',
                Icon: FaCopyright,
                href: '/faculty/submitted-copyright-documents',
              },
            ],
          },
          {
            label: 'Collaboration',
            Icon: HiMiniUserGroup,
            href: '/faculty/collaboration',
          },
          {
            label: 'Repository',
            Icon: SlBookOpen,
            href: '/faculty/repository',
          },
          {
            label: 'Copyrighted research submissions',
            Icon: FaCopyright,
            href: '/faculty/copyrighted-research-submissions',
          },
        ],
      },
      {
        key: 'research adviser',
        label: 'Research Adviser',
        navigations: [
          {
            label: 'Dashboard',
            Icon: BiSolidDashboard,
            href: '/faculty/dashboard',
          },
          {
            label: 'Students Documents',
            nodeList: [
              {
                label: 'Submitted Proposal',
                Icon: BsGraphUpArrow,
                href: '/faculty/submitted-proposal',
              },
              {
                label: 'Set Pre-Oral Defense Date',
                Icon: TbCalendarStats,
                href: '/faculty/set-pre-oral-defense',
              },
              {
                label: 'Submitted Ethics/Protocol',
                Icon: IoShieldHalf,
                href: '/faculty/submitted-ethics-protocol',
              },
              {
                label: 'Submitted Full Manuscript',
                Icon: GiFeather,
                href: '/faculty/submitted-full-manuscript',
              },
              {
                label: 'Set Final Defense Date',
                Icon: TbCalendarStats,
                href: '/faculty/set-final-defense',
              },
              {
                label: 'Submitted Copyright Documents',
                Icon: FaCopyright,
                href: '/faculty/submitted-copyright-documents',
              },
            ],
          },
          {
            label: 'Collaboration',
            Icon: HiMiniUserGroup,
            href: '/faculty/collaboration',
          },
          {
            label: 'Repository',
            Icon: SlBookOpen,
            href: '/faculty/repository',
          },
          {
            label: 'Copyrighted research submissions',
            Icon: FaCopyright,
            href: '/faculty/copyrighted-research-submissions',
          },
        ],
      },
    ];

    const roles = facultyProfile?.result?.roles ?? [];

    return navigations.filter(({ key }) => roles.includes(key));
  }, [facultyProfile]);

  useEffect(() => {
    if (sidebars.length > 0) {
      selectSidebar(sidebars[0]);
    }
  }, [sidebars, selectSidebar]);

  return (
    <div>
      {sidebars.length > 0 && <Sidebar sidebars={sidebars} />}
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
}
