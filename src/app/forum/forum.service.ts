import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TicketData } from "../app.models";
import { EnvService } from "../env.service";

@Injectable({
  providedIn: "root",
})
export class  ForumService {
  response;
  // private _baseUrl = "http://localhost:3000/api/customer";
  // private _baseUrl = "https://api.atriofx.com:3000/api/customer";
  
  constructor(private http: HttpClient, private env: EnvService) {}
  private _baseUrl = this.env.apiCustomerUrl;

  fetchAllTickets() {
    const token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.get<TicketData>(
      this._baseUrl + "/fetchAllTickets",
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }

  fetchAllTicketAnswers(ticketId) {
    const token = localStorage.getItem("token");
    var ticketInformation = {
      ticketId: ticketId
    }

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/fetchAllTicketAnswers",
      ticketInformation,
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }

  ticketResponse(newAnswersPayload) {
    const token = localStorage.getItem("token");
    // var ticketInformation = {
    //   ticketId: ticketId
    // }

    console.log("Answer payload is :: "+JSON.stringify(newAnswersPayload))
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    this.response = this.http.post<any>(
      this._baseUrl + "/createTicketAnswer",
      newAnswersPayload,
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }
}
