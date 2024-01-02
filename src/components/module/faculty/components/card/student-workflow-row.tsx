'use client';

import { useState } from 'react';
import {
  StudentProcessContext,
  StudentWorkflowPayload,
} from '../context/process';
import { StudentWorkflow } from './student-workflow';
import { WorkflowSections } from './workflow-sections';

export interface StudentWorkflowRowProps {
  research_type: string;
}

export function StudentWorkflowRow({ research_type }: StudentWorkflowRowProps) {
  const [studentWorkflowPayload, setStudentWorkflowPayload] =
    useState<StudentWorkflowPayload>({});

  return (
    <StudentProcessContext.Provider
      value={{
        research_type,
        studentWorkflowPayload,
        setStudentWorkflowPayload,
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
