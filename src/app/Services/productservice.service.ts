import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, orders, product } from '../datatype';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  cartData = new EventEmitter<product[] | []>();
  uId: number|undefined;

  constructor(private http:HttpClient, private router : Router) { }

  addproduct(data:product){

    return this.http.post('http://localhost:3000/products',data)
  }

  productlist(){

    return this.http.get<product[]>('http://localhost:3000/products')
  }

  deleteproduct(id:number){

    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getproduct(id:string){

    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateproduct(product:product){

    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
  }

  popularproducts(){

    return this.http.get<product[]>('http://localhost:3000/products?_limit=5');
  }

  trendyproducts(){

    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchproducts(query:string){

    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddTOCart(data: product){

    let cartData = [];

    let localCart = localStorage.getItem('localCart');

    if(!localCart)
    {
      localStorage.setItem('localCart', JSON.stringify([data]));
    }
    else{
    
      cartData= JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number|undefined){

    let cartData= localStorage.getItem('localCart');
    if(cartData)
    {
      let items : product[]= JSON.parse(cartData);
      items = items.filter((item : product)=>productId!=item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart){
    
    return this.http.post('http://localhost:3000/cart',cartData)
  }

  getCartList(userId: number| undefined){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=`+userId, {observe: 'response'})
    .subscribe((res)=>{

      if(res && res.body)
      {
        this.cartData.emit(res.body)
      }
    })
  }

  removeFromCart(cartId: number){

    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  removeFromCheckout(Id: number| undefined){

    return this.http.delete('http://localhost:3000/cart/'+Id)
  }

  getCartData(userId: number| undefined){
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=`+userId);
  }
  
  orderNow(data:orders){

    return this.http.post('http://localhost:3000/orders',data)
  }

  orderList(){
    let user = localStorage.getItem('user');
    let userData= user && JSON.parse(user)[0];
    this.uId=userData.id;
    return this.http.get<orders[]>(`http://localhost:3000/orders?userId=`+this.uId);
  }

  deleteCartItems(cartId:number){

    return this.http.delete(`http://localhost:3000/cart/=`+cartId).subscribe((res)=>{

      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
  
  reloadsearch(query: string) {
    
  }
}

