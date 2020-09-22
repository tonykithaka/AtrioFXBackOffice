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
import { Rank } from "./userDetails.model";
import { UsersDetailsService } from "./usersDetails.service";
import { UserDetails } from "../app.models";
import { EnvService } from "../env.service";

@Component({
  selector: "app-forms",
  templateUrl: "./userDetails.component.html",
  styleUrls: ["./userDetails.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  @Input()
  responses: Array<any>;
  loader: boolean = false;
  cardTitle: string;
  public pageTitle: string;
  public createButton: boolean = false;
  public editButton: boolean = false;
  public deleteButton: boolean = false;

  rank: string;
  data: any = null;
  actionButton: boolean;
  selected: any;
  user: UserDetails = {
    nationalId: null,
    firstName: null,
    lastName: null,
    rank: null,
    emailAddress: null,
    phoneNumber: null,
    password: null,
    confirmPassword: null,
    image: null,
  };
  userCategory: Rank[] = [
    {
      categoryValue: "Senior Administrator",
      categoryName: "Senior Administrator",
    },
    {
      categoryValue: "Junior Administrator",
      categoryName: "Junior Administrator",
    },
  ];
  userAction: string;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  private cloudinary: Cloudinary;

  localUrl: string;
  constructor(
    public dataService: DataService,
    private usersDetailsService: UsersDetailsService,
    private _router: Router,
    private env: EnvService
  ) {}

  ngOnInit() {
    this.createButton = false;
    this.editButton = false;
    this.deleteButton = false;
    this.fetchUserDetails();
    console.log("User ranks :: " + this.userCategory[0].categoryName);
    this.pageTitle = "User Information Management";
  }

  showPreviewImage(event: any) {
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

  saveUserDetails(newUser: UserDetails): void {
    console.log(newUser);
    console.log("Id number is :: " + newUser.nationalId);

    let newUserDetails = {
      nationalId: newUser.nationalId,
      fullName: newUser.firstName + " " + newUser.lastName,
      emailAddress: newUser.emailAddress,
      rank: newUser.rank,
      phoneNumber: newUser.phoneNumber,
      password: newUser.password,
      file: this.localUrl,
    };

    //Save user dialog
    Swal.queue([
      {
        title: "Create New User",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Create user.",
        text: "Are you sure you want to create" + "this user?",
        showLoaderOnConfirm: true,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        onOpen: () => {
          this.usersDetailsService.createNewUser(newUserDetails).subscribe(
            (userInfo: any) => {
              if (userInfo.success != 0) {
                this.usersDetailsService
                  .saveProfilePic(newUserDetails)
                  .subscribe(
                    //cloudinary picture upload
                    (cloudinaryResp: any) => {
                      Swal.insertQueueStep(userInfo.message);
                      setTimeout(
                        () => this._router.navigateByUrl("users"),
                        2500
                      );
                    },
                    (err) => {
                      console.log("-----> err", err);
                      Swal.insertQueueStep({
                        icon: "error",
                        title: err,
                      });
                      this.loader = false;
                    }
                  );
              } else {
                Swal.insertQueueStep(userInfo.message);
              }
            },
            (err) => {
              console.log("-----> err", err);
              Swal.insertQueueStep(err);
              this.loader = false;
            }
          );
        },
      },
    ]);
  }

  editUserDetails(newUser: UserDetails): void {
    console.log(newUser);
    console.log("Id number is :: " + newUser.nationalId);

    let newUserDetails = {
      nationalId: newUser.nationalId,
      fullName: newUser.firstName + " " + newUser.lastName,
      emailAddress: newUser.emailAddress,
      rank: newUser.rank,
      phoneNumber: newUser.phoneNumber,
      password: newUser.password,
      file: this.localUrl,
    };

    console.log("new url "+this.localUrl)

    //Save user dialog
    Swal.queue([
      {
        title: "Edit User Details",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save Information",
        text: "Are you sure you want to change " + "this user's information?",
        showLoaderOnConfirm: true,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        onOpen: () => {
          this.usersDetailsService.editUserDetails(newUserDetails).subscribe(
            (userInfo: any) => {
              if (userInfo.success != 0) {
                this.usersDetailsService
                  .saveProfilePic(newUserDetails)
                  .subscribe(
                    //cloudinary picture upload
                    (cloudinaryResp: any) => {
                      Swal.insertQueueStep(userInfo.message);
                      setTimeout(
                        () => this._router.navigateByUrl("users"),
                        2500
                      );
                    },
                    (err) => {
                      console.log("-----> err", err);
                      Swal.insertQueueStep({
                        icon: "error",
                        title: err,
                      });
                      this.loader = false;
                    }
                  );
              } else {
                Swal.insertQueueStep(userInfo.message);
              }
            },
            (err) => {
              console.log("-----> err", err);
              Swal.insertQueueStep(err);
              this.loader = false;
            }
          );
        },
      },
    ]);
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

  fetchUserDetails(): any {
    this.data = this.dataService.getuserInformation();
    this.cardTitle = this.data.viewInfo;
    if (this.data.viewInfo == "create") {
      this.createButton = true;
    } else if (this.data.viewInfo == "edit") {
      this.editButton = true;
    } else if (this.data.viewInfo == "delete") {
      this.deleteButton = true;
    }
    if (this.data.viewInfo == "create") {
      this.actionButton = true;

      this.user = {
        nationalId: null,
        firstName: null,
        lastName: null,
        rank: null,
        emailAddress: null,
        phoneNumber: null,
        password: null,
        confirmPassword: null,
        image: null,
      };
    } else {
      this.actionButton = false;
      this.user = {
        nationalId: this.data.userInfo[0].nationalId,
        firstName: this.data.userInfo[0].fullName.split(" ")[0],
        lastName: this.data.userInfo[0].fullName.split(" ")[1],
        rank: this.data.userInfo[0].rank,
        emailAddress: this.data.userInfo[0].emailAddress,
        phoneNumber: this.data.userInfo[0].phoneNumber,
        password: null,
        confirmPassword: null,
        image: null,
      };
      this.localUrl =
        this.env.cloudinaryImageUrl + this.data.userInfo[0].nationalId + ".jpg";
    }
  }
}
