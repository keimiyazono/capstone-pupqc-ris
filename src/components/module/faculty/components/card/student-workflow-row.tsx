'use client';

import { useGetSubmittedWorkflows } from '@/hooks/use-workflow-query';
import { useEffect, useState } from 'react';
import {
  StudentProcessContext,
  StudentWorkflowData,
  StudentWorkflowStep,
} from '../context/process';
import { StudentWorkflow } from './student-workflow';
import { WorkflowSections } from './workflow-sections';

export interface StudentWorkflowRowProps {
  research_type: string;
}

export function StudentWorkflowRow({ research_type }: StudentWorkflowRowProps) {
  const [studentWorkflows, setStudentWorkflows] = useState<Workflow[]>([]);

  const [workflowIds, setWorkflowIds] = useState<string[]>([]);

  const [studentWorkflowDatas, setStudentWorkflowDatas] = useState<
    StudentWorkflowData[]
  >([]);

  const [studentWorkflowSteps, setStudentWorkflowSteps] = useState<
    StudentWorkflowStep[]
  >([]);

  const { data: submittedWorkflows } = useGetSubmittedWorkflows();

  useEffect(() => {
    if (typeof submittedWorkflows !== 'undefined') {
      const filtered = submittedWorkflows.filter(
        ({ type }) => type === research_type
      );

      setStudentWorkflows(filtered);
    }
  }, [research_type, submittedWorkflows]);

  console.log({ studentWorkflows });

  return (
    <StudentProcessContext.Provider
      value={{
        research_type,

        workflowIds,
        setWorkflowIds,

        studentWorkflowDatas,
        setStudentWorkflowDatas,

        studentWorkflowSteps,
        setStudentWorkflowSteps,
      }}
    >
      <div className="col-span-2 grid grid-cols-2 gap-x-20">
        <div className="col-span-1">
          <WorkflowSections />
        </div>

        <div className="col-span-1">
          <StudentWorkflow />
        </div>
      </div>
    </StudentProcessContext.Provider>
  );
}
