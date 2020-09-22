import { Injectable } from "@angular/core";
import { CustomerDetails,TicketData, TicketDatum } from "./app.models";
import { ForumService } from "./forum/forum.service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  userInformationdetails: any;
  customerInformationDetails: any;
  videoInformationdetails: any;
  publicationInformationdetails: any;
  ticketInformation: any;

  ticketData: TicketData
  ticketDatum: TicketDatum[]
  signalInformationdetails: any;

  constructor(private forumService: ForumService) {}
  //fetch system user details
  setUserInformation(userInformation: any): any {
    this.userInformationdetails = userInformation;
    console.log("service data ::" + this.userInformationdetails);
  }

  getuserInformation(): any {
    console.log(this.userInformationdetails);
    return this.userInformationdetails;
  }

  //fetch customer details
  setCustomerInformation(customerInformation: any) {
    this.customerInformationDetails = customerInformation;
    console.log("service data ::" + this.customerInformationDetails);
  }

  getCustomerInformation(): any {
    console.log(this.customerInformationDetails);
    return this.customerInformationDetails;
  }

  //fetch video details
  setVideoInformation(videoInformation: any) {
    console.log("Share video details "+JSON.stringify(videoInformation));
    this.videoInformationdetails = videoInformation;
  }

  getVideoInformation(): any {
    console.log("Share video details "+this.videoInformationdetails)
    return this.videoInformationdetails;
  }

  //fetch publication details
  setPublicationInformation(publicationInformation: any) {
    this.publicationInformationdetails = publicationInformation;
  }

  getPublicationInformation(): any {
    return this.publicationInformationdetails;
  }

  //Fetch ticket data to view answers
  setTicketInformation(ticketInformation: any) {
    this.ticketInformation = ticketInformation;
  }

  getTicketInformation(): any {
    return this.ticketInformation;
  }

  //fetch signal details
  setSignalInformation(signalInformation: any) {
    this.signalInformationdetails = signalInformation;
  }

  getSignalInformation(): any {
    return this.signalInformationdetails;
  }
}
