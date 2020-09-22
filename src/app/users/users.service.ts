import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfo } from "../app.models";
import { async } from "rxjs/internal/scheduler/async";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  response: any;
  
  constructor(private http: HttpClient, private env: EnvService) {}

  // private _baseUrl = "http://localhost:3000/api/users";
  private _baseUrl = this.env.apiUserUrl;

  fetchAllUsers() {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.get<UserInfo>(
      this._baseUrl + "/fetchUsers",
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }

  
}
