import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.servics";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private ProductService: ProductsService, public dialog: MatDialog) {}

  products: IProducts[];
  productSubscription: Subscription;

  basket: IProducts[];
  basketSubscription: Subscription;

  canEdit: true;

  ngOnInit(): void {
    this.canEdit = true;

    this.productSubscription = this.ProductService.getProducts().subscribe((data) => {
      this.products = data;
    })

    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe( (data) => {
      this.basket = data;
    })
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;

    let findItem;
    if (this.basket.length > 0) {
      findItem = this.basket.find( (item) => item.id === product.id)
      if (findItem) this.updateToBasket(findItem)
      else this.postToBasket(product)
    } else {
      this.postToBasket(product)
    }
  }

  postToBasket(product: IProducts) {
    this.ProductService.postProductToBasket(product).subscribe( (data) => {
      this.basket.push(data)
    })
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductService.updateProductBasket(product).subscribe((data => {

  }))
  }

  deleteItem(id: number) {
    this.ProductService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((item) => item.id !== id);
    });
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( (data) => {

      if  (data) {
        if (data && data.id)
          this.updateData(data);
        else
          this.postData(data);
      }
    })
  }

  postData(data: IProducts) {
    this.ProductService.postProduct(data).subscribe( (data) => this.products.push(data))
  }

  updateData(product: IProducts) {
    this.ProductService.updateProduct(product).subscribe( (data) => {
      this.products = this.products.map( (product) => {
        if (product.id === data.id) return data
        else return product
      })
    })
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe()
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }
}
