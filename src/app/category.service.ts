import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseCat } from './modules/ResponseCat';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get<string[]>("https://dummyjson.com/products/categories");
  }
}
