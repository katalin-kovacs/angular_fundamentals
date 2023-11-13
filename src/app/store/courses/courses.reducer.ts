import * as CoursesActions from "./courses.actions";
import { Action, createReducer, on } from "@ngrx/store";
import { Course } from "src/app/shared/types/course.interface";
export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[];
  courses: Course[];
  course?: Course;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage?: string;
}

const initialState: CoursesState = {
  allCourses: [],
  courses: [],
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
};

const reducer = createReducer(
  initialState,

  on(
    CoursesActions.requestAllCourses,
    CoursesActions.requestCreateCourse,
    CoursesActions.requestEditCourse,

    (state): CoursesState => ({ ...state, isAllCoursesLoading: true })
  ),

  on(
    CoursesActions.requestDeleteCourse,

    (state): CoursesState => ({
      ...state,
    })
  ),

  on(
    CoursesActions.requestAllCoursesFail,
    CoursesActions.requestCreateCourseFail,
    CoursesActions.requestDeleteCourseFail,
    CoursesActions.requestEditCourseFail,

    (state, action): CoursesState => ({
      ...state,
      isAllCoursesLoading: false,
      errorMessage: action.errorMessage,
    })
  ),

  on(
    CoursesActions.requestAllCoursesSuccess,

    (state, action): CoursesState => ({
      ...state,
      allCourses: action.courses,
      isAllCoursesLoading: false,
    })
  ),

  on(
    CoursesActions.requestCreateCourseSuccess,

    (state, action): CoursesState => ({
      ...state,
      allCourses: [...state.courses, action.course],
      course: action.course,
      isAllCoursesLoading: false,
    })
  ),

  on(
    CoursesActions.requestEditCourseSuccess,

    (state, action): CoursesState => ({
      ...state,
      allCourses: [
        ...state.allCourses.filter(({ id }) => id !== action.course.id),
        action.course,
      ],
      isAllCoursesLoading: false,
    })
  ),

  on(
    CoursesActions.requestDeleteCourseSuccess,

    (state, action): CoursesState => ({
      ...state,
      allCourses: state.allCourses.filter((course) => course.id !== action.id),
      isAllCoursesLoading: false,
    })
  ),

  on(
    CoursesActions.requestSingleCourse,

    (state): CoursesState => ({
      ...state,
      isSingleCourseLoading: true,
    })
  ),

  on(
    CoursesActions.requestSingleCourseFail,

    (state, action): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      errorMessage: action.errorMessage,
    })
  ),

  on(
    CoursesActions.requestSingleCourseSuccess,

    (state, action): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      course: action.course,
    })
  ),

  on(
    CoursesActions.requestFilteredCourses,

    (state): CoursesState => ({
      ...state,
      isSearchState: true,
    })
  ),

  on(
    CoursesActions.requestFilteredCoursesSuccess,

    (state, action): CoursesState => ({
      ...state,
      isSearchState: false,
      courses: action.courses,
    })
  ),

  on(
    CoursesActions.requestFilteredCoursesFail,

    (state, action): CoursesState => ({
      ...state,
      isSearchState: false,
      errorMessage: action.errorMessage,
    })
  )
);

export const coursesReducer = (
  state: CoursesState | undefined,
  action: Action
): CoursesState => reducer(state, action);
