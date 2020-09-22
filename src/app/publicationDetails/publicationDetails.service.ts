import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CloudinaryResponse } from "./publicationDetails.model";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class PublicationDetailsService {
  response;
  public_id;
  imageResponse: CloudinaryResponse;
  // private _baseUrl = "http://localhost:3000/api/users";
  private _baseUrl = this.env.apiUserUrl;
  
  private _coudinaryUrl = this.env.cloudinaryUrl;

  constructor(private http: HttpClient, private env: EnvService) {}

  createNewPublication(publicationDetails: any) {
    const token = localStorage.getItem("token");

    var publicationInfo = {
      title: publicationDetails.title,
      pages: publicationDetails.pages,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/createPublication",
      publicationInfo,
      httpOptions
    );

    return this.response;
  }

  savePublication(publicationDetails: any) {
    //cloudinary file upload
    this.response = this.http.post<any>(this._coudinaryUrl, {
      upload_preset: "kdamdo5d",
      file: publicationDetails.file,
      cloud_name: "dk8vuddno",
      public_id: publicationDetails.title,
    });

    return this.response;
  }
}
