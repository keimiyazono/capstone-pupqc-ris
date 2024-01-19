import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import type { Assignsection } from '../../hooks/use-faculty-process';



export type FacultyWorkflowContextProps = {
  researchType: string;
  setResearchType: Dispatch<SetStateAction<string>>;

  selectedProcess: Assignsection | null;
  setSelectedProcess: Dispatch<SetStateAction<Assignsection | null>>;
};

export const FacultyWorkflowContext =
  createContext<FacultyWorkflowContextProps>({
    researchType: '',
    setResearchType: () => {},

    selectedProcess: null,
    setSelectedProcess: () => {},
  });

export const useFacultyWorkflowContext = () =>
  useContext(FacultyWorkflowContext);
