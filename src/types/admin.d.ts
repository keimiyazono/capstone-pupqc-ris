declare interface AdminFacultyWithRoles {
  id: string
  username: string
  email: string
  faculty_name: string
  role_names: string[]
}

declare interface AssignProfToSection {
  id: string
  user_id: string
  professor_name: string
  section: string
  course: string
}


declare interface ProfWithAssign {
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
  id: string
  research_type_name: string
  assignsection: Assignsection[]
}

declare interface Assignsection {
  id: string
  section: string
  course: string
}