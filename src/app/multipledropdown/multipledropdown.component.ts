import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { selectpicker } from "bootstrap-select";
import { JsonDataService } from "../services/json-data.service";

@Component({
  selector: "app-multipledropdown",
  templateUrl: "./multipledropdown.component.html",
  styleUrls: ["./multipledropdown.component.css"],
})
export class MultipledropdownComponent {
  myForm: FormGroup;
  submitted = false;
  CarBrand = [];
  model = [];
  color = [];
  choose_color = [];
  listData = [];
  allColor = [];
  name: string;
  selectedBrands: string;
  selectedModels: string;
  selectedColour: string;
  printedOption: string;

  constructor(private jsonservice: JsonDataService, private _fb: FormBuilder) {
    this.myForm = _fb.group({
      brand: [],
      modl: [],
      color: [],
      listbox: new FormArray([]),
    });
    // console.log(this.myForm);
  }

  ngOnInit() {
    this.jsonservice.getJSONData().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.allColor = data[i].colors;
      }
      this.CarBrand = data;
    });
  }

  brandChange(e) {
    localStorage.setItem("Brand", e);
    console.log("e", e);

    this.selectedBrands = e;
    this.CarBrand.filter((element) => {
      //console.log("elemenCarBRand",element);
      if (element.car == e) {
        this.model = element.model;
      }
    });
  }

  modelChange(evt) {
    localStorage.setItem("Models", evt);
    this.selectedModels = evt;
    this.model.filter((element) => {
      console.log("element1111Nodel", element);
      if (element.model_name == evt) {
        this.color = this.allColor;
      }
    });
  }
  selectcolour(col) {
    this.choose_color.push(col);
    console.log("this.choose_color", this.choose_color);

    this.selectedColour = col;
    console.log("coll", col);
    localStorage.setItem("Colors", col.color.value);
  }

  Submit() {
    this.submitted = true;
    const selectedCheckbox = this.myForm.value.listbox.map((v, i) =>
      v ? this.choose_color[i].color : null
    );
    console.log(selectedCheckbox);
    (this.myForm.controls.listbox as FormArray).setValue(selectedCheckbox);
    localStorage.setItem("Mydata", JSON.stringify(this.myForm.value));

    this.myForm.reset();
  }
}
