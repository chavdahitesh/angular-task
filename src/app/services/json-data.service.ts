import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  items : [];
  constructor(private http : HttpClient) {
    this.getJSONData().subscribe(data=>{
      this.items= data;
      //console.log(this.items);
    });
    this.getJsonCOuntryData ().subscribe(Data=>{
      this.items = [];
    },
    error=>{
      console.log("JSON Data Not Found");
      
    });
   }

   public getJSONData():Observable<any>{
     return this.http.get("assets/CarData.json"); 
     //return this.http.get("assets/emp.json");
   }
   public getJsonCOuntryData(): Observable <any>{
     return this.http.get("assets/country.json")
   } 
}
