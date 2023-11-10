import { Injectable } from '@angular/core';
import { Product } from './modules/Product';
import { ProductDetail } from './modules/Product-detail';

@Injectable()
export class ShoppingCartService {

  constructor() { }

  cart: Array<ProductDetail> = [];

  sum : number = 0;
  
  count : number = 0;

  add(product: Product) {
    // console.log(this.findByProduct(product));
    console.log(this.cart)
    // this.cart.forEach(element => {
    //   if (element.product == product) {element.quantity = element.quantity + 1;return;}
    // });
    const f = this.cart.find((obj) => {
      return obj.product.id == product.id;
    });
    console.log(f);
    if(f == null){this.cart.push(new ProductDetail(product, 1));}
    else {f.quantity = f.quantity + 1;}
  }

  findByProduct(product: Product): boolean | any {
    this.cart.forEach(element => {
      if (element.product == product) return true;
    }
    );
    return false;
  }

  getCount(){
    this.count = this.cart.length;
  }
}
