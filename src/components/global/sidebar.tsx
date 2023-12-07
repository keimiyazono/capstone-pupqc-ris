'use client';

import logo13 from '@/assets/images/logo13.png';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';
import { Navigation, NavigationParent } from '@/types/navigation';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export interface SidebarProps {
  className?: string;
  navigation?: Navigation[];
  nav: NavigationParent;
}

export function Sidebar({ className, navigation = [], nav }: SidebarProps) {
  const parentId = useId();
  const childrenId = useId();
  const pathname = usePathname();
  const { show } = useSidebarStore();

  return (
    <div
      className={cn(
        'hidden xl:fixed xl:flex xl:flex-col xl:inset-y-0 xl:z-50 xl:w-64 transition-all ease-out duration-500 bg-card border-r',
        !show && 'xl:w-20',
        className
      )}
    >
      <div className="flex justify-center items-center gap-5 h-28 opacity-100">
        <Image src={logo13} alt="PUPQC RIS logo" height={120} width={120} />
      </div>

      <div className="px-4 pt-5 pb-10">
        <Select defaultValue="Research">
          <SelectTrigger className="bg-primary text-white uppercase [&>svg]:hidden text-center rounded-xl justify-center font-medium tracking-wider">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectGroup>
              <SelectItem value="Capstone">Capstone</SelectItem>
              <SelectItem value="Research">Research</SelectItem>
              <SelectItem value="Feasibility Study">
                Feasibility Study
              </SelectItem>
              <SelectItem value="Business Plan">Business Plan</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex flex-col flex-1 overflow-y-auto border-t">
        {nav.map((n, parentIdx) => {
          if ('nodeList' in n) {
            const { label, nodeList } = n;

            const hasActiveNav = nodeList.some(({ href }) =>
              pathname.startsWith(href)
            );

            return (
              <Accordion
                key={parentId + parentIdx}
                type="single"
                defaultValue={hasActiveNav ? label : undefined}
                collapsible
              >
                <AccordionItem value={label}>
                  <AccordionTrigger
                    className={cn(
                      'hover:no-underline px-4 text-xs font-medium',
                      hasActiveNav && 'text-primary text-center'
                    )}
                  >
                    {show ? label : _.truncate(label, { length: 4 })}
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    {nodeList.map(
                      ({ href, label, Icon, className }, childrenIdx) => (
                        <Link key={childrenId + childrenIdx} href={href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              'border-b relative justify-start w-full gap-6 text-[11px] py-6 hover:bg-blue-50 transition-colors hover:text-primary',
                              pathname.startsWith(href) &&
                                'bg-blue-50 text-primary after:absolute after:h-full after:w-1 after:bg-primary after:right-0',
                              className
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="w-44 truncate text-left">
                              {label}
                            </span>
                          </Button>
                        </Link>
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          } else {
            const { href, Icon, label } = n;
            return (
              <Link key={childrenId + parentIdx} href={href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'border-b relative justify-start w-full gap-6 text-[11px] py-6 hover:bg-blue-50 transition-colors hover:text-primary',
                    pathname.startsWith(href) &&
                      'bg-blue-50 text-primary after:absolute after:h-full after:w-1 after:bg-primary after:right-0',
                    className
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="w-44 truncate text-left">{label}</span>
                </Button>
              </Link>
            );
          }
        })}
      </ScrollArea>
      {/* <ThemeButton /> */}
    </div>
  );
}
