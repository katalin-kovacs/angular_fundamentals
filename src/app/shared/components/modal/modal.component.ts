import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  faXmark = faXmark;
  @Input() title: string = "Message";
  @Input() message?: string = "Message Text";
  @Input() okButtonText?: string = "Ok";
  @Input() cancelButtonText?: string = "Close";
  @ViewChild("myModal", { static: false }) modal!: ElementRef;

  open() {
    this.modal.nativeElement.style.display = "block";
  }

  close() {
    this.modal.nativeElement.style.display = "none";
  }
  constructor() {}

  ngOnInit(): void {}
}
