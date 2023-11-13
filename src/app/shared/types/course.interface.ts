export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number | string;
  authors: string[];
}

export interface NewCourse extends Omit<Course, "id" | "creationDate"> {}
