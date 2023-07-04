import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { product } from '../datatype';
import { ProductserviceService } from '../Services/productservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchResult : undefined| product[];
  searchproduct : undefined| product[];
  
  constructor(private activeroute : ActivatedRoute, private product : ProductserviceService, private router : Router, public loc : Location){};

  ngOnInit() : void{

    let query = this.activeroute.snapshot.paramMap.get('query');

    query && this.product.searchproducts(query).subscribe((result)=>{

      this.searchResult=result;

      this.router.navigate([`search/${query}`]);
    })

  }

}
