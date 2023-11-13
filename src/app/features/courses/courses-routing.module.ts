import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminGuard } from "src/app/user/guards/admin.guard";
import { CourseComponent } from "../course/course.component";
import { CoursesComponent } from "./courses.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: CoursesComponent,
  },
  {
    path: "add",
    canActivate: [AdminGuard],
    component: CourseComponent,
  },
  {
    path: "edit/:id",
    canActivate: [AdminGuard],
    component: CourseComponent,
  },
  {
    path: ":id",
    component: CourseComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
