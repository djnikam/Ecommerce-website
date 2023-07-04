import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart, login, product, signup } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ProductserviceService } from './productservice.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isuserSignup = new BehaviorSubject<boolean>(false);
  productdata: product| undefined;
  uId: number| undefined;
  isLoginError= new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router,  private product : ProductserviceService) {}

  userSignup(data: signup) {
    return this.http
      .post('http://localhost:3000/users', data, { observe: 'response' })
      .subscribe((result) => {
        this.isuserSignup.next(true);
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['home']);
        
      });
  }

  reloadseller() {
    if (localStorage.getItem('user')) {
      this.isuserSignup.next(true);
      this.router.navigate(['home']);
    }
  }


  userlogin(data:login) {

  this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe: 'response'})
  .subscribe((result:any)=>{
      if(result && result.body && result.body.length)
      {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['home']);
        this.localToDBcart();
      }
      else
      {
        this.isLoginError.emit(true);
      }   
    })

  }

  localToDBcart(){
    //  Crested Service 
    let dat = localStorage.getItem('localCart')
    if(dat){
      let cartListData: product[]= JSON.parse(dat);
      let user = localStorage.getItem('user');
      let userData= user && JSON.parse(user)[0];
      this.uId=userData.id;

      cartListData.forEach((product: product, index )=>{

        let cartData: cart={

          ...product,
          productId:product.id,
          userId: this.uId,
        }
        delete cartData.id;

        setTimeout(() => {
          
          this.product.addToCart(cartData).subscribe((res)=>{

          if(res){
            console.warn("Added DB")
          }
          })
        }, 1000);
        if(cartListData.length===index+1)
        {
          localStorage.removeItem('localCart');
        }
      })
    } 

    setTimeout(() => {
      
      this.product.getCartList(this.uId);
    }, 2000);
  }


  
}
