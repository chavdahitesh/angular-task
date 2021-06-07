import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private route: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    let password = new FormControl(
      null,
      Validators.compose([Validators.required, Validators.minLength(6)])
    );
    this.loginForm = this.fb.group({
      mail: ["", Validators.compose([Validators.required, Validators.email])],
      pass: password,
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  submitForm($ev, value: any) {
    for (let val in this.loginForm.controls) {
      this.loginForm.controls[val].markAsTouched();
    }
    let logFormMail = this.loginForm.get("mail").value;
    let logFormPass = this.loginForm.get("pass").value;
    let LoclStorData = JSON.parse(localStorage.getItem("Data"));
    console.log(LoclStorData.mail);

    if (this.loginForm.valid) {
      for (let i = 0; i < LoclStorData.length; i++)
        if (logFormMail == LoclStorData[i].mail) {
          if (logFormPass == LoclStorData[i].pass) {
            this.route.navigate(["/dashboard"]);
            this.toast.success("Login Success!!!!!");
            return;
          }
        } else {
          this.toast.error("Invalid Emil or Password");
        }
    }
  }
}
