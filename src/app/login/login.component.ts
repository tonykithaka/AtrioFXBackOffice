import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/observable";
import Swal from 'sweetalert2'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";

import { LoginService } from "./login.service";

import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/filter";

import { UserInfo } from "./login.model";

@Component({
  selector: "app-forms",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm;
  public userInfo: UserInfo;
  public EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _auth: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email_address: [
        "",
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(this.EMAIL_REGEX),
          ]),
        ],
      ],
      password: ["", [Validators.compose([Validators.required])]],
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  loginUser(userData) {
    this._auth.loginUser(userData).subscribe((userInfo: UserInfo) => {
      this.userInfo = userInfo;
      if (this.userInfo.success == 1) {
        localStorage.setItem("token", userInfo.token);
        localStorage.setItem("userName", userInfo.data.fullName);
        localStorage.setItem("userId", userInfo.data.nationalId);
        localStorage.setItem("rank", userInfo.data.rank)
        this.router.navigate(["dashboard"]);
      } else {
        Swal.fire({
          title: 'Error!',
          text: this.userInfo.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    });
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress: [
        "",
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(this.EMAIL_REGEX),
          ]),
        ],
      ],
      password: ["", [Validators.compose([Validators.required])]],
    });
  }
}
