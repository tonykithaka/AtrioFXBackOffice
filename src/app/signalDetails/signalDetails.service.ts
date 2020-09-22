import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CloudinaryResponse } from "./signalDetails.model";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class SignalDetailsService {
  response;
  public_id;
  imageResponse: CloudinaryResponse;

  constructor(private http: HttpClient, private env: EnvService) {}
  private _baseUrl = this.env.apiUserUrl;
  private _coudinaryUrl = this.env.cloudinaryUrl;

  //Create new signal
  createNewSignal(signalDetails: any) {
    const token = localStorage.getItem("token");

    var signalInfo = {
      title: signalDetails.title,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/createSignal",
      signalInfo,
      httpOptions
    );

    return this.response;
  }

  saveSignal(signalDetails: any) {
    //cloudinary file upload
    this.response = this.http.post<any>(this._coudinaryUrl, {
      upload_preset: "kdamdo5d",
      file: signalDetails.file,
      cloud_name: "dk8vuddno",
      public_id: signalDetails.title,
    });

    return this.response;
  }
}
