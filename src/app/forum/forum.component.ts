import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  AfterViewChecked,
} from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { ForumService } from "./forum.service";
import { TicketData, TicketDatum } from "../app.models";
import { DataTableDirective } from "angular-datatables";
import { Subject, Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: "app-forum",
  templateUrl: "./forum.component.html",
  styleUrls: ["../app.component.scss", "./forum.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ForumComponent implements OnInit, AfterViewChecked {
  public ticketData: TicketData;
  public ticketDatum: TicketDatum[];
  public responseData: any;
  public checkQuestion: boolean;
  public pageTitle: string;

  public ticketAnswerPayload: any = {
    ticketAnswer: null,
    ticketId: null,
  };

  pageOfItems: Array<any>;
  public ticketInformation: any;
  public questionTicketData: any;

  constructor(
    public forumService: ForumService,
    private router: Router,
    public dataService: DataService
  ) {}

  @ViewChild("scrollMe", { static: false })
  private myScrollContainer: ElementRef;

  ngOnInit() {
    this.fetchAllTickets();
    this.scrollToBottom();
    this.ticketAnswerPayload = {
      ticketAnswer: null,
    };
    this.pageTitle = "Forums Management"
    // this.rerender();
  }

  fetchAllTickets() {
    if (this.questionTicketData == null) {
      this.checkQuestion = false;
    } else {
    }
    this.forumService.fetchAllTickets().subscribe(
      (ticketData: TicketData) => {
        this.ticketData = ticketData;
        this.ticketDatum = this.ticketData.data;
        this.ticketDatum[0].dateCreated;
        console.log(this.ticketDatum);
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  onChangePage(ticketDatum: Array<any>) {
    // update current page of items
    this.ticketDatum = ticketDatum;
  }

  //View customer details
  viewTicketResponses(ticketInfo: any) {
    let ticketId = ticketInfo[0].ticketId;
    this.forumService.fetchAllTicketAnswers(ticketId).subscribe(
      (answerData: any) => {
        this.questionTicketData = {
          ticketId: ticketInfo[0].ticketId,
          nationalId: ticketInfo[0].nationalId,
          assetId: ticketInfo[0].assetId,
          assetType: ticketInfo[0].assetType,
          topic: ticketInfo[0].topic,
          question: ticketInfo[0].question,
          dateCreated: ticketInfo[0].dateCreated,
          responseDate: ticketInfo[0].responseDate,
          firstName: ticketInfo[0].firstName,
          lastName: ticketInfo[0].lastName,
        };
        this.ticketAnswerPayload = {
          ticketId: ticketInfo[0].ticketId,
        };
        this.checkQuestion = true;
        this.responseData = answerData.data;
        console.log(`ticket info :: ${JSON.stringify(this.responseData)}`);
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  saveTicketAnswer(ticketAnswerPayload: any) {
    var newAnswersPayload = {
      ticketId: ticketAnswerPayload.ticketId,
      responderId: localStorage.getItem("userId"),
      firstName: localStorage.getItem("userName"),
      answer: ticketAnswerPayload.ticketAnswer,
      responseId: ticketAnswerPayload.ticketId,
      dateCreated: new Date()
    };

    this.responseData.unshift(newAnswersPayload);
    console.log(JSON.stringify(this.responseData));
    this.forumService.ticketResponse(newAnswersPayload).subscribe(
      (ticketAnswerResponse: any) => {
        console.log(ticketAnswerResponse);
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
    // this.fullName = localStorage.getItem('userName');
    // this.userId = localStorage.getItem('userId');
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
