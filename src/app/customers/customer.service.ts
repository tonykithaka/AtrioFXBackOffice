import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfo } from "../app.models";
import { Observable } from 'rxjs';
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  response;
  private _baseUrl = this.env.apiCustomerUrl;
  
  results: any;
  loading: boolean;

  constructor(private http: HttpClient, private env: EnvService) {}

  fetchAllCustomers(): Observable<any> {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.get<UserInfo>(
      this._baseUrl + "/fetchCustomers",
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }
}
