import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";

import { SignalsService } from "./signals.service";
import { SignalInfo } from "../app.models";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { EnvService } from "../env.service";
import "datatables.net";
import "datatables.net-bs4";
import { Lightbox } from "ngx-lightbox";

@Component({
  selector: "app-customer",
  templateUrl: "./signals.component.html",
  styleUrls: ["../app.component.scss", "./signals.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SignalsComponent implements OnInit {
  public signalInfo: any;
  public signalDetails: SignalInfo[];
  public signalInformation: any;
  private _album: any[];

  public pageTitle: string;
  dataTable: any;

  constructor(
    public signalsService: SignalsService,
    private router: Router,
    public dataService: DataService,
    private chRef: ChangeDetectorRef,
    private env: EnvService,
    private _lightbox: Lightbox
  ) {}

  ngOnInit() {
    this.fetchAllSignals();
    this.pageTitle = "Signals Management";
  }

  fetchAllSignals() {
    this.signalsService.fetchAllSignals().subscribe(
      (signalInfo: any) => {
        this.signalInfo = signalInfo;
        this.signalDetails = this.signalInfo.data;
        this.signalDetails.forEach((x) => {
          x.mediaLink = (
            this.env.cloudinaryImageUrl +
            x.mediaLink +
            ".jpg"
          ).replace(/ /g, "%20");
          console.log("media is :: " + x.mediaLink);
        });
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
  viewSignalDetails(id, viewOption): any {
    if (id == "") {
      this.signalInformation = null;
    } else {
      this.signalInformation = this.signalDetails.filter(function (signal) {
        return signal.id == id;
      });
    }

    var signalDataInfo = {
      signalInfo: this.signalInformation,
      viewInfo: viewOption,
    };

    this.dataService.setSignalInformation(signalDataInfo);
    this.router.navigate(["signalDetails"]);
  }
}
