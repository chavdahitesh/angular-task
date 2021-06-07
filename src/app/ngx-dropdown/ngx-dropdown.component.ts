import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { JsonDataService } from "../services/json-data.service";
@Component({
  selector: "app-ngx-dropdown",
  templateUrl: "./ngx-dropdown.component.html",
  styleUrls: ["./ngx-dropdown.component.css"],
})
export class NgxDropdownComponent implements OnInit {
  myForm: FormGroup; //Checkbox group Array.Form
  selectedCountry = 0;
  selectedState = 0;
  selectedCities = 0;
  states = [];
  cities = [];
  gettingStates = [];
  getiingCities = [];
  countryData: any[];

  constructor(private jsondata: JsonDataService, private fb: FormBuilder) {
    this.myForm = fb.group({
      state: new FormControl(),
      country: new FormControl(),
      city: new FormControl(),
      checkboxes: new FormArray([]),
    });
  }

  ngOnInit() {
    this.jsondata.getJsonCOuntryData().subscribe((data) => {
      this.countryData = data[0].countries;
      console.log("this.countryData", this.countryData);
      this.gettingStates = data[0].states;
      console.log("this.states", this.states);
      this.getiingCities = data[0].cities;
      console.log("this.cities", this.cities);
    });
  }

  getCountries() {
    return this.countryData;
  }
  getStates() {
    return this.gettingStates;
  }
  getCity() {
    return this.getiingCities;
  }
  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    this.selectedState = 0;
    this.cities = [];
    this.states = this.getStates().filter((item) => {
      return item.country_id === Number(country_id);
    });
  }
  onSelectState(state_id: number) {
    this.selectedState = state_id;
    this.cities = this.getCity().filter((item) => {
      return item.state_id === Number(state_id);
    });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  submit() {
    console.log("this.form", this.myForm.value);
  }
}
