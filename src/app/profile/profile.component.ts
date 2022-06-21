import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  accesstoken: any;
  constructor(private token: TokenStorageService) {
   }
  ngOnInit(): void {
    console.log("User ",this.token.getUser());
    console.log("Token ",this.token.getToken());
    this.currentUser = this.token.getUser();
    this.accesstoken = this.token.getToken();
  }
}