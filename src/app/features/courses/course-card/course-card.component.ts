import { Component, OnInit, Input } from "@angular/core";
import { Course } from "../../../shared/types/course.interface";
import { AuthorsStoreService } from "src/app/services/authors-store.service";
import { Author } from "../../../shared/types/author.interface";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Input() isEditable!: boolean;
  allAuthor!: Author[];
  authorList(authorList: Array<string>, allAuthor: Array<Author>) {
    return allAuthor
      .filter((author) => authorList.includes(author.id))
      .map((author) => ` ${author.name}`);
  }
  constructor(private authorStore: AuthorsStoreService) {}

  ngOnInit(): void {
    this.authorStore.authors$.subscribe((data) => (this.allAuthor = data));
  }
}
