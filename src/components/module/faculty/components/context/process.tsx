import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type StudentProcessContextProps = {
  research_type: string;

  workflowIds: string[];
  setWorkflowIds: Dispatch<SetStateAction<string[]>>;

  studentWorkflowDatas: StudentWorkflowData[];
  setStudentWorkflowDatas: Dispatch<SetStateAction<StudentWorkflowData[]>>;

  studentWorkflowSteps: StudentWorkflowStep[];
  setStudentWorkflowSteps: Dispatch<SetStateAction<StudentWorkflowStep[]>>;
};

export type StudentWorkflowData = {
  course: string;
  year: string;
  type: string;
};

export type StudentWorkflowStep = {
  name: string;
  description: string;
  step_number: number;
};

export const StudentProcessContext = createContext<StudentProcessContextProps>({
  research_type: '',

  workflowIds: [],
  setWorkflowIds: () => {},

  studentWorkflowDatas: [],
  setStudentWorkflowDatas: () => {},

  studentWorkflowSteps: [],
  setStudentWorkflowSteps: () => {},
});

export const useStudentProcessContext = () => useContext(StudentProcessContext);
