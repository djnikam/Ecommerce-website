import { Component } from '@angular/core';
import { ProductserviceService } from '../Services/productservice.service';
import { order, orders, priceSummary,cart } from '../datatype';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  uId: number | undefined;
  cartData: cart[]|undefined;
  orderMsg : string| undefined;


  pricesummary: priceSummary={
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
}



  constructor(private router: Router, private product: ProductserviceService){};

  ngOnInit(){
    
    let user = localStorage.getItem('user');
    let userData= user && JSON.parse(user)[0];
    this.uId=userData.id;

    this.product.getCartData(this.uId).subscribe((res)=>{

      let price=0;
      this.cartData=res;
      res.forEach((item)=>{
        if(item.quantity){

          price= price+(item.pro_price* item.quantity)
        }
      })
      this.pricesummary.delivery=100;
      this.pricesummary.total= price+(price/10)-(price/10)+(this.pricesummary.delivery);  
      
    });

  }

  orderNow(data:order, fields: any){

    if(this.pricesummary.total){

      let OrderData : orders={
        ...data,
        totalprice: this.pricesummary.total,
        userId: this.uId,
        id: undefined
      }

      this.cartData?.forEach((item)=>{
        
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 1000);
      })
      this.product.orderNow(OrderData).subscribe((res)=>{
        if(res)
        {
          this.orderMsg="Order has been Placed";

          setTimeout(() => {
            this.orderMsg=undefined;
            this.router.navigate(['my-orders'])
          }, 4000);     
        }
      })
    }
  }

}
