import { Card, CardContent } from '@/components/ui/card';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { LuCheckCircle, LuShield, LuXCircle } from 'react-icons/lu';
import { MdOutlinePending } from 'react-icons/md';
import { PiChalkboardTeacherLight } from 'react-icons/pi';

export function FacultyDashboardSection() {
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

      <div className="prose dark:prose-headings:text-white max-w-none">
        <h2>Announcement</h2>

        <Card>
          <CardContent>
            <p>
              🌟 Now Accepting Applications: Research Excellence Grants at PUP!
              🌟
            </p>

            <h3>Dear PUP Faculty and Researchers,</h3>

            <p>
              Exciting news! The Research Excellence Grants program is now
              accepting applications. This is your chance to secure funding of
              up to Php50,000 per project, fueling your innovative research
              across all academic disciplines.
            </p>

            <p>Apply by January 1, 2024!</p>

            <p>
              Seize this opportunity to turn your groundbreaking ideas into
              reality. Let your research journey begin! Access the Google Form
              to submit your application today.
            </p>

            <p>🔗 www.gformsample.com/sample</p>

            <p>Let your research journey begin!</p>

            <p>Best Regards,</p>

            <p>PUPQC Research Admin</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
