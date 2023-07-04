import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { SellerService } from '../Services/seller.service';
import {Router} from '@angular/router'
import { login, signup } from '../datatype';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent {

  
  sign_up1!: FormGroup;
  log_in1!:FormGroup;

  constructor(private fb : FormBuilder,private seller: SellerService,private router : Router){}

  ngOnInit(){
    
    this.seller.reloadseller(),
    this.sign_up1= this.fb.group({
      u_nm:[""],
      email:[""],
      password:[""]
    })
    this.log_in1= this.fb.group({
      u_nm:[""],
      email:[""],
      password:[""]
    })
  }


  signup(data: signup):void
  {
    this.seller.sellerSignup(data);
    // this.seller.sellerSignup(data).subscribe((result)=>{
    //   this.router.navigate(['seller-home']);
    // }); 
  }

  // clear()
  // {
  //   this.sign_up1.reset();
  //   this.log_in1.reset();
  //   this.autherror="";
  // }

  showLogin =true;
  openLogin()
  {
    this.showLogin=true;
  }

  opensignin(){
    this.showLogin=false;
  }

  autherror:undefined|string='';
  login(data: signup):void
  {
    this.autherror="";
    this.seller.sellerlogin(data);
    this.seller.isLoginError.subscribe((iserror)=>{
      if(iserror)
      {
        this.autherror="Invalid email or password";
      }
    })
    
    setTimeout(()=>this.autherror=undefined,3000);
  }
}
