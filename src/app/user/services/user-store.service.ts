import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  private name$$ = new BehaviorSubject<string>("");
  public isAdmin$: Observable<any> = this.isAdmin$$.asObservable();
  public name$: Observable<any> = this.name$$.asObservable();
  getUser() {
    this.userService.getUser().subscribe(
      (data) => {
        this.name$$.next(data.name);
        data.role === "admin"
          ? this.isAdmin$$.next(true)
          : this.isAdmin$$.next(false);
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }
  clearUser(): void {
    this.name$$.next("");
    this.isAdmin$$.next(false);
  }

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.isAuthorized$.subscribe((data) => {
      if (data === true) {
        this.getUser();
      }
    });
  }
}
