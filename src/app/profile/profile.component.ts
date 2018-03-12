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
 transactions:any;
 messageTimeout = 3000;
 amount:number =0.00;
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

 this.getTransactions();

  }

  onTopUpSubmit(){
    this.authService.topUpUser(this.amount).subscribe(data => {
      if(data.success){
        this.flashMessagesService.show('Successfully topped-up',
         { cssClass: 'alert-info', timeout: this.messageTimeout });
         this.user = data.updatedUser;
         this.getTransactions();
         this.amount = 0.00;
      }else{
        this.flashMessagesService.show('Successfully topped-up',
         { cssClass: 'alert-info', timeout: this.messageTimeout });

         console.log(data);
         return false;
      }
    });
  }

  getTransactions(){
    this.authService.getUserTransactions().subscribe(data => {
     this.transactions = data.transactions;
     console.log(this.transactions);
   }, err => {
     this.flashMessagesService.show('Error getting user transactions contact admin',
      { cssClass: 'alert-danger', timeout: this.messageTimeout });
       this.transactions={};

     return false;
   });
  }

}
