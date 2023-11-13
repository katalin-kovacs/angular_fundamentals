import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Course, NewCourse } from "../shared/types/course.interface";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private url = "http://localhost:4000/courses/";
  constructor(private httpClient: HttpClient) {}
  getAll() {
    return this.httpClient
      .get<{ successful: boolean; result: Course[] }>(`${this.url}all`)
      .pipe(map((response) => response.result));
  }
  getAllFiltered(searchValue: string) {
    if (searchValue === "") {
      return this.getAll();
    }
    return this.httpClient
      .get<{ successful: boolean; result: Course[] }>(
        `${this.url}filter?title=${searchValue}`
      )
      .pipe(
        map((response) => {
          console.log(response);
          return response.result;
        })
      );
  }
  createCourse(course: NewCourse) {
    return this.httpClient
      .post<{ successful: boolean; result: Course }>(`${this.url}add`, course)
      .pipe(map((response) => response));
  }
  getCourse(id: string) {
    return this.httpClient
      .get<{ successful: boolean; result: Course }>(`${this.url}${id}`)
      .pipe(map((response) => response.result));
  }
  deleteCourse(id: string) {
    return this.httpClient
      .delete(`${this.url}${id}`)
      .pipe(map((response) => response));
  }
  editCourse(id: string, course: NewCourse) {
    return this.httpClient
      .put<{ successful: boolean; result: Course }>(`${this.url}${id}`, course)
      .pipe(map((response) => response.result));
  }
}
