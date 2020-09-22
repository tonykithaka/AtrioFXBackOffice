import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { CallbackService } from "./callbackRequest.service";
import { CallbackData, CallbackDatum } from "../app.models";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import "datatables.net";
import "datatables.net-bs4";

@Component({
  selector: "app-callbackRequest",
  templateUrl: "./callbackRequest.component.html",
  styleUrls: ["../app.component.scss", "./callbackRequest.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CallbackRequestComponent implements OnInit {
  public callbackInfo: CallbackData;
  public CallbackDatum: CallbackDatum[];
  public customerInformation: any;
  public pageTitle: string;
  dataTable: any;

  constructor(
    public callbackService: CallbackService,
    private router: Router,
    public dataService: DataService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchAllCallbacks();
    this.pageTitle = "Callback Management";
  }

  fetchAllCallbacks() {
    this.callbackService.fetchAllCallbacks().subscribe(
      (callbackInfo: CallbackData) => {
        this.callbackInfo = callbackInfo;
        this.CallbackDatum = this.callbackInfo.data;
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

  //Update callback data
  updateCallback(callbackId: any, index: any) {
    this.CallbackDatum[index].status = "Read";
    this.callbackService.updateCallback(callbackId).subscribe(
      (callbackInfo: CallbackData) => {
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
}
