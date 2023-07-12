<!-- Steps to set json server -->
1.Json server Installed on laptop
2.Create db.json file 
3. run command : json-server --watch db.json in folder of db.json
4. then open resource from website of json
5. open postman choose post and then paste link and choose bosy raw data json and send the data

<!-- Integreating json server with signupu page -->
1.Created service folder in which seller service is created
2. then sellersignup function is created 
3. in seller.component.ts file we import the http service and in appmodule.ts we import HTtpclientmodule and declare it
4.then we post data using http object use subscribe
5. Created a new componet seller-home and route to it after clicking the signup use navigate functiopn and router object give path of router
6. Create datatype.ts file with signup iterface to add it instead of datatype any

<!-- Auth Gaurd for seller -->
1.Create a Guard using command ng g guard guard_name
2.Then goto the app.routing module.ts and then goto seller-home path add canActivate:[Authguard]
3.Then create issellersignup boolean value in services and then import services into the auth.guard.ts
4.In seller service import router cretae object oif it in counstructor and using navigate function navigate to seller home page
5. Now when we refresh we goto sign up page then hence we need to store the signup data in database using  localStorage.setItem('seller',JSON.stringify(result.body))
6.create method reloadseller in seller sevice 
7. now for the when we logged in but gto home then for staying sign in use
    if(localStorage.getItem('seller')){  
      return true;
    }                                                 in authguard.ts

    <!-- Seller Login form created -->
  copy the seller signup form and make appropiate changes.


    <!--Seller Login API  -->

1.create interface login in datatypes.ts
2. write service in seller service that is sellerlogin
3.start json server and check user by http://localhost:3000/seller?email=tony@gmail.com&password=tony@123
4.note write in `` back tick
5.then emmit the invalid email or password using event emmitor

<!-- Now lets add the router in header for logout and other header changes purpose -->

1.added switch case in html

<!-- Added Name of seller -->
 let sellerStore=localStorage.getItem('seller');
              let sellerData= sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName=sellerData.name;

***By using this we find out the sellr name ****

<!-- Adding Add product -->

1. Add component addproduct
2. add auth in routing path

<!-- Add Product  Form and UI-->

1.Create form Of add Product

<!-- Create API for the Add product -->

1.create product service
2. add products in datatype.ts
3. call the service in add product component.ts


<!-- Product List -->
1.Create function in product service
2. call it in seller home function by importing service
3. get the seller product type of data with API 


<!--  Deelete Poducts from website-->

1.First add buttons set fuction for deleting pro
2.then write  a function by deleting product
3. Write a service to delete product from API
4. call the service into the function

<!-- Fon-Awesome Delete  -->
1.Delete Icon Added by dw=ownloading Font-awesome

<!--  Creating Update Product UI-->
1. Create A component for updateproduct
2. add routing
3. send the id through html and add colon: id in routing so route will understand it may receive dynamic Id

<!-- Prefilled update page -->
1.Form Group is created and id is taken in update component.ts file
2.Create service getserv in product services
3.now call the serv in component.ts in update
4.Add all data in prouctdata of type product
5. Using ng model access those data in html

<!-- Updating value in API -->
1. Make update service
2. call it in component.ts file
3. Show msg in html

<!-- Adding corsoul in Home Page -->
1.Download Bottstrap in by goin website angular powered BOotstrap
2.Add this ng add @ng-bootstrap/ng-bootstrap  to add bootstrap in project
3.If error occur use command npm config set legacy-peer-deps true
4.Copy code of corsoul from web and paste in website
5.Create the service as popularproducts to get the products from API

<!--display  product list in home page  -->
1.Create a static web page for display poduct lsit
2.To make it dynamic create service to call API
3.get data in componnet
4. similar like popularproducts service

<!-- Auto serach and search mode -->
1.http://localhost:3000/products?q=mobile search query for JSOn in Browser
2.create the search service using above query
3.Create the searchprodct function in header component.ts file and pass event $event in html
4.apply approppiate css 

<!-- Creating search page UI -->
1. create new component
2.create event pass the input from input to the next page 
3. route to search page using query
4. Apply Appropiate html and css for search pah=ge

<!-- Adding dynamic serach results -->
1. import activated route in search.ts
2. call service and add th html code

<!-- Product Details -->
1. Create component product details
2. Add route and pass product Id
3. to show details on serch result use (mousedown)="redirecttoDetails(ele.id)"

<!-- Creating user  -->
Similar like that of Seller

<!--Validators   -->

<!-- add to cart DB -->
1. created without user login now add with user data
2. we have create cart API
3. set datatypes of cart
4. create service for storing data of cart in Server
5. Call the service and additionally add poduct and user id ad delete card id because it will automatically generated by JSON server

<!-- Local data to DB -->
1. Created service beacause some Error is occuring in ts it not displaying any value on console
2. creted localToDBCart service
