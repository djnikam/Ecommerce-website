import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../datatype';
import { ProductserviceService } from '../Services/productservice.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent {

  updateproduct!:FormGroup;
  productData:undefined|product;
  proupdatemsg:undefined|string;

  constructor(private fb : FormBuilder, private route: ActivatedRoute, private prouct:ProductserviceService, private rt:Router){};

  ngOnInit(){

    this.updateproduct= this.fb.group({
      pro_nm:[""],
      pro_price:[],
      pro_color:[""],
      pro_catg:[""],
      pro_desc:[""],
      pro_url:[""]
    });

    let proid= this.route.snapshot.paramMap.get('id');

    proid && this.prouct.getproduct(proid).subscribe((res)=>{

      this.productData=res;
    })
  }

  submit(data:product){

    if(this.productData)
    {
      data.id=this.productData.id;
    }
    
    this.prouct.updateproduct(data).subscribe((result)=>{

      if(result){
        this.proupdatemsg="Product is updated successfully."
      }
    });

    setTimeout(()=>{

      this.proupdatemsg=undefined;
      this.rt.navigate(['seller-home']);
    },2000);

    
  }
}
