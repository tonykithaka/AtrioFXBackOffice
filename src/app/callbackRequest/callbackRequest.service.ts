import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CallbackData } from "../app.models";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class  CallbackService {
  response;
  // private _baseUrl = "http://localhost:3000/api/customer";
  // private _baseUrl = "https://api.atriofx.com:3000/api/customer";
  

  constructor(private http: HttpClient, private env: EnvService) {}
  private _baseUrl = this.env.apiCustomerUrl;

  fetchAllCallbacks() {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.get<CallbackData>(
      this._baseUrl + "/fetchCallbackRequest",
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }

  updateCallback(callbackId: any) {
    const token = localStorage.getItem("token");

    var callbackInfo = {
      callbackId: callbackId
    }

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<CallbackData>(
      this._baseUrl + "/updateCallbackRequest",callbackInfo,
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }
}
