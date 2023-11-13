import * as UserActions from "./user.actions";
import { Action, createReducer, on } from "@ngrx/store";

export const userFeatureKey = "user";

export interface UserState {
  isAdmin: boolean;
  name: string;
}

const initialState: UserState = {
  isAdmin: false,
  name: "",
};

const reducer = createReducer(
  initialState,

  on(
    UserActions.requestCurrentUserSuccess,
    (state, action): UserState => ({
      ...state,
      isAdmin: action.user.role === "admin",
      name: action.user.name,
    })
  ),

  on(
    UserActions.requestCurrentUserFail,
    (): UserState => ({
      ...initialState,
    })
  )
);

export const userReducer = (
  state: UserState | undefined,
  action: Action
): UserState => reducer(state, action);
