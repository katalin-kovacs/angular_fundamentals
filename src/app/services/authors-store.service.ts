import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Author } from "../shared/types/author.interface";
import { AuthorsService } from "./authors.service";

@Injectable({
  providedIn: "root",
})
export class AuthorsStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private authors$$ = new BehaviorSubject<Array<Author>>([]);
  public isLoading$: Observable<any> = this.isLoading$$.asObservable();
  public authors$: Observable<any> = this.authors$$.asObservable();
  getAll() {
    this.authorService.getAll().subscribe(
      (data) => {
        this.authors$$.next(data);
      },
      () => {},
      () => {
        this.isLoading$$.next(false);
      }
    );
    this.isLoading$$.next(true);
  }
  /*
  addAuthor(author: {name: Author['name']}){
    return this.authorService.addAuthor(author)
  }
  */
  addAuthor(author: { name: Author["name"] }) {
    this.authorService.addAuthor(author).subscribe(
      (data) => {
        this.authors$$.next([...this.authors$$.getValue(), data]);
        //data
      },
      () => {},
      () => {
        this.isLoading$$.next(false);
      }
    );
  }

  constructor(private authorService: AuthorsService) {
    this.getAll();
  }
}
