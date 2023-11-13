import { NgModule } from "@angular/core";
import { RegistrationFormComponent } from "./registration-form.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class RegistrationFormModule {}
