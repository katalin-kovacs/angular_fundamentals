import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState, userFeatureKey } from "./user.reducer";

const getUserState = createFeatureSelector<UserState>(userFeatureKey);

export const getName = createSelector(
  getUserState,
  (state: UserState) => state.name
);
export const isAdmin = createSelector(
  getUserState,
  (state: UserState) => state.isAdmin
);
