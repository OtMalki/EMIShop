import { Product } from "./Product";

export class ResponseApi {
  products : Array<Product> = [];
  total!: number

  public constructor(products: Array<Product>) {
    this.products = products;
  }
}
