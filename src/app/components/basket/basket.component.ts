import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.servics";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements
  OnInit,
  OnDestroy {
  constructor(private ProductService: ProductsService) {
  }
  basket: IProducts[];
  basketSubscription: Subscription;

  ngOnInit(): void {
    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe( (data) => {
      this.basket = data
    });
  }

  minusItemFromBasket(item: IProducts) {
    if (item.quantity === 1) {
    this.ProductService.deleteProductFromBasket(item.id).subscribe( () => {
      let idx = this.basket.findIndex( (data) => data.id === item.id)
      this.basket.splice(idx, 1)
    })
  }
    else  {
      item.quantity -= 1;
      this.ProductService.updateProductBasket(item).subscribe( (data) => {})
    }
  }

  plusItemFromBasket(item: IProducts) {
    item.quantity += 1;
    this.ProductService.updateProductBasket(item).subscribe( (data) => {})
  }
  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }
}
