declare interface AdviserData {
  user_profile: UserProfile;
  assignments: Assignments;
}

declare interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  birth: string;
  phone_number: string;
}

declare interface Assignments {
  id: string;
  research_type_name: string;
  assignsection: Assignsection[];
}

declare interface Assignsection {
  section: string;
  course: string;
}
