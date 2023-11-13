import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalComponent } from "./components/modal/modal.component";
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
} from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DurationPipe } from "./pipes/duration.pipe";
import { CustomDatePipe } from "./pipes/custom-date.pipe";
import { EmailValidatorDirective } from "@shared/directives/email.directive";
import { AuthorsPipe } from "./pipes/authors.pipe";
import { LoginFormModule } from "./components/login-form/login-form.module";
import { RegistrationFormModule } from "./components/registration-form/registration-form.module";
import { TogglePasswordDirective } from "./directives/toggle-password.directive";

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  DurationPipe,
  CustomDatePipe,
  AuthorsPipe,
  EmailValidatorDirective,
  TogglePasswordDirective,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [components],
})
export class SharedModule {}
