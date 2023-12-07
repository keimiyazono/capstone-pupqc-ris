
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
