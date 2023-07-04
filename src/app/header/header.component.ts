import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { cart, product } from '../datatype';
import { ProductserviceService } from '../Services/productservice.service';
import { faCartShopping, faHome, faSignOut, faStore } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuType : string='default';
  menuType1 : string='default';
  sellerName: string='';
  userName: string ='';
  searchproduct : undefined| product[];
  cartItems = 0;
  cart = faCartShopping;
  home = faHome;
  lout = faSignOut;
  store = faStore;
  searchResult : undefined| product[];
  showCart= false;

  public isCollapsed = true;

  constructor(private route : Router, private rt : ActivatedRoute, private product: ProductserviceService, public loc : Location, private activeroute: ActivatedRoute, private user : UserService){};

  ngOnInit():void{

    this.route.events.subscribe((val:any)=>{
      if(val.url)
      {
        if(localStorage.getItem('seller') && val.url.includes('seller')){
            this.menuType="seller";
            
            if(localStorage.getItem('seller'))
            {
              let sellerStore=localStorage.getItem('seller');
              let sellerData= sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName=sellerData.u_nm;
            }
        }
        else{
          this.menuType="default";
        }
      }

    });

    this.route.events.subscribe((val:any)=>{
      if(val.url)
      {
        if(localStorage.getItem('user')){
            this.menuType1="user";
            
            if(localStorage.getItem('user'))
            {
              let userStore=localStorage.getItem('user');
              let userData= userStore && JSON.parse(userStore)[0];
              this.userName=userData.u_nm;
              this.product.getCartList(userData.id);
            }
        }
        else{
          this.menuType1="default";
        }
      }

    });

    let cartData = localStorage.getItem('localCart');

    if(cartData){
      this.cartItems=JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{

      this.cartItems=items.length;
    });

   
  }

  

  // For logout the seller
  logout(){  
    localStorage.removeItem('seller');
    this.route.navigate(['seller']);
  }
  logoutuser(){  
    localStorage.removeItem('user');
    this.route.navigate(['home']);
    this.product.cartData.emit([]);
  }

  searchprodct(query:KeyboardEvent){

    const element = query.target as HTMLInputElement;

    this.product.searchproducts(element.value).subscribe((res)=>{

      if(res.length>5)
      {
        res.length=5;
      }
      this.searchproduct=res;
    })

  }

  hidesearch(){
    this.searchproduct=undefined;
  }

  searchclick(val:string){

    this.route.navigate([`search/${val}`]);

  }

  redirecttoDetails(id : number){

    this.route.navigate(['/product-details/'+id]);
  }

}
