import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserInfo } from "./login.model";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  response;

  constructor(private http: HttpClient, private env: EnvService) {}
  private _baseUrl = this.env.apiUserUrl;
  loginUser(user) {
    console.log(user);
    this.response = this.http.post<UserInfo>(this._baseUrl + "/login", user);
    console.log(this.response);
    return this.response;
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
