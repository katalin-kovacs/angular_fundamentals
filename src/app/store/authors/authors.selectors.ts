import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthorsState, authorsFeatureKey } from "./authors.reducer";

const getAuthorsState = createFeatureSelector<AuthorsState>(authorsFeatureKey);

export const getAuthors = createSelector(
  getAuthorsState,
  (state: AuthorsState) => state.authors
);
export const getAddedAuthor = createSelector(
  getAuthorsState,
  (state: AuthorsState) => state.addedAuthor
);
