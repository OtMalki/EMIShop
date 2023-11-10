import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: string[] = [];

  constructor(private categoryService: CategoryService, private productService: ProductService) {
  }
  affiche($event: string) {
    console.log($event);
  }
  ngOnInit() {
    this.getCategories();
  }

  save(product: ProductFormComponent) {
    console.log(product);
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: string[]) => {
        this.categories = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
