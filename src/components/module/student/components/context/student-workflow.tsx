import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type StudentWorkflowContextProps = {
  researchType: string;
  setResearchType: Dispatch<SetStateAction<string>>;
};

export const StudentWorkflowContext =
  createContext<StudentWorkflowContextProps>({
    researchType: '',
    setResearchType: () => {},
  });

export const useStudentWorkflowContext = () =>
  useContext(StudentWorkflowContext);
