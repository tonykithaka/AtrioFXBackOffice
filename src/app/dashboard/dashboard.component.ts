import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { ViewEncapsulation } from "@angular/core";

import { CustomerService } from "../customers/customer.service";
import { ForumService } from "../forum/forum.service";
import { CustomerDetails, TicketData, TicketDatum } from "../app.models";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import "datatables.net";
import "datatables.net-bs4";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["../app.component.scss", "./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public total: any;
  public subscriptions: any;
  public customerInfo: any;
  public customerDetails: CustomerDetails[];
  public customerInformation: any;

  public ticketData: TicketData;
  public ticketDatum: TicketDatum[];
  public pageTitle: string;

  public dataTable: any;

  constructor(
    public customerService: CustomerService,
    public forumService: ForumService,
    private router: Router,
    public dataService: DataService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.total = 0;
    this.fetchCustomers();
    this.pageTitle = "Dashboard";
    // this.fetchAllTickets();
  }

  fetchCustomers() {
    this.customerService.fetchAllCustomers().subscribe(
      (customerInfo: any) => {
        this.customerInfo = customerInfo;
        this.customerDetails = this.customerInfo.data;
        this.subscriptions = this.customerDetails.length;
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

  fetchAllTickets() {
    this.forumService.fetchAllTickets().subscribe(
      (ticketData: TicketData) => {
        this.ticketData = ticketData;
        this.ticketDatum = this.ticketData.data;
        console.log(this.ticketDatum);
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

  onChangePage(ticketDatum: Array<any>) {
    // update current page of items
    this.ticketDatum = ticketDatum;
  }

  ShowTicketResponses(ticketId: any) {
    console.log(ticketId);
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

    this.dataService.setCustomerInformation(customerDetailsInfo);
    this.router.navigate(["customerDetails"]);
  }
}
