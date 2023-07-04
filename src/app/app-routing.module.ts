import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SellerComponent } from './seller/seller.component';
import { UserComponent } from './user/user.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [

  {path:'' , component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'seller',component:SellerComponent},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[AuthGuard]},
  {path:'seller-add-product',component:SellerAddProductComponent, canActivate:[AuthGuard]},
  {path:'seller-update-product/:id', component:SellerUpdateProductComponent, canActivate:[AuthGuard]},
  {path:'search/:query', component:SearchComponent},
  {path:'product-details/:productid', component:ProductDetailsComponent},
  {path:'user', component:UserComponent},
  {path:'cart-page' , component:CartPageComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'my-orders', component:MyOrdersComponent},
  {path:'**', component:PageNotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
