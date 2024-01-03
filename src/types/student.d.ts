
declare interface ProfileCardsContainer {
  id: string;
  course: string;
  students: Student[];
}

declare interface Student {
  id: string
  username: string
  email: string
  student_id: string
  student_number: string
  name: string
  section: string
  course: string
}


declare interface StudentWorkflowProcess {
  id: string
  type: string
  class_id: string
  section: string
  course: string
  user_id: string
  steps: StudentWorkflowStep[]
}

declare interface StudentWorkflowStep {
  id: string
  name: string
  description: string
  step_number: number
}

declare interface GetSWFByResearchType {
  id: string
  type: string
  user_id: string
  class_: GetSWFByResearchTypeClass[]
  steps: GetSWFByResearchTypeStep[]
}

declare interface GetSWFByResearchTypeClass {
  id: string
  class_id: string
  section: string
  course: string
}

declare interface GetSWFByResearchTypeStep {
  id: string
  name: string
  description: string
}