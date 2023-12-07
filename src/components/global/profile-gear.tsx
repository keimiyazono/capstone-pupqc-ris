'use client';

import profileImage from '@/assets/images/profile.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useGetFacultyProfile,
  useGetStudentProfile,
} from '@/hooks/use-user-query';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';

type Profile = StudentProfile | FacultyProfile | undefined;

export function ProfileGear() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const roleId = useId();

  const pathname = usePathname();

  // prettier-ignore
  const { data: studentProfile, isLoading: studentProfileIsLoading } = useGetStudentProfile();

  // prettier-ignore
  const { data: facultyProfile, isLoading: facultyProfileIsLoading } = useGetFacultyProfile();

  // prettier-ignore
  const profileIsLoading: boolean = studentProfileIsLoading || facultyProfileIsLoading

  const profile: Profile = studentProfile?.result ?? facultyProfile?.result;

  async function logOutHandler() {
    await signOut({ redirect: false });
    router.push('/');
  }

  return (
    <>
      {profileIsLoading || !profile ? (
        <div className="flex gap-2 py-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ) : (
        <DropdownMenu
          defaultOpen={isOpen}
          onOpenChange={() => setIsOpen((prev) => !prev)}
        >
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-muted py-4 px-5 focus:outline-none">
            <div>
              <Image
                src={profileImage}
                alt="User profile placeholder"
                height={40}
                width={40}
              />
            </div>

            <div className="leading-none space-y-1 text-left">
              <div className="text-xs font-semibold max-w-[150px] truncate">
                {profile?.name}
              </div>
              <div className="text-[10px] font-semibold">{profile?.email}</div>
            </div>

            <ChevronDownIcon
              className={cn(
                'h-5 w-5 transition-transform',
                isOpen && '-rotate-180'
              )}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="flex flex-wrap gap-1">
              {'roles' in profile ? (
                profile.roles.map((role, idx) => (
                  <Badge
                    key={roleId + idx}
                    className={cn(
                      // prettier-ignore
                      pathname.startsWith('/faculty') && role === 'admin' && 'hidden',

                      // prettier-ignore
                      pathname.startsWith('/admin') && role === 'faculty' && 'hidden'
                    )}
                  >
                    {role}
                  </Badge>
                ))
              ) : (
                <>
                  <Badge variant="outline">{profile.student_number}</Badge>
                  <Badge>
                    {profile.course} {profile.section}
                  </Badge>
                </>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOutHandler}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
