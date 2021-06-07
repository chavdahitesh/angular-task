import { Component, OnInit, Inject,TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  modalRef: BsModalRef;
  message: string;
  ind: number
  arryData = [] // all Form Data Store in this Array
  newData = []
  myDateValue : Date;
  constructor(private fb: FormBuilder,
    private route: Router,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
  ) { }

  /* Confirmation modals using ngx-bootstrap. */
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }
    decline(): void {
      this.modalRef.hide();
    }
  /* END Confirmation modals using ngx-bootstrap. */

  ngOnInit() {
    
    this.myDateValue = new Date();
    let password = new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)]));
    let confirm_password = new FormControl(null, Validators.compose([Validators.required, CustomValidators.equalTo(password)]));
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      bod: ['', Validators.required],
      add: ['', Validators.required],
      mono: [null, Validators.compose([Validators.required, Validators.pattern("[0-9][0-9\s]*"), Validators.maxLength(10), Validators.minLength(10)])],
      gender: ['', Validators.required],
      mail: ['', Validators.compose([Validators.required, Validators.email])],
      pass: password,
      cpass: confirm_password,
    });

    /*.........patch value Code...... */
    if (this.activatedRoute.snapshot.queryParams['ind']) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.ind = params['ind'];
        var retrievedData1 = localStorage.getItem("Data");
        this.arryData = JSON.parse(retrievedData1);
        this.newData.push(this.arryData[this.ind]);
        this.registerForm.patchValue(this.arryData[this.ind]);
      });

    } 
  }
  get f() { return this.registerForm.controls; }

  submitForm($ev, value: any) {
    for (let val in this.registerForm.controls) {
      this.registerForm.controls[val].markAsTouched();
    };
    if (this.registerForm.valid) {
      var dataObject = this.registerForm.value;
      var array = JSON.parse(localStorage.getItem('Data') || '[]');
      array.push(dataObject);
      localStorage.setItem('Data', JSON.stringify(array));
      this.toast.success("Congtrats!! Registration Success");
      this.route.navigate(['/login']);
      this.registerForm.reset();
    }
  }

   AddUser(){
    if (this.registerForm.valid) {
      var dataObject = this.registerForm.value;
      var array = JSON.parse(localStorage.getItem('Data') || '[]');
      array.push(dataObject);
      localStorage.setItem('Data', JSON.stringify(array));
      this.toast.success("Congtrats!! User Add Success");
    }
  } 

  EmailCheck() {
    let LoclStorData = JSON.parse(localStorage.getItem('Data'));
    for (let i = 0; i < LoclStorData.length; i++) {
      if (this.registerForm.get('mail').value == LoclStorData[i].mail) {
        this.toast.warning("User is Already Exist! Try Another Email");

      }
    }
  }
  /* ------------Date & Time Picker---------- */
  onDateChange(newDate: Date) {
    console.log(newDate);
  }

   updateRecord() {
    if(this.registerForm.invalid){
        alert("First you have to Register your self");
    }
    else{
        // store current record into abc
        var currentRecord = this.registerForm.value;
        // Get back Record from "DATA" from local storage
        var GetRecord = JSON.parse(localStorage.getItem("Data"));
        //GetRecord[0].mail="admin1@gmail.com";
        GetRecord[this.ind] = currentRecord;
        // save edited record into localstorage
        localStorage.setItem("Data", JSON.stringify(GetRecord));
        this.route.navigate(['/dashboard']);
        this.modalRef.hide();
        return true;
    }
  } 
}