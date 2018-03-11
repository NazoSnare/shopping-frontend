import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:String;
  password: String;
  messageTimeout = 3000;
  constructor(private validateService:ValidateService,
                     private flashMessagesService: FlashMessagesService,
                     private authService: AuthService,
                     private router:Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
     username: this.username,
     password: this.password
    };

    this.authService.authenticateUser(user).subscribe( data =>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('successfully logged in',
         { cssClass: 'alert-success', timeout: this.messageTimeout });
         this.router.navigate(['/profile']);
      }
      else{
        this.flashMessagesService.show(data.msg,
         { cssClass: 'alert-danger', timeout: this.messageTimeout });
         this.router.navigate(['/login']);
      }
    });

  }

}
