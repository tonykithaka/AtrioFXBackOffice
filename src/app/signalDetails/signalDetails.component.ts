import { Component, OnInit, Input, NgZone } from "@angular/core";

import { CloudinaryModule, Cloudinary } from "@cloudinary/angular-5.x";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
// import * as  Cloudinary from 'cloudinary-core';

import { DataService } from "../data.service";
import { Rank } from "./signalDetails.model";
import { SignalDetailsService } from "./signalDetails.service";
import { VideoInfo } from "../app.models";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-forms",
  templateUrl: "./SignalDetails.component.html",
  styleUrls: ["./SignalDetails.component.scss"],
})
export class SignalDetailsComponent implements OnInit {
  @Input()
  responses: Array<any>;
  loader: boolean = false;

  rank: string;
  data: any = null;
  actionButton: boolean;
  selected: any;
  signal: any = {
    title: null,
    localUrl: null,
    id: null,
  };
  userAction: string;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  private cloudinary: Cloudinary;
  public pageTitle: string;

  public createButton: boolean = false;
  public editButton: boolean = false;
  public deleteButton: boolean = false;

  localUrl: any[];
  constructor(
    public dataService: DataService,
    private signalDetailsService: SignalDetailsService,
    private _router: Router
  ) {}

  ngOnInit() {
    //this.initializeUserDetailsForm();
    this.fetchSignalDetails();
    this.loader = false;
    this.pageTitle = "Signal Information Management";
  }

  showPreviewSignal(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get userInformation(): any {
    return this.dataService.userInformationdetails;
  }

  saveSignalDetails(newSignal: any): void {
    console.log(newSignal);
    console.log("Id number is :: " + newSignal.title);

    let newSignalDetails = {
      title: newSignal.title,
      file: this.localUrl,
    };

    this.loader = true;

    //Save user
    this.signalDetailsService.createNewSignal(newSignalDetails).subscribe(
      (videoInfo: any) => {
        this.signalDetailsService.saveSignal(newSignalDetails).subscribe(
          //save picture upload
          (cloudinaryResp: any) => {
            console.log(cloudinaryResp);
            this.loader = false;
            setTimeout(() => this._router.navigateByUrl("signals"), 2500);
          },
          (err) => {
            console.log("-----> err", err);
            this.loader = false;
          }
        );
      },
      (err) => {
        console.log("-----> err", err);
        this.loader = false;
      }
    );

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

  fetchSignalDetails(): any {
    this.data = this.dataService.getSignalInformation();
    if (this.data.viewInfo == "create") {
      this.createButton = true;
    } else if (this.data.viewInfo == "edit") {
      this.editButton = true;
    } else if (this.data.viewInfo == "delete") {
      this.deleteButton = true;
    }
    if (this.data.viewInfo == "create") {
      this.actionButton = true;
      this.signal = {
        id: null,
        title: null,
      };
    } else {
      this.actionButton = false;
      this.signal = {
        id: this.data.signalInfo[0].id,
        title: this.data.signalInfo[0].title,
      };
      this.localUrl = this.data.signalInfo[0].mediaLink;
    }
  }
}
