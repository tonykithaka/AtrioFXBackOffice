import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { PublicationsService } from "./publications.service";
import { PublicationInfo } from "../app.models";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { EnvService } from "../env.service"
import "datatables.net";
import "datatables.net-bs4";

@Component({
  selector: "app-customer",
  templateUrl: "./publications.component.html",
  styleUrls: ["../app.component.scss", "./publications.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PublicationsComponent implements OnInit {
  public publicationInfo: any;
  public publicationDetails: PublicationInfo[];
  public publicationInformation: any;
  public pageTitle: string;
  dataTable: any;

  constructor(
    public publicationService: PublicationsService,
    private router: Router,
    public dataService: DataService,
    private chRef: ChangeDetectorRef,
    private env: EnvService,
    private _sanitizationService: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetchAllPublication();
    this.pageTitle = "Learning Publications Management"
  }

  fetchAllPublication() {
    this.publicationService.fetchAllPublications().subscribe(
      (publicationInfo: any) => {
        this.publicationInfo = publicationInfo;
        this.publicationDetails = this.publicationInfo.data;
        this.publicationDetails.forEach(x =>  {
          x.mediaLink = this._sanitizationService.bypassSecurityTrustResourceUrl((this.env.cloudinaryImageUrl + x.title + ".pdf").replace(/ /g, '%20'));
          console.log("media is :: "+x.mediaLink)
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
  viewPublicationDetails(id, viewOption): any {
    if (id == null) {
      this.publicationInformation = null;
    } else {
      this.publicationInformation = this.publicationDetails.filter(function (publication) {
        return publication.id == id;
      });
    }

    var videoDetailsInfo = {
      publicationInfo: this.publicationInformation,
      viewInfo: viewOption,
    };

    console.log("userinfo ::"+this.publicationInformation);

    this.dataService.setPublicationInformation(videoDetailsInfo);
    this.router.navigate(["publicationDetails"]);
  }

  //View customer details
  // viewCustomerDetails(nationalId, viewOption): any {
  //   if (nationalId == "") {
  //     this.customerInformation = null;
  //   } else {
  //     this.customerInformation = this.customerDetails.filter(function (
  //       customer
  //     ) {
  //       return customer.nationalId == nationalId;
  //     });
  //   }

  //   var customerDetailsInfo = {
  //     userInfo: this.customerInformation,
  //     viewInfo: viewOption,
  //   };

  //   console.log("userinfo ::" + this.customerInformation);

  //   this.dataService.setCustomerInformation(customerDetailsInfo);
  //   this.router.navigate(["customerDetails"]);
  // }
}
