import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type StudentProcessContextProps = {
  research_type: string;

  studentWorkflowPayload: StudentWorkflowPayload;
  setStudentWorkflowPayload: Dispatch<SetStateAction<StudentWorkflowPayload>>;
};

export interface StudentWorkflowPayload {
  workflow_data?: StudentWorkflowDataPayload;
  workflow_steps?: StudentWorkflowStepPayload[];
}

export interface StudentWorkflowDataPayload {
  type: string;
  class_id: string[];
}

export interface StudentWorkflowStepPayload {
  name: string;
  description: string;
}

export const StudentProcessContext = createContext<StudentProcessContextProps>({
  research_type: '',

  studentWorkflowPayload: {},
  setStudentWorkflowPayload: () => {},
});

export const useStudentProcessContext = () => useContext(StudentProcessContext);
