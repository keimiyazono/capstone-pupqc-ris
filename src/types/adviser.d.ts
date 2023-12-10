declare interface AdviserDataGroup {
  research_type_name: string
  list: AdviserData[]
}

declare interface AdviserData {
  user_profile: UserProfile
  assignments: Assignment[]
}

declare interface UserProfile {
  id: string
  username: string
  email: string
  name: string
  birth: string
  phone_number: string
}

declare interface Assignment {
  research_type_name: string
  assignsection: Assignsection[]
}

declare interface Assignsection {
  section: string
  course: string
}

declare interface PostAssignAdviserPayload {
  assign_research_type: PostAssignResearchTypePayload
  assign_section: PostAssignSectionPayload[]
}

declare interface PostAssignResearchTypePayload {
  user_id: string
  research_type_name: string
}

declare interface PostAssignSectionPayload {
  section: string
  course: string
}


declare interface PutAssignAdviserPayload {
  user_id: string;
  assignresearchtype: PutAssignresearchtypePayload
  assignsection: PutAssignsectionPayload[]
}

declare interface PutAssignresearchtypePayload {
  research_type_name: string
}

declare interface PutAssignsectionPayload {
  section: string
  course: string
}
