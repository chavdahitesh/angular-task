import { Component, OnInit, ViewChild, ElementRef,TemplateRef } from '@angular/core';
import { Time } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as jsPDF  from 'jspdf';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reminder-using-bootstrap',
  templateUrl: './reminder-using-bootstrap.component.html',
  styleUrls: ['./reminder-using-bootstrap.component.css'],
  providers:[DatePipe]
})
export class ReminderUsingBootstrapComponent implements OnInit {
  
  searchText;
  modalRef: BsModalRef;
  message: string;
  myDate : number; // current Date updated
  currenttime = new Date();
  cstime = Date.now();
  myForm: FormGroup;
  saveData = [];
  taskStatus = [
    { id: 1, status: "Working" },
    { id: 2, status: "Completed" }
  ]

  constructor(private fb: FormBuilder, private datePipe:DatePipe,
    private modalService: BsModalService,
    ) {
      setInterval(() => {
        this.myDate = Date.now();
      }, 1); 

  }

  ngOnInit() {  
  this.myForm = this.fb.group({
      ctask: "",
      cstatus: "",
      cstime :"",
      search:""
    }) 
    console.log("Date now",this.currenttime);
  }
  
  onSubmit() {
    this.saveData.push(this.myForm.value);
    this.myForm.reset();
  }

  openModal(template: TemplateRef<any>) 
  {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  removeRow(row){
    const index = this.saveData.indexOf(row);
    this.saveData.splice(index, 1);
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  /* -------- Getting Status -------- */
  onChange(selectedDropValue:any) {
  //console.log(selectedDropValue);
  
  }
/* ---------- Change Status--------- */
  changeStatus(event,id) {
    
    if(event.target.checked)
    {
      this.saveData[id].cstatus ="Completed";
      this.saveData[id].currenttime = this.cstime;
           
    }else{

      this.saveData[id].cstatus = "Working";
      
      /* console.log("pushed data",this.saveData); */
    }  
  }


  /* -----------PDF GENERATE--------- */
    @ViewChild('reportContent', { static: true }) reportContent: ElementRef;
  downloadPdf() {
    
    const doc = new jsPDF('l', 'mm', 'a3');
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const content = this.reportContent.nativeElement;
    doc.setFontSize(5);
    doc.fromHTML(content.innerHTML, 40, 10, {
  
      'width': 100,
      'elementHandlers': specialElementHandlers
    });
    doc.save('ReminderReport' + '.pdf');
  }  

}
