import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { CustomerComponent } from "./customers/customer.component";
import { UsersComponent } from "./users/users.component";
import { VideosComponent } from "./videos/videos.component";
import { portalLayoutComponent } from "./layouts/portalLayout/portalLayout.component";
import { LoginLayoutComponent } from "./layouts/loginLayout/loginLayout.component";
import { LoginComponent } from "./login/login.component";
import { UserDetailsComponent } from "./userDetails/userDetails.component";
import { CustomerDetailsComponent } from "./customerDetails/customerDetails.component";
import { VideoDetailsComponent } from "./videoDetails/videoDetails.component";
import { PublicationsComponent } from "./publications/publications.component";
import { PublicationDetailsComponent } from "./publicationDetails/publicationDetails.component";
import { ForumComponent } from "./forum/forum.component";
import { ForumDetailsComponent } from "./forumDetails/forumDetails.component";
import { CallbackRequestComponent } from "./callbackRequest/callbackRequest.component";
import { SignalsComponent } from "./signals/signals.component";
import { SignalDetailsComponent } from "./signalDetails/signalDetails.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", redirectTo: "/login", pathMatch: "full" },
  {
    path: "",
    component: LoginLayoutComponent,
    children: [{ path: "login", component: LoginComponent }],
  },
  {
    path: "logout",
    component: LoginLayoutComponent,
    children: [{ path: "", component: LoginComponent }],
  },
  {
    path: "",
    component: portalLayoutComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "customers", component: CustomerComponent },
      { path: "videos", component: VideosComponent },
      { path: "publications", component: PublicationsComponent },
      { path: "publicationDetails", component: PublicationDetailsComponent },
      { path: "userDetails", component: UserDetailsComponent },
      { path: "customerDetails", component: CustomerDetailsComponent },
      { path: "videoDetails", component: VideoDetailsComponent },
      { path: "forum", component: ForumComponent },
      { path: "forumDetails", component: ForumDetailsComponent },
      { path: "callbackRequests", component: CallbackRequestComponent },
      { path: "signals", component: SignalsComponent },
      { path: "signalDetails", component: SignalDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
