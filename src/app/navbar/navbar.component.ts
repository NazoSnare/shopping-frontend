import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 messageTimeout= 3000;
  constructor( private flashMessagesService: FlashMessagesService,
                       public authService: AuthService,
                       private router:Router) { }

  ngOnInit() {
  }

  onLogout(){
  this.authService.logout();
  this.flashMessagesService.show('Logged out successfully',
   { cssClass: 'alert-success', timeout: this.messageTimeout });
   this.router.navigate(['/']);
  }

}
