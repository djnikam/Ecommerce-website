import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product } from '../datatype';
import { ProductserviceService } from '../Services/productservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  productdata: undefined| product;
  proquantity:number=1;
  removeCart= false;
  uId: number| undefined;
  cartData: undefined|product;

  constructor(private actroute: ActivatedRoute, private product : ProductserviceService, private router : Router){};

  ngOnInit() : void{

    let proid= this.actroute.snapshot.paramMap.get('productid');
    
    proid &&  this.product.getproduct(proid).subscribe((res)=>{

    this.productdata=res;
    let cartData= localStorage.getItem('localCart');

    if(proid && cartData)
    {
      let items = JSON.parse(cartData);
      items= items.filter((item: product)=>proid===item.id.toString());
      if(items.length)
      {
        this.removeCart=true;
      }
      else
      {
        this.removeCart=false;
      }
    }

        let user = localStorage.getItem('user');
        if(user){

          let userData= user && JSON.parse(user)[0];
          this.uId=userData.id;
          this.product.getCartList(this.uId);
          
          this.product.cartData.subscribe((res)=>{

            let item= res.filter((item: product)=>proid?.toString()===item.productId?.toString());
            if(item.length){

              this.cartData=item[0];
              this.removeCart=true;
            }

          })
        }
    });
  }

  quantity(val : string)
  {
    if(this.proquantity<50 && val==='plus')
    {
      this.proquantity+=1;
    }
    else if(this.proquantity>1 && val==='min')
    {
      this.proquantity-=1;
    }

  };

  addTOcart(){

    if(this.productdata)
    {
      this.productdata.quantity= this.proquantity;

      if(!localStorage.getItem('user'))
      {
        this.product.localAddTOCart(this.productdata);
        this.removeCart=true;
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
            this.removeCart=true;
          }
        });
      }
    }

    if(!this.uId){
      alert("Product is added successfully in cart you need to login or signup.")
    }
  }

  removeFromcart(productId : number){

    if(!localStorage.getItem('user'))
    {
      this.product.removeItemFromCart(productId);
      this.removeCart=false;
    }
    else
    {
      this.cartData && this.product.removeFromCart(this.cartData.id).subscribe((res)=>{
        this.product.getCartList(this.uId);
        this.removeCart=false;
      })
    }
  }

  buyNow(){

    if(this.productdata)
    {
      this.productdata.quantity= this.proquantity;

      if(!localStorage.getItem('user'))
      {
        this.product.localAddTOCart(this.productdata);
        this.removeCart=true;
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
            this.removeCart=true;
          }
        });
      }
    }
    if(this.uId)
    {
      
    this.router.navigate(['checkout']);
    }
    else{
      alert("To buy you need to Login or Signup.")
    }
  }
}
