import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators,FormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';
import {Router} from '@angular/router'
import { login, signup } from '../datatype';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user_sign_up !: FormGroup;
  user_log_in !: FormGroup;

  constructor(private fb : FormBuilder,private user: UserService,private router : Router){}

  ngOnInit(){
    this.user.reloadseller(),
    this.user_sign_up= this.fb.group({
      u_nm:[""],
      email:[""],
      password:[""]
    });

    this.user_log_in= this.fb.group({
      u_nm:[""],
      email:[""],
      password:[""]
    })
  }


  signup(data: signup):void
  {
    this.user.userSignup(data);
    this.localTORemoteCart();
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
    this.user.userlogin(data)
    this.user.isLoginError.subscribe((iserror)=>{
      if(iserror)
      {
        this.autherror="Invalid email or password";
      }
    });
    
    setTimeout(()=>this.autherror=undefined,3000);
  }


  localTORemoteCart(){
    
    console.warn("Called")
  }
 

}
