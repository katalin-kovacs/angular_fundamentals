import { Pipe, PipeTransform } from "@angular/core";
import { mockedAuthorsList } from "../mocks/mock";

@Pipe({
  name: "authors",
})
export class AuthorsPipe implements PipeTransform {
  transform(authorIds: string[]): string {
    const authorNames = authorIds.map((authorId) => {
      const author = mockedAuthorsList.find((a) => a.id === authorId);
      return author ? author.name : "Unknown Author";
    });

    return authorNames.join(", ");
  }
}
