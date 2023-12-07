import { ProgressSection } from '@/components/module/student';

export default function StudentProgress() {
  return (
    <div className="py-10 min-h-screen space-y-10">
      <div className="prose dark:prose-h1:text-white">
        <h1>Progress</h1>
      </div>

      <ProgressSection />
    </div>
  );
}
