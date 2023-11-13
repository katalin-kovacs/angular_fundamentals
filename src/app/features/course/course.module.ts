import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { CourseComponent } from "./course.component";

@NgModule({
  declarations: [CourseComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule],
})
export class CourseModule {}
