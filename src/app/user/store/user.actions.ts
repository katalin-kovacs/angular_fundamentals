import { createAction, props } from "@ngrx/store";
import { User } from "src/app/shared/types/user.interface";

export const requestCurrentUser = createAction("[User] Get User Request");

export const requestCurrentUserSuccess = createAction(
  "[User] Get User Success",
  props<{ user: User }>()
);

export const requestCurrentUserFail = createAction("[User] Get User Fail");
