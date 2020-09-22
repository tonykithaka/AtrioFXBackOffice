import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfo } from "../app.models";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class VideosService {
  response;

  constructor(private http: HttpClient, private env: EnvService) {}

  // private _baseUrl = "http://localhost:3000/api/users";
  private _baseUrl = this.env.apiUserUrl;

  fetchAllVideos() {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<UserInfo>(
      this._baseUrl + "/fetchAllVideos",
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }
}
