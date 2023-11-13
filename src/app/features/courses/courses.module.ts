import { NgModule } from "@angular/core";
import { CourseCardComponent } from "./course-card/course-card.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { CoursesStoreService } from "src/app/services/courses-store.service";
import { AuthorsStoreService } from "src/app/services/authors-store.service";
import { CoursesRoutingModule } from "./courses-routing.module";
import { RouterModule } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseModule } from "../course/course.module";
import { CoursesStateFacade } from "src/app/store/courses/courses.facade";
import { AuthorsStateFacade } from "src/app/store/authors/authors.facade";
import { CourseListComponent } from "./courses-list/courses-list.component";

@NgModule({
  declarations: [CourseListComponent, CourseCardComponent, CoursesComponent],

  imports: [CommonModule, SharedModule, CoursesRoutingModule, CourseModule],

  exports: [CourseCardComponent, CourseListComponent, RouterModule],

  providers: [
    CoursesStoreService,
    AuthorsStoreService,
    CoursesStateFacade,
    AuthorsStateFacade,
  ],
})
export class CoursesModule {}
