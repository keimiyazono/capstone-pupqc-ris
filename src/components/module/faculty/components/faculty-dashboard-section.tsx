'use client';

import { AnnouncementContainer } from '@/components/global/announcement-container';
import { Card, CardContent } from '@/components/ui/card';
import {
  useGetFacultyAnnouncementFundingOpportunity,
  useGetFacultyAnnouncementTrainingAndWorkshop,
} from '@/hooks/use-announcement-query';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { LuCheckCircle, LuShield, LuXCircle } from 'react-icons/lu';
import { MdOutlinePending } from 'react-icons/md';
import { PiChalkboardTeacherLight } from 'react-icons/pi';

export function FacultyDashboardSection() {
  const { data: fundingOpportunities } =
    useGetFacultyAnnouncementFundingOpportunity();

  const { data: trainingAndWorkshops } =
    useGetFacultyAnnouncementTrainingAndWorkshop();

  return (
    <section className="space-y-10">
      <div className="flex flex-wrap items-center gap-4">
        <Card className="w-full max-w-[260px] p-0">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary bg-primary-foreground text-4xl text-primary">
              <PiChalkboardTeacherLight />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-semibold">133</div>
              <div className="text-xs font-semibold">Advisee</div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[260px] p-0">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary bg-primary-foreground text-4xl text-primary">
              <LuShield />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-semibold">143</div>
              <div className="text-xs font-semibold">Ethics</div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[260px] p-0">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary bg-primary-foreground text-4xl text-primary">
              <IoCloudUploadOutline />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-semibold">25</div>
              <div className="text-xs font-semibold">Uploaded Researches</div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[260px] p-0">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-green-500 bg-[#f7f8f8] text-4xl text-green-500">
              <LuCheckCircle />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-semibold">80</div>
              <div className="text-xs font-semibold">Approved Researches</div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[260px] p-0">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-red-500 bg-[#faf9f9] text-4xl text-red-500">
              <LuXCircle />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-semibold">80</div>
              <div className="text-xs font-semibold">Rejected Researches</div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[260px] p-0">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-yellow-500 bg-[#f9f9f8] text-4xl text-yellow-500">
              <MdOutlinePending />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-semibold">80</div>
              <div className="text-xs font-semibold">Pending Researches</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-10">
        {fundingOpportunities instanceof Array && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center">
              Funding And Opportunity
            </h2>

            <div className="space-y-6">
              {fundingOpportunities.map((announcement) => (
                <AnnouncementContainer
                  key={announcement.announcement.id}
                  data={announcement}
                />
              ))}
            </div>
          </>
        )}

        {trainingAndWorkshops instanceof Array && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center">
              Training And Workshops
            </h2>

            <div className="space-y-6">
              {trainingAndWorkshops.map((announcement) => (
                <AnnouncementContainer
                  key={announcement.announcement.id}
                  data={announcement}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
