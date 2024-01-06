import { FacultyProcessContext } from '../context/process';
import { FacultyWorkflowSections } from './faculty-workflow-sections';

export interface FacultyWorkflowRowProps {
  research_type: string;
}

export function FacultyWorkflowRow({ research_type }: FacultyWorkflowRowProps) {
  return (
    <FacultyProcessContext.Provider
      value={{
        research_type,
      }}
    >
      <div className="col-span-2 grid grid-cols-2 gap-x-10 p-10">
        <div className="col-span-1">
          <FacultyWorkflowSections />
        </div>

        <div className="col-span-1">{/* <StudentWorkflow /> */}</div>
      </div>
    </FacultyProcessContext.Provider>
  );
}
