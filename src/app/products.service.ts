import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {
     domain = 'http://localhost:3000';
     authToken:any;

  constructor(private http:Http,
                     private authService:AuthService) { }

  getProducts(){
    let headers = new Headers();
    this.authToken = this.authService.getToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.domain}/api/v1/products`, {headers:headers}).
    map(res => res.json());
  }


}
