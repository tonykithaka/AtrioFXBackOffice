import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  fullName: string;
  userId: string;
  userProfile: string;
  rank: string;
  constructor() { }

  ngOnInit() {
    this.fullName = localStorage.getItem('userName');
    this.userId = localStorage.getItem('userId');
    this.rank = localStorage.getItem('rank');
    this.userProfile = "https://res.cloudinary.com/dk8vuddno/image/upload/v1593958819/" +this.userId +".jpg";
  }

}
