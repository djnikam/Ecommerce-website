import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signup } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  issellerSignup = new BehaviorSubject<boolean>(false);

  isLoginError= new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  sellerSignup(data: signup) {
    return this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.issellerSignup.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }

  reloadseller() {
    if (localStorage.getItem('seller')) {
      this.issellerSignup.next(true);
      this.router.navigate(['seller-home']);
    }
  }


  sellerlogin(data:login) {

  this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe: 'response'})
  .subscribe((result:any)=>{
      if(result && result.body && result.body.length)
      {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
      else
      {
        this.isLoginError.emit(true);
      }   
    })

  }
}



