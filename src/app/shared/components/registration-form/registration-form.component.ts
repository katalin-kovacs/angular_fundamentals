import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from "@angular/forms";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  formSubmitted = false;
  registerBtnText = "Register";

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required, this.emailValidator]),
      password: new FormControl("", [Validators.required]),
    });
  }

  emailValidator(control: FormControl): ValidationErrors | null {
    // If the control is empty, don't perform validation.
    if (!control.value) {
      return null;
    }

    // Regular expression for a simple email validation.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Validation failed.
    if (!emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }

    // Validation passed.
    return null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.formSubmitted = true;
      console.log("Form submitted: ", this.registrationForm.value);
    }
  }
}
