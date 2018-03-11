import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
   authToken: any;
   user: any;
   domain ='http://localhost:3000'
  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.domain}/api/v1/users/register`,user, {headers:headers}).
    map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.domain}/api/v1/users/authenticate`,user, {headers:headers}).
    map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
      localStorage.setItem('motho', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  purchaseProduct(product){

  }


}
