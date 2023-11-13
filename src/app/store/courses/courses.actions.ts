import { createAction, props } from "@ngrx/store";
import { Author } from "src/app/shared/types/author.interface";
import { Course, NewCourse } from "src/app/shared/types/course.interface";

export const requestAllCourses = createAction(
  "[Course] Get All Courses Request"
);
export const requestAllCoursesSuccess = createAction(
  "[Course] Get All Courses Success",
  props<{ courses: Course[] }>()
);

export const requestAllCoursesFail = createAction(
  "[Course] Get All Courses Fail",
  props<{ errorMessage: string }>()
);

export const requestSingleCourse = createAction(
  "[Course] Get Single Course Request",
  props<{ id: string }>()
);

export const requestSingleCourseSuccess = createAction(
  "[Course] Get Single Courses Success",
  props<{ course: Course }>()
);

export const requestSingleCourseFail = createAction(
  "[Course] Get Single Courses Fail",
  props<{ errorMessage: string }>()
);

export const requestFilteredCourses = createAction(
  "[Course] Get Filtered Courses Request",
  props<{ searchValue: string }>()
);

export const requestFilteredCoursesSuccess = createAction(
  "[Course] Get Filtered Courses Success",
  props<{ courses: Course[] }>()
);

export const requestFilteredCoursesFail = createAction(
  "[Course] Get Filtered Courses Request",
  props<{ errorMessage: string }>()
);

export const requestDeleteCourse = createAction(
  "[Course] Delete Course",
  props<{ id: string }>()
);

export const requestDeleteCourseSuccess = createAction(
  "[Course] Delete Course Fail",
  props<{ id: string }>()
);

export const requestDeleteCourseFail = createAction(
  "[Course] Delete Course Fail",
  props<{ errorMessage: string }>()
);

export const requestEditCourse = createAction(
  "[Course] Edit Course Request",
  props<{ id: string; course: NewCourse }>()
);

export const requestEditCourseSuccess = createAction(
  "[Course] Edit Course Success",
  props<{ course: Course }>()
);

export const requestEditCourseFail = createAction(
  "[Course] Edit Course Fail",
  props<{ errorMessage: string }>()
);

export const requestCreateCourse = createAction(
  "[Course] Create Courses Request",
  props<{ course: NewCourse }>()
);

export const requestCreateCourseSuccess = createAction(
  "[Course] Create Course Success",
  props<{ course: Course }>()
);

export const requestCreateCourseFail = createAction(
  "[Course] Create Course Fail",
  props<{ errorMessage: string }>()
);
