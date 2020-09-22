import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvService } from "../env.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerDetailsService {
  response;
  
  // private _baseUrl = "http://localhost:3000/api/users";
  // private _baseUrl2 = "http://localhost:3000/api/customer";
  private _baseUrl = this.env.apiUserUrl;
  private _baseUrl2 = this.env.apiCustomerUrl;

  constructor(private http: HttpClient, private env: EnvService) {}

  createNewCustomer(userDetails: any): Observable<any> {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/createCustomer",
      userDetails,
      httpOptions
    );
    return this.response;
  }

  updateCustomerInformation(customerUser: any): Observable<any> {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl2 + "/updateCustomer",
      customerUser,
      httpOptions
    );
    return this.response;
  }
}
