import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../modules/Product';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseApi } from '../modules/ResponseApi';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Array<Product>;
  categories: string[] = [];
  category: string | null = "";
  access: boolean = false;
  total!: number;
  totalPage!: number;
  pageNbr: number = 0;


  pages: Array<Array<Product>> = [];

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService) {
    this.products = new Array<Product>();
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      console.log(this.category);
    });
  }

  affiche($event: string) {
    console.log($event);
  }
  ngOnInit() {
    console.log(this.pageNbr);


    if (this.userService.access) {
      this.getProducts();
      this.getCategories();
      console.log(this.pages);

    } else {
      this.router.navigateByUrl("/login");
    }
  }

  getPage(i: number) {
    console.log(i);
    
    this.products = this.pages[i];
    this.pageNbr = i;
    console.log(this.products);
  }


  searchProduct(search: string) {
    console.log(search);
    this.getProductsBySearch(search)
  }


  public getProducts(): void {
    this.pages = []
    this.pageNbr = 0;
    this.productService.getAll().subscribe(
      (response: ResponseApi) => {
        this.products = response.products;
        this.total = response.total;
        console.log(response);
        console.log(this.total);
        this.getPages();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getTotal() {
    return this.total
  }

  public getPages(): void {
    console.log(this.total);
    let pagesN = Math.floor(this.total / 10);
    this.totalPage = pagesN;
    console.log(pagesN);
    console.log(this.totalPage);
    let i = 0;

    while (i < pagesN) {
      this.productService.getByPage(i).subscribe(
        (response: ResponseApi) => {
          this.pages.push(response.products);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      i = i + 1;
    }

  }

  public getCategoryPages(category: string | null): void {
    this.pages = [];
    let pagesN = Math.floor(this.total / 10);
    let i = 0;

    while (i < pagesN) {
      this.productService.getByCategoryByPage(category, i).subscribe(
        (response: ResponseApi) => {
          this.pages.push(response.products);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      i = i + 1;
    }

  }

  public getSearchPages(category: string | null): void {
    this.pages = [];
    let pagesN = Math.floor(this.total / 10);
    let i = 0;

    while (i < pagesN) {
      this.productService.getBySearchByPage(category, i).subscribe(
        (response: ResponseApi) => {
          this.pages.push(response.products);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      i = i + 1;
    }

  }

  public getProductsBySearch(s: string): void {
    this.productService.getBySearch(s).subscribe(
      (response: ResponseApi) => {
        this.products = response.products;
        this.total = response.total;
        console.log(response);
        console.log(this.total);
        this.getSearchPages(s)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getProductsByCategory(category: string | null): void {
    this.productService.getByCategory(category).subscribe(
      (response: ResponseApi) => {
        this.products = response.products;
        this.total = response.total;
        console.log(this.total);
        console.log(response);
        this.getCategoryPages(category);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
