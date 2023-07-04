import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { product } from '../datatype';
import { ProductserviceService } from '../Services/productservice.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {

  Addproduct!:FormGroup;

  constructor(private fb : FormBuilder, private product:ProductserviceService){}

  addprmsg:string|undefined;

  ngOnInit(){
    this.Addproduct= this.fb.group({
      pro_nm:[""],
      pro_price:[],
      pro_color:[""],
      pro_catg:[""],
      pro_desc:[""],
      pro_url:[""]
    })

  }

  submit(data:product){
    
    this.product.addproduct(data).subscribe((result)=>{
      console.log(result);
      if(result)
      {
        this.addprmsg="Product is added successfully."
      }

      setTimeout(()=>this.addprmsg=undefined,3000);
    })
  }

  

}
