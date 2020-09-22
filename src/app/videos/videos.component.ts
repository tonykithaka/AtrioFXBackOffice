import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";

import { VideosService } from "./videos.service";
import { VideoInfo } from "../app.models";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { EnvService } from "../env.service";
import "datatables.net";
import "datatables.net-bs4";

@Component({
  selector: "app-customer",
  templateUrl: "./videos.component.html",
  styleUrls: ["../app.component.scss", "./videos.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VideosComponent implements OnInit {
  public videoInfo: any;
  public videoDetails: VideoInfo[];
  public videoInformation: any;
  public pageTitle: string;
  dataTable: any;

  constructor(
    public videoService: VideosService,
    private router: Router,
    public dataService: DataService,
    private chRef: ChangeDetectorRef,
    private env: EnvService
  ) {}

  ngOnInit() {
    this.fetchVideos();
    this.pageTitle = "Videos Management";
  }

  fetchVideos() {
    this.videoService.fetchAllVideos().subscribe(
      (videoInfo: any) => {
        this.videoInfo = videoInfo;
        this.videoDetails = this.videoInfo.data;
        console.log(this.videoDetails);
        this.videoDetails.forEach(x =>  {
          x.localUrl = (this.env.cloudinaryVideoUrl + x.title + ".mp4").replace(/ /g, '%20');
          console.log("media is :: "+x.localUrl)
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
  viewVideoDetails(id, viewOption): any {
    console.log("Video ID is "+id);
    if (id == "") {
      this.videoInformation = null;
    } else {
      this.videoInformation = this.videoDetails.filter(function (video) {
        return video.id == id;
      });
    }

    var videoDetailsInfo = {
      videoInfo: this.videoInformation,
      viewInfo: viewOption,
    };

    console.log("userinfo ::" + JSON.stringify(this.videoInformation));

    this.dataService.setVideoInformation(videoDetailsInfo);
    this.router.navigate(["videoDetails"]);
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
