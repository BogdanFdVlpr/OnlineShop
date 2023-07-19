import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IProducts} from "../models/products";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  url: string = 'http://localhost:3000/products'
  urlBasket: string = 'http://localhost:3000/basket'
  constructor(private hhtp: HttpClient) {
  }

  getProducts() {
    return this.hhtp.get<IProducts[]>(this.url);
  }

  getProduct(id: number) {
    return this.hhtp.get<IProducts>(`${this.url}/${id}`);
  }
  postProduct(product: IProducts) {
    return this.hhtp.post<IProducts>(this.url, product)
  }

  deleteProduct(id: number) {
    return this.hhtp.delete<any>(`${this.url}/${id}`)
  }

  updateProduct(product: IProducts) {
    return this.hhtp.put<IProducts>(`${this.url}/${product.id}`, product)
  }

  postProductToBasket(product: IProducts) {
    return this.hhtp.post<IProducts>(this.urlBasket, product)
  }

  getProductFromBasket() {
    return this.hhtp.get<IProducts[]>(this.urlBasket);
  }

  updateProductBasket(product: IProducts) {
    return this.hhtp.put<IProducts>(`${this.urlBasket}/${product.id}`, product)
  }

  deleteProductFromBasket(id: number) {
    return this.hhtp.delete<any>(`${this.urlBasket}/${id}`)

  }
}
