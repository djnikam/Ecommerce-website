import { Component } from '@angular/core';
import { cart, product } from '../datatype';
import { ProductserviceService } from '../Services/productservice.service';
import { faCartShopping, faEye, faStore } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  popularproducts: undefined | product[];
  trendyproducts: undefined | product[];

  view= faEye;
  cart= faCartShopping;
  uId: number | undefined;
  productdata: undefined| product;
  cartData: undefined|product;
  constructor(private product : ProductserviceService, private router: Router){}

  ngOnInit(){

    this.product.popularproducts().subscribe((data)=>{

      this.popularproducts=data;
    })
   
    this.product.trendyproducts().subscribe((res)=>{

      this.trendyproducts=res;
    })
  }

  addTOcart(proid : number){

    let pid = JSON.stringify(proid);

    proid &&  this.product.getproduct(pid).subscribe((res)=>{

      this.productdata= res;
      let cartData= localStorage.getItem('localCart');
      let user = localStorage.getItem('user');
      this.productdata.quantity= 1;
        if(user){

          let userData= user && JSON.parse(user)[0];
          this.uId=userData.id;
          this.product.getCartList(this.uId);
          
          this.product.cartData.subscribe((res)=>{

            let item= res.filter((item: product)=>proid?.toString()===item.productId?.toString());
            if(item.length){

              this.cartData=item[0];
            }

          })
        }
    })

    if(this.productdata)
    {

      if(!localStorage.getItem('user'))
      {
        this.product.localAddTOCart(this.productdata);
      }
      else
      {

        let user = localStorage.getItem('user');
        let userData= user && JSON.parse(user)[0];
        this.uId=userData.id;

        let cartData: cart={
          ...this.productdata,
          productId: this.productdata.id,
          userId: this.uId,
        }
        delete cartData.id;

        this.product.addToCart(cartData).subscribe((res)=>{
          if(res){
            this.product.getCartList(this.uId);
          }
        });
        this.router.navigate(['cart-page']);
      }

      if(!this.uId){
        alert("Product is added successfully in cart you need to login or signup.")
      }
    }
  }

}
