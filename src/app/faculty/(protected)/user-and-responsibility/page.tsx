import { UserAndResponsibilitySection } from '@/components/module/faculty';

export default function FacultyUserAndResponsibility() {
  return (
    <div className="py-10 min-h-screen space-y-10 relative">
      <div className="prose dark:prose-h1:text-white">
        <h1>User and Responsibility</h1>
      </div>
      <UserAndResponsibilitySection />
    </div>
  );
}
