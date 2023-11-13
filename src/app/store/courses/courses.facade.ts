import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { NewCourse } from "src/app/shared/types/course.interface";
import * as CoursesActions from "./courses.actions";
import * as CoursesSelectors from "./courses.selectors";

@Injectable()
export class CoursesStateFacade {
  public isAllCoursesLoading$ = this.store.select(
    CoursesSelectors.isAllCoursesLoadingSelector
  );
  public isSingleCourseLoading$ = this.store.select(
    CoursesSelectors.isSingleCourseLoadingSelector
  );
  public isSearchingState$ = this.store.select(
    CoursesSelectors.isSearchingStateSelector
  );
  public courses$ = this.store.select(CoursesSelectors.getCourses);
  public allCourses$ = this.store.select(CoursesSelectors.getAllCourses);
  public course$ = this.store.select(CoursesSelectors.getCourse);
  public errorMessage$ = this.store.select(CoursesSelectors.getErrorMessage);

  constructor(private store: Store) {
    this.getAllCourses();
  }

  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ searchValue }));
  }

  editCourse(course: NewCourse, id: string) {
    this.store.dispatch(CoursesActions.requestEditCourse({ course, id }));
  }

  createCourse(course: NewCourse) {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
