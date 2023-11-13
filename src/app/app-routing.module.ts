import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "courses",
    pathMatch: "full",
  },
  {
    path: "login",
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import("./shared/components/login-form/login-form.module").then(
        (m) => m.LoginFormModule
      ),
  },
  {
    path: "registration",
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import(
        "./shared/components/registration-form/registration-form.module"
      ).then((m) => m.RegistrationFormModule),
  },
  {
    path: "courses",
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
