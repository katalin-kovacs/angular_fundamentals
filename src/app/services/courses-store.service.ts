import { Injectable } from "@angular/core";
import { CoursesService } from "./courses.service";
import { Observable, BehaviorSubject } from "rxjs";
import { Course, NewCourse } from "../shared/types/course.interface";
import { tap, finalize, catchError, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Array<Course>>([]);
  public isLoading$: Observable<any> = this.isLoading$$.asObservable();
  public courses$: Observable<any> = this.courses$$.asObservable();
  getAll() {
    this.service.getAll().subscribe(
      (data) => {
        this.courses$$.next(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
    this.isLoading$$.next(true);
  }
  createCourse(course: NewCourse) {
    this.service.createCourse(course).subscribe(
      (data) => {
        //this.courses$$.next([...this.courses$$.getValue(), data.result]);
        data.result;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
    this.isLoading$$.next(true);
  }
  getCourse(id: string) {
    return this.service.getCourse(id).pipe(
      tap((data) => {
        this.courses$$.next([data as Course]);
      }),
      catchError((error) => error),
      finalize(() => {
        this.isLoading$$.next(false);
      })
    );
  }
  deleteCourse(id: string) {
    this.service.deleteCourse(id).subscribe(
      (data) => {
        console.log(data);
        this.courses$$.next([
          ...this.courses$$.getValue().filter((course) => course.id != id),
        ]);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
    this.isLoading$$.next(true);
  }
  editCourse(id: string, newCourse: NewCourse) {
    this.isLoading$$.next(true);
    return this.service.editCourse(id, newCourse).pipe(
      tap((data) => {
        console.log(data);
        let courses = this.courses$$
          .getValue()
          .filter((course) => course.id !== id);
        this.courses$$.next([...courses, data as Course]);
      }),
      catchError((err) => of(`Error: ${err}`)),
      finalize(() => {
        this.isLoading$$.next(false);
      })
    );
  }
  constructor(private service: CoursesService) {
    this.getAll();
  }
}
