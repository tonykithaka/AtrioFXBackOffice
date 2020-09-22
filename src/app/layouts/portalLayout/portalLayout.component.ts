import { Component, OnInit } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { Event, Router, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-customer",
  templateUrl: "./portalLayout.component.html",
  styleUrls: ["../../app.component.scss", "./portalLayout.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class portalLayoutComponent implements OnInit {
  showLoadingindicator = true;
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart){
        this.showLoadingindicator = true;
      }
      if(routerEvent instanceof NavigationEnd){
        this.showLoadingindicator = true
      }
    });
  }

  ngOnInit() {}
}
