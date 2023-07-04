import { Component } from '@angular/core';
import { product } from '../datatype';
import { ProductserviceService } from '../Services/productservice.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {

  productlist: undefined | product[];
  delmsg:undefined|string;


  delicon=faTrash;
  editicon=faEdit;

  constructor(private product: ProductserviceService){};

  ngOnInit(): void {

    this.pro_list();

  }

  deleteproduct(id:number){

    this.product.deleteproduct(id).subscribe((result)=>{

      if(result)
      {
        this.delmsg="Product is deleted successfully."
        this.pro_list();
      }
    })
    setTimeout(() => {

      this.delmsg=undefined;
    },3000);
  }

  pro_list()
  {
    this.product.productlist().subscribe((result)=>{

      this.productlist=result;
    })
  }
}
