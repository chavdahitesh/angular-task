import { Injectable } from "@angular/core";
import { User } from "../user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  public login(userInfo: User) {
    localStorage.setItem("ACCESS_TOKEN", "access_token");
  }

  public isLoggedIn() {
    return localStorage.getItem("ACCESS_TOKEN") !== null;
  }
  public logout() {
    return localStorage.removeItem("ACCESS_TOKEN");
  }
  public isAuthenticated() {
    return true;
  }
}
