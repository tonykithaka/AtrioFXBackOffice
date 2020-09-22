import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { CustomerService } from "./customer.service";
import { CustomerDetails } from "../app.models";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import "datatables.net";
import "datatables.net-bs4";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["../app.component.scss", "./customer.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent implements OnInit {
  public customerInfo: any;
  public customerDetails: CustomerDetails[];
  public customerInformation: any;
  public pageTitle: string;
  dataTable: any;

  constructor(
    public customerService: CustomerService,
    private router: Router,
    public dataService: DataService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchCustomers();
    this.pageTitle = "Customer Management"
  }

  fetchCustomers() {
    this.customerService.fetchAllCustomers().subscribe(
      (customerInfo: any) => {
        this.customerInfo = customerInfo;
        this.customerDetails = this.customerInfo.data;
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

  //View customer details
  viewCustomerDetails(nationalId, viewOption): any {
    if (nationalId == "") {
      this.customerInformation = null;
    } else {
      this.customerInformation = this.customerDetails.filter(function (
        customer
      ) {
        return customer.nationalId == nationalId;
      });
    }

    var customerDetailsInfo = {
      userInfo: this.customerInformation,
      viewInfo: viewOption,
    };

    console.log("userinfo ::" + this.customerInformation);

    this.dataService.setCustomerInformation(customerDetailsInfo);
    this.router.navigate(["customerDetails"]);
  }
}
