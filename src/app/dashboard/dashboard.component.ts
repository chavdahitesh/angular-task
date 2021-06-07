import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CustomValidators } from "ng2-validation";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  myDateValue: Date;
  addForm: FormGroup;

  constructor(
    private route: Router,
    private location: Location,
    private toast: ToastrService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService
  ) {}

  /* Confirmation modals using ngx-bootstrap. */
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }
  decline(): void {
    this.modalRef.hide();
  }
  /* END Confirmation modals */

  myNames = [];
  myEmail = [];
  myDOB = [];
  myMobile = [];
  myGender = [];
  myAdd = [];
  myPass = [];
  myCpass = [];
  storedData = [];

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };
    this.retriveData();

    let password = new FormControl(
      null,
      Validators.compose([Validators.required, Validators.minLength(6)])
    );
    let confirm_password = new FormControl(
      null,
      Validators.compose([
        Validators.required,
        CustomValidators.equalTo(password),
      ])
    );
    this.addForm = this.fb.group({
      name: ["", Validators.required],
      bod: ["", Validators.required],
      add: ["", Validators.required],
      mono: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9][0-9s]*"),
          Validators.maxLength(10),
          Validators.minLength(10),
        ]),
      ],
      gender: ["", Validators.required],
      mail: ["", Validators.compose([Validators.required, Validators.email])],
      pass: password,
      cpass: confirm_password,
    });
  }

  retriveData() {
    this.storedData = JSON.parse(localStorage.getItem("Data"));
    for (let i = 0; i < this.storedData.length; i++) {
      this.myNames[i] = this.storedData[i].name;
      this.myEmail[i] = this.storedData[i].mail;
      this.myDOB[i] = this.storedData[i].bod;
      this.myMobile[i] = this.storedData[i].mono;
      this.myGender[i] = this.storedData[i].gender;
      this.myAdd[i] = this.storedData[i].add;
    }
  }

  deleteUser(id: number, index: number, name: string) {
    this.storedData = JSON.parse(localStorage.getItem("Data"));
    index = this.storedData.indexOf(id);
    console.log(index);
    this.myNames.splice(id, 1) && this.storedData.splice(id, 1);
    localStorage.setItem("Data", JSON.stringify(this.storedData));
    this.modalRef.hide();
  }

  editUser(i: number): void {
    this.route.navigate(["/register", { index: i }]);
  }

  logout() {
    this.authService.logout();
    this.route.navigate(["/login"]);
    location.hash = "noBack";
    this.modalRef.hide();
    return true;
  }
  EmailCheck() {
    let LoclStorData = JSON.parse(localStorage.getItem("Data"));
    for (let i = 0; i < LoclStorData.length; i++) {
      if (this.addForm.get("mail").value == LoclStorData[i].mail) {
        this.toast.warning("User is Already Exist! Try Another Email");
      }
    }
  }
  addUser($ev, value: any) {
    for (let val in this.addForm.controls) {
      this.addForm.controls[val].markAsTouched();
    }
    if (this.addForm.valid) {
      var dataObject = this.addForm.value;
      var array = JSON.parse(localStorage.getItem("Data") || "[]");
      array.push(dataObject);
      localStorage.setItem("Data", JSON.stringify(array));
      this.toast.success("User Added");
      this.route.navigate(["/dashboard"]);
      this.addForm.reset();
    }
  }
}
