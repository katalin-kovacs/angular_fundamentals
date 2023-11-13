import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { UserService } from "../services/user.service";
import * as UserActions from "./user.actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.requestCurrentUser),

      exhaustMap(() =>
        this.userService.getUser().pipe(
          map((user) => UserActions.requestCurrentUserSuccess({ user })),
          catchError(() => of(UserActions.requestCurrentUserFail()))
        )
      )
    );
  });
}
