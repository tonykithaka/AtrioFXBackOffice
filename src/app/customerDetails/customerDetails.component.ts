import { Component, OnInit } from "@angular/core";

import { DataService } from "../data.service";
import { CustomerCategory } from "./customerDetails.model";
import { CustomerDetailsService } from "./customerDetails.service";
import { UserDetails, CustomerDetails } from "../app.models";
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: "app-forms",
  templateUrl: "./customerDetails.component.html",
  styleUrls: ["./customerDetails.component.scss"],
})
export class CustomerDetailsComponent implements OnInit {
  subscription: string;
  data: any = null;
  actionButton: boolean;
  actionTitle: string;
  selected: any;
  public pageTitle: string;
  customer: CustomerDetails = {
    nationalId: null,
    firstName: null,
    lastName: null,
    subscriptionType: null,
    emailAddress: null,
    phoneNumber: null,
    telegramName: null,
    imageURL: null,
    dateCreated: null,
    startDate: null,
    endDate: null,
    paymentType: null,
  };
  customerCategory: CustomerCategory[] = [
    {
      categoryValue: "Free",
      categoryName: "Free",
    },
    {
      categoryValue: "Monthly",
      categoryName: "Monthly",
    },
    {
      categoryValue: "Semi Annually",
      categoryName: "Semi Annually",
    },
    {
      categoryValue: "Annually",
      categoryName: "Annually",
    },
  ];
  userAction: string;
  public editButton: boolean = false;
  public deleteButton: boolean;
  
  constructor(
    public dataService: DataService,
    private customerDetailsService: CustomerDetailsService,
    private router: Router,
  ) {}

  ngOnInit() {
    //this.initializeUserDetailsForm();
    this.fetchCustomerDetails();
    console.log("User ranks :: " + this.customerCategory[0].categoryName);
    this.pageTitle = "Manage Customer Information"
  }

  get userInformation(): any {
    return this.dataService.userInformationdetails;
  }

  //Creating new customers
  saveCustomerDetails(customerUser: UserDetails): void {
    let newCustomerDetails = {
      nationalId: customerUser.nationalId,
      fullName: customerUser.firstName + " " + customerUser.lastName,
      emailAddress: customerUser.emailAddress,
      telegramName: customerUser.rank,
      phoneNumber: customerUser.phoneNumber,
      password: customerUser.password,
    };

    this.customerDetailsService.createNewCustomer(newCustomerDetails).subscribe(
      (userInfo: any) => {
        console.log(userInfo);
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  //Fetch and populate customer information
  fetchCustomerDetails(): any {
    this.data = this.dataService.getCustomerInformation();
    if (this.data.viewInfo == "edit"){
      this.editButton = true;
    }else if (this.data.viewInfo == "delete"){
      this.deleteButton = true;
    }
    if (this.data.viewInfo == "create") {
      this.actionTitle = this.data.viewInfo;
      this.actionButton = true;
      this.customer = {
        nationalId: null,
        firstName: null,
        lastName: null,
        subscriptionType: null,
        emailAddress: null,
        phoneNumber: null,
        telegramName: null,
        imageURL: null,
        dateCreated: null,
        startDate: null,
        endDate: null,
        paymentType: null,
      };
    } else {
      this.actionTitle = this.data.viewInfo;
      this.actionButton = false;
      this.customer = {
        nationalId: this.data.userInfo[0].nationalId,
        firstName: this.data.userInfo[0].firstName,
        lastName: this.data.userInfo[0].lastName,
        subscriptionType: this.data.userInfo[0].subscriptionType,
        emailAddress: this.data.userInfo[0].emailAddress,
        phoneNumber: this.data.userInfo[0].phoneNumber,
        telegramName: this.data.userInfo[0].telegramName,
        imageURL: this.data.userInfo[0].imageURL,
        dateCreated: this.data.userInfo[0].dateCreated,
        startDate: this.data.userInfo[0].startDate,
        endDate: this.data.userInfo[0].endDate,
        paymentType: this.data.userInfo[0].paymentType,
      };
    }
  }

  saveCustomerChanges(customerUser: any): any {
    
    this.customerDetailsService.updateCustomerInformation(customerUser).subscribe(
      (userInfo: any) => {
        console.log(userInfo);
        this.router.navigate(["customers"]);
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }
}
