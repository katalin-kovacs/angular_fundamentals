import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AuthorsService } from "src/app/services/authors.service";
import * as AuthorsActions from "./authors.actions";

@Injectable()
export class AuthorsEffects {
  constructor(
    private actions$: Actions,
    private authorsService: AuthorsService
  ) {}

  getAuthors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthorsActions.requestAuthors),
      exhaustMap(() =>
        this.authorsService.getAll().pipe(
          map((authors) => AuthorsActions.requestAuthorsSuccess({ authors })),
          catchError(() => of(AuthorsActions.requestAuthorFail()))
        )
      )
    );
  });

  addAuthor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthorsActions.requestAddAuthor),
      exhaustMap((author: { name: string }) =>
        this.authorsService.addAuthor(author).pipe(
          map((author) => AuthorsActions.requestAddAuthorSuccess({ author })),
          catchError(() => of(AuthorsActions.requestAddAuthorFail()))
        )
      )
    );
  });
}
