import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router} from '@angular/router';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:any;
  messageTimeout=3000;

  constructor(private flashMessagesService: FlashMessagesService,
                      private authService:AuthService,
                       private router:Router,
                     private productsService:ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(data => {
     this.products = data.products;
   }, err => {
     this.flashMessagesService.show('Error getting products',
      { cssClass: 'alert-danger', timeout: this.messageTimeout });
       this.router.navigate(['/']);

     return false;
   });
  }

  purchaseProduct(productId){
    let product =  this.products.filter( product => product._id == productId)[0];
    this.authService.purchaseProduct(product).subscribe( data =>{
      if(data.success){
        this.flashMessagesService.show(data.msg,
         { cssClass: 'alert-success', timeout: this.messageTimeout });
          this.router.navigate(['/profile']);
      }
      else{
        this.flashMessagesService.show(data.msg,
         { cssClass: 'alert-danger', timeout: this.messageTimeout });
          return false;
      }
    });
  }



}
