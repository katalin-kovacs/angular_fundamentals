import { Injectable } from "@angular/core";
import { Router, CanLoad, Route, UrlSegment, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthorized$.pipe(
      map((data) => {
        if (!data) {
          return this.router.createUrlTree(["/login"]);
        }
        return true;
      })
    );
  }
}
