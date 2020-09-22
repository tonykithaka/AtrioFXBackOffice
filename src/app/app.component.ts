import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { interval, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  mySubscription: Subscription;
  constructor(private jwtHelper: JwtHelperService, private _router: Router) {
    this.mySubscription= interval(1000).subscribe((x =>{
      this.checkToken()
  }));
  }
  title = "star-admin-angular";
  token: any;

  ngOnInit() {
    
  }

  checkToken() {
    this.token = localStorage.getItem("token");
    if (this.jwtHelper.isTokenExpired(this.token)) {
      this._router.navigate(["login"]);
    } else {
      // alert("token valid");
    }
  }
}

//
