import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Author } from "../shared/types/author.interface";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthorsService {
  private url = "http://localhost:4000/authors/";
  constructor(private httpClient: HttpClient) {}
  getAll() {
    return this.httpClient
      .get<{ successful: boolean; result: Author[] }>(`${this.url}all`)
      .pipe(map((response) => response.result));
  }
  addAuthor(author: { name: Author["name"] }) {
    return this.httpClient
      .post<{ successful: boolean; result: Author }>(`${this.url}add`, author)
      .pipe(map((response) => response.result));
  }
}
