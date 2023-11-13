import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appTogglePassword]",
})
export class TogglePasswordDirective {
  private _shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute("type", "text");
      span.innerHTML = '<i class="fa-regular fa-eye"></i>';
    } else {
      this.el.nativeElement.setAttribute("type", "password");
      span.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    }
  }

  setup() {
    const parent = this.el.nativeElement.parentNode;
    const input = this.el.nativeElement;
    const span = document.createElement("span");
    span.setAttribute("class", "password-toggle");
    span.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    span.addEventListener("click", (event) => {
      this.toggle(span);
    });
    //parent.appendChild(span);
    //inputNode.parentNode.insertBefore(spanTag, inputNode.nextSibling);
    parent.insertBefore(span, this.el.nativeElement.nextSibling);
  }
}
