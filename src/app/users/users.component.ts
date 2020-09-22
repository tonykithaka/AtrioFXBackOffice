import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { UsersService } from "./users.service";
import { UserInfo } from "../app.models";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import "datatables.net";
import "datatables.net-bs4";

@Component({
  selector: "app-customer",
  templateUrl: "./users.component.html",
  styleUrls: ["../app.component.scss", "./users.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
  public userInfo: UserInfo;
  public userDetails: any;
  public userData: any;
  public userInformation: any;
  public pageTitle: string;
  dataTable: any;

  constructor(
    public userService: UsersService,
    private router: Router,
    public dataService: DataService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userDetails = [];
    this.fetchUser();
    this.pageTitle = "User Management";
  }

  fetchUser() {
    console.log(`data fetched is `);
    this.userService.fetchAllUsers().subscribe(
      (userInfo: UserInfo) => {
        this.userInfo = userInfo;
        this.userDetails = userInfo.data;
        this.chRef.detectChanges();

        // Now you can use jQuery DataTables :
        const table: any = $("table");
        this.dataTable = table.DataTable();
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  createUserDetails() {
    this.router.navigate(["userDetails"]);
  }

  //View customer details
  viewUserDetails(nationalId, viewOption): any {
    if (nationalId == "") {
      this.userInformation = null;
    } else {
      this.userInformation = this.userDetails.filter(function (user) {
        return user.nationalId == nationalId;
      });
    }

    var userDetailsInfo = {
      userInfo: this.userInformation,
      viewInfo: viewOption,
    };

    this.dataService.setUserInformation(userDetailsInfo);
    this.router.navigate(["userDetails"]);
  }
}
