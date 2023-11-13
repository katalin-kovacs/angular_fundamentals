import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { CoursesService } from "src/app/services/courses.service";
import { NewCourse } from "src/app/shared/types/course.interface";
import * as CoursesActions from "./courses.actions";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),

      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) =>
            CoursesActions.requestAllCoursesSuccess({ courses })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestAllCoursesFail({
                errorMessage: error.result,
              })
            )
          )
        )
      )
    );
  });

  getSpecificCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),

      exhaustMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map((course) => {
            return CoursesActions.requestSingleCourseSuccess({ course });
          }),
          catchError((error) =>
            of(
              CoursesActions.requestSingleCourseFail({
                errorMessage: error.result,
              })
            )
          )
        )
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),

      exhaustMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map((course) =>
            CoursesActions.requestCreateCourseSuccess({ course: course.result })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestCreateCourseFail({
                errorMessage: error.result,
              })
            )
          )
        )
      )
    );
  });

  editCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),

      exhaustMap(({ id, course }) =>
        this.coursesService.editCourse(id, course).pipe(
          map((course) =>
            CoursesActions.requestEditCourseSuccess({ course: course })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestEditCourseFail({
                errorMessage: error.result,
              })
            )
          )
        )
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),

      exhaustMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => CoursesActions.requestDeleteCourseSuccess({ id })),
          catchError((error) =>
            of(
              CoursesActions.requestDeleteCourseFail({
                errorMessage: error.result,
              })
            )
          )
        )
      )
    );
  });

  filteredCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),

      exhaustMap(({ searchValue }) =>
        this.coursesService.getAllFiltered(searchValue).pipe(
          map((courses) =>
            CoursesActions.requestFilteredCoursesSuccess({ courses })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestFilteredCoursesFail({
                errorMessage: error.result,
              })
            )
          )
        )
      )
    );
  });
}
