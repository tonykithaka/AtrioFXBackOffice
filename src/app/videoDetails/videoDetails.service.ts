import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CloudinaryResponse } from "./videoDetails.model";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class VideoDetailsService {
  response;
  public_id;
  imageResponse: CloudinaryResponse;

  constructor(private http: HttpClient, private env: EnvService) {}
  private _baseUrl = this.env.apiUserUrl;

  private _coudinaryUrl = this.env.cloudinaryVideoUploadUrl;

  createNewVideo(videoDetails: any) {
    const token = localStorage.getItem("token");

    var videoInfo = {
      title: videoDetails.title,
      length: videoDetails.length,
      category: videoDetails.category,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/createVideo",
      videoInfo,
      httpOptions
    );

    return this.response;
  }

  editVideoDetails(videoDetails: any) {
    const token = localStorage.getItem("token");

    var videoInfo = {
      id: videoDetails.id,
      title: videoDetails.title,
      length: videoDetails.length,
      category: videoDetails.category,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/updateVideo",
      videoInfo,
      httpOptions
    );

    return this.response;
  }

  saveVideo(videoDetails: any) {
    //cloudinary file upload
    this.response = this.http.post<any>(this._coudinaryUrl, {
      upload_preset: "kdamdo5d",
      file: videoDetails.file,
      cloud_name: "dk8vuddno",
      public_id: videoDetails.title,
    });

    return this.response;
  }
}
