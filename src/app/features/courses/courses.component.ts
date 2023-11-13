import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { ModalComponent } from "src/app/shared/components";
import { Course } from "../../shared/types/course.interface";
//import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { map, Observable } from "rxjs";
import { Router } from "@angular/router";
//import { UserStoreService } from 'src/app/user/services/user-store.service';
import { UserStateFacade } from "src/app/user/store/user.facade";
import { CoursesStateFacade } from "src/app/store/courses/courses.facade";
import { AuthorsStateFacade } from "src/app/store/authors/authors.facade";
@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
  /*providers: [
    CoursesStoreService,
  ]*/
})
export class CoursesComponent implements OnInit {
  infoTitle = "Your list is empty";
  infoText = `Please use 'Add new course' button to add your first course`;
  modalTest = "Modal";
  newCourse = "Add new course";
  searchTerm: string = "";
  courses!: Array<Course>;
  filteredList: Array<Course> = this.courses;
  message?: string;
  isAdmin: boolean = false;

  isloading = this.coursesStateFacade.isAllCoursesLoading$;

  constructor(
    //private coursesStore: CoursesStoreService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router,
    //private userStoreService : UserStoreService,
    private userStateFacade: UserStateFacade,
    private authorsStateFacade: AuthorsStateFacade
  ) {
    //this.userStoreService.getUser()
    this.userStateFacade.getCurrentUser();
  }

  findCourse($event: any) {
    this.searchTerm = $event;
    this.coursesStateFacade.getFilteredCourses(this.searchTerm);
    this.coursesStateFacade.courses$.subscribe(
      (courses) => (this.filteredList = courses)
    );
    this.message = `Searched term: ${this.searchTerm}`;
    this.modal.open();
    //this.filteredList = this.courses.filter(course => course.title.toLocaleLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  @ViewChild("modal", { static: false }) modal!: ModalComponent;
  @Output() click = new EventEmitter<MouseEvent>();

  addNewCourse() {
    this.router.navigate([`courses/add`]);
  }

  ngOnInit(): void {
    //this.coursesStore.courses$.subscribe(
    this.coursesStateFacade.allCourses$.subscribe((data) => {
      this.courses = data;
      this.filteredList = data;
    });
    this.userStateFacade.isAdmin$.subscribe(
      //this.userStoreService.isAdmin$.subscribe(
      (data) => (this.isAdmin = data)
    );
  }
}
