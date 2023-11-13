import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginFormComponent } from "./login-form.component";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class LoginFormModule {}
