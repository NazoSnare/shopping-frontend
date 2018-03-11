import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 user:any;
 messageTimeout = 3000;
  constructor( private flashMessagesService: FlashMessagesService,
                      private authService:AuthService,
                       private router:Router) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(data => {
     this.user = data.user;
   }, err => {
     this.flashMessagesService.show('Error getting user profile contact admin',
      { cssClass: 'alert-danger', timeout: this.messageTimeout });
       this.router.navigate(['/']);

     return false;
   });
  }

}
