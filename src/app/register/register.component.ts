import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   name: String;
   username: String;
   email: String;
   password: String;
   balance: Number;
   messageTimeout = 3000;//timeout for flash messages in seconds

  constructor(private validateService:ValidateService,
                     private flashMessagesService: FlashMessagesService,
                     private authService: AuthService,
                     private router:Router
                   ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      balance: this.balance
    }
      //required fields
      if(!this.validateService.validateRegister(user)){
        this.flashMessagesService.show('Please fill in all fields!',
         { cssClass: 'alert-danger', timeout: this.messageTimeout });
        return false;
      }

      //validate validateEmail
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessagesService.show('Please enter valid email!',
         { cssClass: 'alert-danger', timeout: this.messageTimeout });
        return false;
      }
      //register users
       this.authService.registerUser(user).subscribe(data => {
         if(data.success){
           this.flashMessagesService.show(data.msg,
            { cssClass: 'alert-success', timeout: this.messageTimeout });
            this.router.navigate(['/login']);
         }
         else{
           this.flashMessagesService.show(data.msg,
            { cssClass: 'alert-success', timeout: this.messageTimeout });
         }
       });

        //


  }//end of register submit

}
