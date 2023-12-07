'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { risApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import profileImage from '@/assets/images/profile.png';
import { USERS_KEY, USER_ROLE } from '@/lib/constants';
import _ from 'lodash';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';

export function ProfileGear() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const [endPoint, setEndPoint] = useState<string>();

  const { data: profile, isFetching } = useQuery<DefaultApiResponse<Profile>>({
    queryKey: [USERS_KEY, endPoint],
    queryFn: async () => {
      const res = await risApi.get<DefaultApiResponse<Profile>>(
        USERS_KEY + endPoint,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.authToken}`,
          },
        }
      );
      return res.data;
    },
    enabled: status === 'authenticated' && Boolean(endPoint),
    refetchOnMount: false,
  });

  const profile_data = profile?.result;

  useEffect(() => {
    const role = session?.user.role as keyof typeof USER_ROLE;

    setEndPoint(() => {
      switch (role) {
        case 'STUDENT':
          return '/profile/student';

        case 'ADMIN':
        case 'FACULTY':
          return '/profile/faculty';
      }
    });
  }, [session]);

  async function logOutHandler() {
    await signOut({ redirect: false });
    router.push('/');
  }

  return (
    <>
      {isFetching || !profile ? (
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
            {/* <Avatar>
              <AvatarImage src="https://i.pinimg.com/236x/42/86/8d/42868dea29d08befcb7878155b807c8f.jpg" />
              <AvatarFallback>{profile_data?.name?.charAt(0)}</AvatarFallback>
            </Avatar> */}
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
                {profile_data?.name}
              </div>
              <div className="text-[10px] font-semibold">
                {profile_data?.email}
              </div>
            </div>

            <ChevronDownIcon
              className={cn(
                'h-5 w-5 transition-transform',
                isOpen && '-rotate-180'
              )}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="flex items-center justify-between">
              <div className="flex flex-0 max-w-full truncate">
                {_.truncate(profile_data?.username, { length: 16 })}
              </div>
              <Badge className="ml-1">{session?.user?.role as any}</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Inbox</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOutHandler}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
