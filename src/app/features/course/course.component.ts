import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthorsStoreService } from "src/app/services/authors-store.service";
import { Author } from "../../shared/types/author.interface";
import { CoursesStoreService } from "src/app/services/courses-store.service";
import { Course, NewCourse } from "../../shared/types/course.interface";
import { IconName } from "@fortawesome/free-solid-svg-icons";
// import { AuthorsStateFacade } from "src/app/store/authors/authors.facade";
// import { CoursesStateFacade } from "src/app/store/courses/courses.facade";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  id?: string;
  Xmark: IconName = "xmark";
  submitted = false;
  courseForm!: FormGroup;
  allAuthor!: Author[];
  editCourse!: Course;
  isEdit!: boolean;
  isCreate!: boolean;
  // course$ = this.coursesStateFacade.course$;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authorStoreService: AuthorsStoreService,
    private coursesService: CoursesStoreService // private authorsStateFacade: AuthorsStateFacade, // private coursesStateFacade: CoursesStateFacade,
  ) {}

  get title() {
    return this.courseForm.get("title");
  }
  get description() {
    return this.courseForm.get("description");
  }
  get duration() {
    return this.courseForm.get("duration");
  }
  get authorName() {
    return this.courseForm.get("authorName");
  }
  get authorsForms() {
    return this.courseForm.get("authors") as FormArray;
  }
  authorFormat(authorName: string) {
    return this.allAuthor
      .filter((author: Author) => author.id.includes(authorName))
      .map((author) => author.name)
      .toString();
  }
  onSubmit(): void {
    this.submitted = true;
    this.authorStoreService.authors$.subscribe(
      // this.authorsStateFacade.authors$.subscribe(
      (authors) => {
        authors = this.authorsForms.value.map((authorName: string) => {
          authors
            .filter((author: Author) => author.name.includes(authorName))
            .map((author: Author) => author.id);
        });
      }
    );
    const newCourse: NewCourse = {
      title: this.courseForm.value.title,
      description: this.courseForm.value.description,
      duration: this.courseForm.value.duration,
      authors: this.courseForm.value.authors.map(
        (author: { author: string }) => author.author
      ),
    };
    if (this.id) {
      this.coursesService.editCourse(this.id, newCourse).subscribe();
      // this.coursesStateFacade.editCourse(newCourse, this.id)
    } else {
      this.coursesService.createCourse(newCourse);
      // this.coursesStateFacade.createCourse(newCourse);
    }
    this.router.navigate(["/courses"]);
  }
  onAddAuthor(authorName: AbstractControl | null): void {
    const author = authorName?.value;
    if (authorName !== null && author.length > 0) {
      this.authorsForms.clear();
      this.authorStoreService.addAuthor({ name: author });
      // this.authorsStateFacade.addAuthor({name: author})
    }
  }
  handleCancel() {
    this.router.navigate([`courses`]);
  }
  addAuthor(authorId: string) {
    const author = this.fb.control({
      author: authorId as string,
    });
    this.authorsForms.push(author);
  }
  deleteAuthor(i: number) {
    this.authorsForms.removeAt(i);
  }
  ngOnInit(): void {
    this.isCreate = location.pathname.includes("/courses/add");
    this.isEdit = location.pathname.includes("/courses/edit");
    if (
      location.pathname.includes("/courses/") &&
      !location.pathname.includes("add")
    ) {
      this.route.params.subscribe((params: Params) => {
        this.id = params["id"];
      });
    }
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: ["", [Validators.required, Validators.min(1)]],
      authorName: [
        "",
        [Validators.pattern("[0-9a-zA-Z]*"), Validators.required],
      ],
      authors: this.fb.array([]),
    });
    // this.authorsStateFacade.authors$.subscribe(
    this.authorStoreService.authors$.subscribe((data) => {
      this.allAuthor = data;
      data.map((author: Author) => {
        this.addAuthor(author.id);
      });
    });
    if (this.id) {
      if (!this.isCreate) {
        // this.coursesStateFacade.allCourses$.subscribe(
        this.coursesService.courses$.subscribe(
          // this.coursesStateFacade.getSingleCourse(this.id)
          // this.coursesStateFacade.course$.subscribe(
          (courses) => {
            courses.map((course: Course) => {
              // (course) => {
              //   if(course.id === this.id){
              (course: any) => {
                if (course) {
                  this.courseForm = this.fb.group({
                    title: [
                      {
                        value: course.title,
                        disabled: !this.isEdit && !this.isCreate,
                      },
                      [Validators.required, Validators.minLength(2)],
                    ],
                    description: [
                      {
                        value: course.description,
                        disabled: !this.isEdit && !this.isCreate,
                      },
                      [Validators.required, Validators.minLength(2)],
                    ],
                    duration: [
                      {
                        value: course.duration,
                        disabled: !this.isEdit && !this.isCreate,
                      },
                      [Validators.required, Validators.min(1)],
                    ],
                    authorName: [
                      {
                        value:
                          !this.isEdit && !this.isCreate
                            ? "Cannot create new author"
                            : "",
                        disabled: !this.isEdit && !this.isCreate,
                      },
                      [Validators.pattern("[0-9a-zA-Z]*")],
                    ],
                    authors: this.fb.array([]),
                  });
                  course.authors.map((author: string) => {
                    this.addAuthor(author);
                  });
                }
              };
            });
          }
        );
      }
    }
  }
}
