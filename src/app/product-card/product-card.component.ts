import { Component, Input } from '@angular/core';
import { Product } from '../modules/Product';
import { ShoppingCartService } from '../shopping-cart.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {

  
  @Input('product') product!: Product;

  constructor(private cartService: ShoppingCartService,
    private modalService: NgbModal) { }

    
    
  addToCart(product: Product) {
    this.cartService.add(product);
    console.log(this.cartService.cart)
    this.cartService.getCount();
  }

  open(content:any) {
		this.modalService.open(content);
	}


  tinyAlert() {
    Swal.fire('Hey there!');
  }
  successNotification() {
    Swal.fire('Success', 'The product has been added to your cart!', 'success');
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

}
