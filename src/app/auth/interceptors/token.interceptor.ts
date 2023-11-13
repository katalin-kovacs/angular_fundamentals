import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { SessionStorageService } from "../services/session-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.sessionStorageService.getToken();
    let httpReq = request;

    if (token) {
      httpReq = request.clone({
        headers: request.headers.set("Authorization", token),
      });
    }

    return next.handle(httpReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 401) {
          this.authService.logout();
          this.router.navigate(["/login"]);
        }
      })
    );
  }
}
