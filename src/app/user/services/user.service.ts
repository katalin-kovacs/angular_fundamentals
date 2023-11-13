import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { User } from "src/app/shared/types/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = "http://localhost:4000/users/me";
  constructor(private httpClient: HttpClient) {}
  getUser() {
    return this.httpClient
      .get<{ successful: boolean; result: User }>(`${this.url}`)
      .pipe(map((response) => response.result));
  }
}
