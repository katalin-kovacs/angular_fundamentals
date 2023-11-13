import { createAction, props } from "@ngrx/store";

import { Author } from "src/app/shared/types/author.interface";

export const requestAuthors = createAction("[Author] Get Authors Request");
export const requestAuthorsSuccess = createAction(
  "[Author] Get Authors Success",
  props<{ authors: Author[] }>()
);

export const requestAuthorFail = createAction("[Author] Get Authors Fail");

export const requestAddAuthor = createAction(
  "[Author] Add Author Request",
  props<{ name: Author["name"] }>()
);

export const requestAddAuthorSuccess = createAction(
  "[Author] Add Author Success",
  props<{ author: Author }>()
);

export const requestAddAuthorFail = createAction("[Author] Add Author Fail");

export const resetAddedAuthor = createAction("[Author] Reset Added Author");
