declare interface AdminFacultyWithRoles {
  id: string;
  username: string;
  email: string;
  faculty_name: string;
  role_names: string[];
}

declare interface AssignProfToSection {
  id: string;
  user_id: string;
  professor_name: string;
  section: string;
  course: string;
}

declare interface ProfWithAssign {
  id: string;
  username: string;
  email: string;
  faculty_name: string;
  assignments: Array<{
    class_id: string
    section: string;
    course: string;
    id: string;
  }>;
}
