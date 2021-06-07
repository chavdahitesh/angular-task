import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private sub: any = null;
  constructor(
    private authService: AuthService,
    private location: Location,
    private route: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      // navigate to login page
      this.location.replaceState("/"); // clears browser history so they can't navigate with back button
      this.route.navigate(["/login"]);
      // you can save redirect url so after authing we can move them back to the page they requested
      return false;
    }
    return true;
  }
}
