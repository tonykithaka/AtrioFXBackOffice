import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TicketData } from "../app.models";

@Injectable({
  providedIn: "root",
})
export class  ForumService {
  response;
  // private _baseUrl = "http://localhost:3000/api/customer";
  private _baseUrl = "https://api.atriofx.com:3000/api/customer";
  

  constructor(private http: HttpClient) {}

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

    this.response = this.http.post<TicketData>(
      this._baseUrl + "/fetchAllTicketAnswers",
      ticketInformation,
      httpOptions
    );
    console.log(this.response);
    return this.response;
  }
}
