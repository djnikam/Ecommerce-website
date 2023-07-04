export interface signup{
    name : string,
    email: string,
    password:string
}

export interface login{
    email: string,
    password:string
}

export interface product{
     pro_nm:string,
      pro_price:number,
      pro_color:string,
      pro_catg:string,
      pro_desc:string,
      pro_url:string,
      id:number,
      quantity: undefined|number,
      productId: undefined|number
}

export interface cart{
      pro_nm:string,
      pro_price:number,
      pro_color:string,
      pro_catg:string,
      pro_desc:string,
      pro_url:string,
      id:number | undefined,
      quantity: undefined|number,
      productId: number | undefined,
      userId: number| undefined
}

export interface priceSummary{
   
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}
export interface order{
   
    email:string,
    address:string,
    contact: string
}
export interface orders{
   
    email:string,
    address:string,
    contact: string,
    totalprice: number,
    userId: number|undefined,
    id: number| undefined
}