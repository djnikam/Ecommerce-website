import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { SellerService } from './Services/seller.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ecommerseweb';

  constructor(private seller: SellerService ){}
   ngOnInit(){
    this.seller.reloadseller();
   }
}


