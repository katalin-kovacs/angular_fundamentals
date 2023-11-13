import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SessionStorageService } from "./session-storage.service";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  private url = "http://localhost:4000/";

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
    this.isAuthorized$.subscribe();
  }

  login(user: { email: string; password: string }) {
    return this.http.post<{ successful: boolean; result: string }>(
      `${this.url}login`,
      user
    );
  }
  logout() {
    return this.http.delete(`${this.url}logout`).pipe(
      /*tap(() => {
          this.sessionStorage.deleteToken();
          this.isAuthorized$$.next(false);
          this.router.navigate(['/login']);
        }),
        catchError((error) => {
          throw `Logout error: ${error.error}`;
        }),*/
      finalize(() => {
        this.sessionStorageService.deleteToken();
        //this.isAuthorized$$.next(false);
        this.router.navigate(["/login"]);
      })
    );
  }

  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<{ successful: boolean; result: string }>(
      `${this.url}register`,
      user
    );
  }

  get isAuthorized() {
    return this.isAuthorized$$.value;
  }

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getToken(): string | null {
    return this.sessionStorageService.getToken();
  }
}
