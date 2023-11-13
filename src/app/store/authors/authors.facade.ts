import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthorsActions from "./authors.actions";
import * as AuthorsSelectors from "./authors.selectors";

@Injectable()
export class AuthorsStateFacade {
  public authors$ = this.store.select(AuthorsSelectors.getAuthors);
  public addedAuthor$ = this.store.select(AuthorsSelectors.getAddedAuthor);

  constructor(private store: Store) {
    this.getAuthors();
  }

  getAuthors() {
    this.store.dispatch(AuthorsActions.requestAuthors());
  }

  addAuthor(author: { name: string }) {
    this.store.dispatch(AuthorsActions.requestAddAuthor(author));
  }
}
