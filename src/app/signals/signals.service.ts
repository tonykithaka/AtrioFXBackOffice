import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfo } from "../app.models";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class  SignalsService {
  response;
  
  constructor(private http: HttpClient, private env: EnvService) {}
  private _baseUrl = this.env.apiUserUrl;

  fetchAllSignals() {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.get<UserInfo>(
      this._baseUrl + "/fetchAllSignals",
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }
}
