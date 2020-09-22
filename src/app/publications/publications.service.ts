import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfo } from "../app.models";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class  PublicationsService {
  response;
  // private _baseUrl = "http://localhost:3000/api/users";
  // private _baseUrl = "https://api.atriofx.com:3000/api/users";

  constructor(private http: HttpClient, private env: EnvService) {}
  private _baseUrl = this.env.apiUserUrl;

  fetchAllPublications() {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.get<UserInfo>(
      this._baseUrl + "/fetchAllPublications",
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }
}
