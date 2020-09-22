import { Component, OnInit, Input, NgZone } from "@angular/core";

import { CloudinaryModule, Cloudinary } from "@cloudinary/angular-5.x";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import Swal from "sweetalert2";
// import * as  Cloudinary from 'cloudinary-core';

import { DataService } from "../data.service";
import { Rank } from "./videoDetails.model";
import { VideoDetailsService } from "./videoDetails.service";
import { VideoInfo } from "../app.models";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-forms",
  templateUrl: "./videoDetails.component.html",
  styleUrls: ["./videoDetails.component.scss"],
})
export class VideoDetailsComponent implements OnInit {
  @Input()
  responses: Array<any>;
  loader: boolean = false;

  rank: string;
  data: any = null;
  actionButton: boolean;
  selected: any;
  public pageTitle: string;
  video: any = {
    id: null,
    title: null,
    length: null,
    clip: null,
    category: null,
    dateCreated: null,
    localUrl: null,
  };
  userAction: string;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  private cloudinary: Cloudinary;

  public createButton: boolean = false;
  public editButton: boolean = false;
  public deleteButton: boolean = false;

  // localUrl: any[];

  videoCategory: Rank[] = [
    {
      categoryValue: "Premium",
      categoryName: "Premium",
    },
    {
      categoryValue: "Free",
      categoryName: "Free",
    },
  ];
  localUrl: any;
  constructor(
    public dataService: DataService,
    private videosDetailsService: VideoDetailsService,
    private _router: Router
  ) {}

  ngOnInit() {
    //this.initializeUserDetailsForm();
    this.fetchVideoDetails();
    this.pageTitle = "Video Information Management";
  }

  saveVideoDetails(newVideo: VideoInfo): void {
    let newVideoDetails = {
      title: newVideo.title,
      length: newVideo.length,
      category: newVideo.category,
      file: this.localUrl,
    };

    console.log(newVideoDetails);

    this.loader = false;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save changes.",
    }).then((result) => {
      if (result.value) {
        //Save user
        this.videosDetailsService.createNewVideo(newVideoDetails).subscribe(
          (videoInfo: any) => {Swal.fire(
            "Success",
            videoInfo.message + " The video is uploading in the background and will be available when the upload is done.",
            "success"
          );
          setTimeout(() => this._router.navigateByUrl("videos"), 2500);
            this.videosDetailsService.saveVideo(newVideoDetails).subscribe(
              //save picture upload
              (cloudinaryResp: any) => {
                console.log(cloudinaryResp);
                this.loader = false;
                setTimeout(() => this._router.navigateByUrl("videos"), 2500);
              },
              (err) => {
                console.log("-----> err", err);
                this.loader = false;
                Swal.fire("Error", err, "error");
              }
            );
          },
          (err) => {
            console.log("-----> err", err);
            this.loader = false;
            Swal.fire("Error", err, "error");
          }
        );
      }
    });


    // console.log(newUserDetails.fullName);
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  fetchVideoDetails(): any {
    this.data = this.dataService.getVideoInformation();
    if (this.data.viewInfo == "create") {
      this.createButton = true;
    } else if (this.data.viewInfo == "edit") {
      this.editButton = true;
    } else if (this.data.viewInfo == "delete") {
      this.deleteButton = true;
    }
    if (this.data.viewInfo == "create") {
      this.actionButton = true;
      this.video = {
        id: null,
        title: null,
        length: null,
        category: null,
        localUrl: null,
      };
    } else {
      this.actionButton = false;
      console.log(JSON.stringify(this.data.videoInfo));
      this.video = {
        id: this.data.videoInfo[0].id,
        title: this.data.videoInfo[0].title,
        length: this.data.videoInfo[0].length,
        category: this.data.videoInfo[0].category,
      };
      this.localUrl = this.data.videoInfo[0].localUrl;
    }
  }

  editVideoDetails(videoDetails: VideoInfo): void {
    let newVideoDetails = {
      id: videoDetails.id,
      title: videoDetails.title,
      length: videoDetails.length,
      category: videoDetails.category,
      file: this.localUrl,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save changes.",
    }).then((result) => {
      if (result.value) {
        //Save user
        this.videosDetailsService.editVideoDetails(newVideoDetails).subscribe(
          (videoInfo: any) => {
            Swal.fire(
              "Success",
              videoInfo.message,
              "success"
            );
            setTimeout(() => this._router.navigateByUrl("videos"), 2500);
            this.videosDetailsService.saveVideo(newVideoDetails).subscribe(
              //save picture upload
              (cloudinaryResp: any) => {
                console.log(cloudinaryResp);
              },
              (err) => {
                console.log("-----> err", err);
                Swal.fire("Error", err, "error");
              }
            );
          },
          (err) => {
            console.log("-----> err", err);
            Swal.fire("Error", err, "error");
            this.loader = false;
          }
        );
      } else {
        Swal.fire("Error", "Changes will be lost.", "error");
      }
    });
  }

  showPreviewVideo(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        console.log("Video url :: " + this.localUrl);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get userInformation(): any {
    return this.dataService.userInformationdetails;
  }
}
