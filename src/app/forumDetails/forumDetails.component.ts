import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { ForumService } from "./forumDetails.service";
import { TicketData, TicketDatum } from "../app.models";
import { DataTableDirective } from "angular-datatables";
import { Subject, Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: "app-forum",
  templateUrl: "./forumDetails.component.html",
  styleUrls: ["../app.component.scss", "./forumDetails.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ForumDetailsComponent implements OnInit {
  public ticketData: TicketData;
  public ticketDatum: TicketDatum[];

  pageOfItems: Array<any>;
  public ticketInformation: TicketDatum;

  public ticketInfo: any = null;

  constructor(
    public forumService: ForumService,
    private router: Router,
    public dataService: DataService
  ) {}

  // @ViewChild(DataTableDirective, { static: false })
  // dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.fetchTicketDetails();
  }

  fetchTicketDetails() {
    this.ticketInfo = this.dataService.getTicketInformation();
    this.ticketInformation = {
      ticketId: this.ticketInfo[0].ticketId,
      nationalId: this.ticketInfo[0].nationalId,
      assetId: this.ticketInfo[0].assetId,
      assetType: this.ticketInfo[0].assetType,
      topic: this.ticketInfo[0].topic,
      question: this.ticketInfo[0].question,
      dateCreated: this.ticketInfo[0].dateCreated,
      responseDate: this.ticketInfo[0].responseDate,
      firstName: this.ticketInfo[0].firstName,
      lastName: this.ticketInfo[0].lastName,
    };

    this.forumService.fetchAllTicketAnswers(this.ticketInformation.ticketId).subscribe(
      (answerData: any) => {
        console.log(answerData);
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
  viewTicketResponses(ticketId: any) {
    if (ticketId == "") {
      this.ticketInformation = null;
    } else {
      try {
        this.ticketInformation = ticketId;
        this.dataService.setTicketInformation(this.ticketInformation);
        this.router.navigate(["customerDetails"]);
      } catch {}
    }
  }
}
