declare interface WorkflowGroup {
  type: string;
  workflows: Workflow[];
}

declare interface Workflow {
  id: string;
  course: string;
  year: string;
  type: string;
  user_id: string;
  steps: Step[];
}

declare interface Step {
  id: string;
  name: string;
  description: string;
  step_number: string;
}

declare interface CreateWorlflowPayload {
  workflow_data: CreateWorlflowDataPayload;
  workflow_steps: CreateWorlflowStepPayload[];
}

declare interface CreateWorlflowDataPayload {
  course: string;
  year: string;
  type: string;
}

declare interface CreateWorlflowStepPayload {
  name: string;
  description: string;
  step_number: string;
}
