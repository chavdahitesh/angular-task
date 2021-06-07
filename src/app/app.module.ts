import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Inject, Injectable, Component } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { DatepickerModule, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ReminderUsingBootstrapComponent } from "./reminder-using-bootstrap/reminder-using-bootstrap.component";
import { SelectDropDownModule } from "ngx-select-dropdown";
//todo Reminder
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgbModule, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { DropdownModule } from "angular-dropdown-component";
import { HttpClientModule } from "@angular/common/http";
import { from } from "rxjs";
import { MultipledropdownComponent } from "./multipledropdown/multipledropdown.component";

import { CommonModule } from "@angular/common";
import { ToastrModule, ToastrService } from "ngx-toastr";
import {
  MAT_CHECKBOX_CLICK_ACTION,
  MatSelectModule,
  MatOptionModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
} from "@angular/material";

import { NgxDropdownComponent } from "./ngx-dropdown/ngx-dropdown.component";
import { AuthGuard } from "./services/guard/auth.guard";
import { AuthService } from "./services/auth.service";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ReminderUsingBootstrapComponent,
    MultipledropdownComponent,
    NgxDropdownComponent,
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    NgbDatepickerModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    CommonModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    SelectDropDownModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger", // set defaults here
    }),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
    }),
    AngularFontAwesomeModule,
  ],
  providers: [
    ToastrService,
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: "noop" },
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
