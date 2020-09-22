import { Component, OnInit, Input, NgZone } from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { CloudinaryModule, Cloudinary } from "@cloudinary/angular-5.x";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
// import * as  Cloudinary from 'cloudinary-core';

import { DataService } from "../data.service";
import { Rank } from "./publicationDetails.model";
import { PublicationDetailsService } from "./publicationDetails.service";
import { PublicationInfo } from "../app.models";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-forms",
  templateUrl: "./publicationDetails.component.html",
  styleUrls: ["./publicationDetails.component.scss"],
})
export class PublicationDetailsComponent implements OnInit {
  @Input()
  responses: Array<any>;
  loader: boolean = false;

  rank: string;
  data: any = null;
  actionButton: boolean;
  selected: any;
  public pageTitle: string;
  publication:  any = {
    id: null,
    title: null,
    pages: null,
    dateCreated: null,
  };
  userAction: string;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  private cloudinary: Cloudinary;

  localUrl: any;
  constructor(
    public dataService: DataService,
    private publicationDetailsService: PublicationDetailsService,
    private _router: Router,
    private _sanitizationService: DomSanitizer
  ) {}

  ngOnInit() {
    //this.initializeUserDetailsForm();
    // this.fetchVideoDetails();
    this.loader = false;
    this.pageTitle = "Learning Publications Information Management"
  }

  showPreviewPublication(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get userInformation(): any {
    return this.dataService.userInformationdetails;
  }

  savePublicationDetails(newPublication: any): void {
    console.log(newPublication);
    console.log("Id number is :: " + newPublication.title);

    let newPublicationDetails = {
      title: newPublication.title,
      pages: newPublication.pages,
      file: this.localUrl,
    };

    this.loader = true;

    //Save user
    this.publicationDetailsService.createNewPublication(newPublicationDetails).subscribe(
      (publicationInfo: any) => {
        this.publicationDetailsService.savePublication(newPublicationDetails).subscribe(

          //save picture upload
          (cloudinaryResp: any) => {
            
            console.log(cloudinaryResp);
            this.loader = false;
            setTimeout(() => this._router.navigateByUrl('publications'),2500);
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

  // fetchVideoDetails(): any {
  //   this.data = this.dataService.getuserInformation();
  //   if (this.data.viewInfo == "create") {
  //     this.actionButton = true;
  //     this.video = {
  //       nationalId: null,
  //       firstName: null,
  //       lastName: null,
  //       rank: null,
  //       emailAddress: null,
  //       phoneNumber: null,
  //       password: null,
  //       confirmPassword: null,
  //       image: null,
  //     };
  //   } else {
  //     this.actionButton = false;
  //     this.user = {
  //       nationalId: this.data.userInfo[0].nationalId,
  //       firstName: this.data.userInfo[0].fullName.split(" ")[0],
  //       lastName: this.data.userInfo[0].fullName.split(" ")[1],
  //       rank: this.data.userInfo[0].rank,
  //       emailAddress: this.data.userInfo[0].emailAddress,
  //       phoneNumber: this.data.userInfo[0].phoneNumber,
  //       password: null,
  //       confirmPassword: null,
  //       image: null,
  //     };
  //   }
  // }
}
