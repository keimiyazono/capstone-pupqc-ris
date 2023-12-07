import { FullManuscriptSection } from '@/components/module/student';

export default function StudentFullManusriptProtocol() {
  return (
    <div className="py-10 min-h-screen space-y-10">
      <div className="prose dark:prose-h1:text-white">
        <h1>Full Manuscript</h1>
      </div>

      <FullManuscriptSection />
    </div>
  );
}
