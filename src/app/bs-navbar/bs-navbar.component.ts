import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { UserService } from '../user.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {


  constructor(private cartService: ShoppingCartService,
    private userService : UserService){}

    count : number = this.cartService.count ;

    getCount(){
      this.cartService.getCount();
      return this.cartService.count;
    }

    logout(){
      this.userService.access = false;
    }

    
}
