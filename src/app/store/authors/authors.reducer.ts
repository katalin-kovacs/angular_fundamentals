import * as AuthorsActions from "./authors.actions";
import { Action, createReducer, on } from "@ngrx/store";
import { Author } from "src/app/shared/types/author.interface";

export const authorsFeatureKey = "authors";
export interface AuthorsState {
  authors: Author[];
  addedAuthor?: Author;
}

const initialState: AuthorsState = {
  authors: [],
};

const reducer = createReducer(
  initialState,
  on(
    AuthorsActions.requestAuthors,
    AuthorsActions.requestAddAuthor,
    AuthorsActions.requestAddAuthorFail,
    AuthorsActions.requestAuthorFail,

    (state): AuthorsState => ({
      ...state,
    })
  ),

  on(
    AuthorsActions.requestAuthorsSuccess,
    (state, action): AuthorsState => ({
      ...state,
      authors: action.authors,
    })
  ),

  on(
    AuthorsActions.requestAddAuthorSuccess,
    (state, action): AuthorsState => ({
      ...state,
      authors: [...state.authors, action.author],
      addedAuthor: action.author,
    })
  ),

  on(
    AuthorsActions.resetAddedAuthor,
    (state): AuthorsState => ({
      ...state,
      addedAuthor: undefined,
    })
  )
);

export const authorsReducer = (
  state: AuthorsState | undefined,
  action: Action
): AuthorsState => reducer(state, action);
