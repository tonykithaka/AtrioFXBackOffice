import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CloudinaryResponse } from "./userDetails.model";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class UsersDetailsService {
  response;
  public_id;
  imageResponse: CloudinaryResponse;

  constructor(private http: HttpClient, private env: EnvService) {}
  private _baseUrl = this.env.apiUserUrl;
  private _coudinaryUrl = this.env.cloudinaryUrl;

  createNewUser(userDetails: any) {
    const token = localStorage.getItem("token");

    var userInfo = {
      nationalId: userDetails.nationalId,
      fullName: userDetails.fullName,
      emailAddress: userDetails.emailAddress,
      rank: userDetails.rank,
      phoneNumber: userDetails.phoneNumber,
      password: userDetails.password,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/createUser",
      userInfo,
      httpOptions
    );

    return this.response;
  }

  saveProfilePic(userDetails: any) {
    //cloudinary file upload
    this.response = this.http.post<any>(this._coudinaryUrl, {
      upload_preset: "kdamdo5d",
      file: userDetails.file,
      cloud_name: "dk8vuddno",
      public_id: userDetails.nationalId,
    });

    return this.response;
  }

  editUserDetails(userDetails: any) {
    const token = localStorage.getItem("token");

    var userInfo = {
      nationalId: userDetails.nationalId,
      fullName: userDetails.fullName,
      emailAddress: userDetails.emailAddress,
      rank: userDetails.rank,
      phoneNumber: userDetails.phoneNumber,
      password: userDetails.password,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/updateUser",
      userInfo,
      httpOptions
    );

    return this.response;
  }
}
