import { Injectable } from '@angular/core';
import { Product } from './modules/Product';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from './modules/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products : Array<Product> = [];

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<ResponseApi>("https://dummyjson.com/products?limit=10");
  }

  getByCategory(category : string | null){
    return this.http.get<ResponseApi>("https://dummyjson.com/products/category/"+category);
  }

  getByCategoryByPage(category : string | null , page : number){
    return this.http.get<ResponseApi>("https://dummyjson.com/products/category/"+category +"?limit=10&skip="+(page)*10);
  }

  getBySearch(search : string | null){
    return this.http.get<ResponseApi>("https://dummyjson.com/products/search?q="+search+"&limit=10");
  }
  getBySearchByPage(search : string | null , page : number){
    return this.http.get<ResponseApi>("https://dummyjson.com/products/search?q="+search +"&limit=10&skip="+(page)*10);
  }

  getByPage(page : number){
    return this.http.get<ResponseApi>("https://dummyjson.com/products?limit=10&skip="+(page)*10);
    
  }

}
