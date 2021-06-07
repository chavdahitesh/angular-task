import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./services/guard/auth.guard";
import { ReminderUsingBootstrapComponent } from "./reminder-using-bootstrap/reminder-using-bootstrap.component";
import { MultipledropdownComponent } from "./multipledropdown/multipledropdown.component";
import { NgxDropdownComponent } from "./ngx-dropdown/ngx-dropdown.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "register/:ind", component: RegistrationComponent },
  { path: "register", component: RegistrationComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "dashboard /:ind", component: DashboardComponent },
  { path: "todo", component: ReminderUsingBootstrapComponent },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "dropdown",
    component: MultipledropdownComponent,
  },
  {
    path: "ngxdropdown",
    component: NgxDropdownComponent,
  },
  { path: "**", redirectTo: "dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
