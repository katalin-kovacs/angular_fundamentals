import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() course: any;

  @Output() goBack = new EventEmitter<void>();

  backBtnText = "Back";

  handleGoBack() {
    console.log("Back");
    this.goBack.emit();
  }
}
