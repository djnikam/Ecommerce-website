import { Component } from '@angular/core';
import { ProductserviceService } from '../Services/productservice.service';
import { cart, priceSummary, product } from '../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  uId: number | undefined;
  cartProducts: cart[] | undefined;

  pricesummary: priceSummary={
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
}

 
  constructor(private product: ProductserviceService, private router: Router){}

  ngOnInit(){

    let user = localStorage.getItem('user');
    let userData= user && JSON.parse(user)[0];
    this.uId=userData.id;

    this.product.getCartData(this.uId).subscribe((res)=>{

      this.cartProducts=res;
      let price=0;
      res.forEach((item)=>{
        if(item.quantity){

          price= price+(item.pro_price* item.quantity)
        }
      })
      
      this.pricesummary.price=price;
      this.pricesummary.delivery=100;
      this.pricesummary.tax=price/10;
      this.pricesummary.discount=price/10;
      this.pricesummary.total= price+(price/10)-(price/10)+(this.pricesummary.delivery);

      
      if(!this.pricesummary.price)
      {
        this.router.navigate(['home']);
      }
      
    });

   
  }

  checkout(){

    this.router.navigate(['checkout']);
  }

  removeFromcart(ProductId: number| undefined){

    this.product.removeFromCheckout(ProductId).subscribe((res)=>{

      let user = localStorage.getItem('user');
    let userData= user && JSON.parse(user)[0];
    this.uId=userData.id;

    this.product.getCartData(this.uId).subscribe((res)=>{

      this.cartProducts=res;
      let price=0;
      res.forEach((item)=>{
        if(item.quantity){

          price= price+(item.pro_price* item.quantity)
        }
      })
      
      this.pricesummary.price=price;
      this.pricesummary.delivery=100;
      this.pricesummary.tax=price/10;
      this.pricesummary.discount=price/10;
      this.pricesummary.total= price+(price/10)-(price/10)+(this.pricesummary.delivery);

      if(!this.pricesummary.price)
      {
        this.router.navigate(['home']);
      }
      
    });
    })

  }
}
