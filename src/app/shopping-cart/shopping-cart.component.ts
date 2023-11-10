import { Component, OnInit } from '@angular/core';
import { ProductDetail } from '../modules/Product-detail';
import { Product } from '../modules/Product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{

  cart: Array<ProductDetail> = [];

  sum : number = 0;

  constructor(private cartService: ShoppingCartService){}

  affiche($event: string) {
    console.log($event);
  }
  ngOnInit() {
    this.getProducts();
    this.getSum();
  }


  public getProducts(): void {
    this.cart = this.cartService.cart;
  }

  public getSum(): void{
    this.cart.forEach(element => {
      this.sum = this.sum + (element.product.price * element.quantity);
    });
  }

  deleteProductFromCart(product : ProductDetail){
    const index = this.cart.indexOf(product);
    
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    console.log(this.sum);
    this.sum = this.sum - product.product.price * product.quantity;
    console.log(this.sum);

  }


}
