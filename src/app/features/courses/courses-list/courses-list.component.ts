import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { Course } from "../../../shared/types/course.interface";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { CoursesStoreService } from "src/app/services/courses-store.service";
import { CoursesStateFacade } from "src/app/store/courses/courses.facade";
import { ModalComponent } from "src/app/shared/components";
import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
@Component({
  selector: "app-course-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CourseListComponent implements OnInit {
  showCourse = "Show Course";
  faPen = faPen;
  faTrashCan = faTrashCan;

  @Input() courseList: Array<Course> | null | undefined;
  @Input() isEditable!: boolean;
  @Output() click = new EventEmitter<MouseEvent>();
  @ViewChild("modal", { static: false }) modal!: ModalComponent;

  handleDelete(course: Course) {
    this.modal.open();
    const ok =
      document.getElementById("myModal")?.firstChild?.lastChild?.lastChild
        ?.firstChild;
    if (ok) {
      ok.addEventListener("click", (e) => {
        this.courseStoreService.deleteCourse(course.id);
        // this.coursesStateFacade.deleteCourse(course.id)
      });
    }
  }
  handleShow(course: Course) {
    let id = course.id;
    this.router.navigate([`courses/${id}`]);
  }
  handleEdit(course: Course) {
    let id = course.id;
    this.router.navigate([`courses/edit/${id}`]);
  }
  constructor(
    @Inject(DOCUMENT) document: Document,
    private router: Router,
    private courseStoreService: CoursesStoreService // private coursesStateFacade : CoursesStateFacade,
  ) {
    this.isEditable = true;
  }

  ngOnInit(): void {}
}
