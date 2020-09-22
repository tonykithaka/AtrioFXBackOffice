import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from "@angular/common/http";
import { CloudinaryModule, Cloudinary } from "@cloudinary/angular-5.x";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { JwPaginationModule } from 'jw-angular-pagination';
import { LightboxModule } from 'ngx-lightbox';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EnvServiceProvider } from './env.service.provider';

import { AppComponent } from "./app.component";
import { CustomerComponent } from "./customers/customer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";
import { VideosComponent } from "./videos/videos.component";
import { portalLayoutComponent } from "./layouts/portalLayout/portalLayout.component";
import { LoginLayoutComponent } from "./layouts/loginLayout/loginLayout.component";
import { LoginComponent } from "./login/login.component";
import { LoginFooterComponent } from "./footerLogin/footerLogin.component";
import { UserDetailsComponent } from "./userDetails/userDetails.component";
import { VideoDetailsComponent } from "./videoDetails/videoDetails.component";
import { PublicationsComponent } from "./publications/publications.component";
import { PublicationDetailsComponent } from "./publicationDetails/publicationDetails.component";
import { CustomerDetailsComponent } from "./customerDetails/customerDetails.component";
import { ForumComponent } from "./forum/forum.component";
import { DataService } from "./data.service";
import { ForumDetailsComponent } from "./forumDetails/forumDetails.component";
import { CallbackRequestComponent } from "./callbackRequest/callbackRequest.component";
import { SignalsComponent } from "./signals/signals.component";
import { SignalDetailsComponent } from "./signalDetails/signalDetails.component";


import { ConfirmEqualValidatorDirective } from "./shared/confirmEqualValidator.directive";
import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  declarations: [
    portalLayoutComponent,
    LoginFooterComponent,
    LoginLayoutComponent,
    AppComponent,
    PublicationDetailsComponent,
    CustomerComponent,
    UsersComponent,
    ForumComponent,
    ForumDetailsComponent,
    CallbackRequestComponent,
    SignalsComponent,
    SignalDetailsComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    VideosComponent,
    LoginComponent,
    UserDetailsComponent,
    VideoDetailsComponent,
    PublicationsComponent,
    CustomerDetailsComponent,
    ConfirmEqualValidatorDirective,
    // JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    DataTablesModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: "dk8vuddno" }),
    JwPaginationModule,
    LightboxModule
  ],
  providers: [
    DataService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    EnvServiceProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
