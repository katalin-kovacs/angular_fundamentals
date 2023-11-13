import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  @Input() placeholder?: string = "Enter course";
  @ViewChild("searchForm") form!: NgForm;
  @Output() searchEvent = new EventEmitter<string>();
  searchCourse() {
    this.searchEvent.emit(this.form.value.search);
  }
  constructor() {}

  ngOnInit(): void {}
}
