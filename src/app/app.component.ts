import { Component } from "@angular/core";
import { mockedCoursesList } from "./shared/mocks/mock";
import { Router } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";
import { Observable } from "rxjs";
import { UserStoreService } from "./user/services/user-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  isAuth$!: Observable<boolean>;
  user$!: Observable<string>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.user$ = this.userStoreService.name$;
    this.isAuth$ = this.authService.isAuthorized$;
  }

  courseInfoData = mockedCoursesList[0];

  logOut() {
    this.authService.logout().subscribe();
  }
}
