import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as UserActions from "./user.actions";
import * as UserSelectors from "./user.selectors";

@Injectable()
export class UserStateFacade {
  public name$ = this.store.select(UserSelectors.getName);
  public isAdmin$ = this.store.select(UserSelectors.isAdmin);

  constructor(private store: Store) {}

  getCurrentUser() {
    this.store.dispatch(UserActions.requestCurrentUser());
  }
}
