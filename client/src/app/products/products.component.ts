import { Component, OnInit } from '@angular/core';
import { Product } from '../@models/product';
import { ItemService } from '../@services/item.service';
import { ProductServiceService } from '../@services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = ['Electronics', 'Groceries', 'Cooked Food'];

  constructor(
    private itemService: ItemService,
    private productService: ProductServiceService
  ) {}

  //placeholder/form
  product: Product = {} as Product;
  currnetIndex: number = 1;
  date = new Date();

  ngOnInit() {
    debugger;
    this.productService.get().subscribe((res: Product[]) => {
      this.products = res;
    });
    // this.itemService.get().subscribe((data: any) => {
    //   this.products = data.map((e: any) => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data(),
    //     } as Product[];
    //   });
    // });
  }

  save() {
    if (this.product.id) {
      this.productService.update(this.product).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.productService.create(this.product).subscribe(
        (res: any) => {
          this.product = res;
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    // if (this.product.id) {
    //   this.itemService.update(this.product);
    // } else {
    //   this.itemService.create(this.product);
    // }
  }

  remove() {
    if (this.product.id) {
      this.productService.remove(this.product.id);
    }
  }

  editProduct(product: Product) {
    this.product = product;
  }
  deleteProduct(product: Product) {
    this.productService.remove(product.id).subscribe(
      (res) => {
        console.log('removed');
      },
      (error) => {
        console.log(error);

        alert('error');
      }
    );

    // this.itemService.remove(product.id).then((res) => {
    //   alert("Yey! it's gone");
    // });
    // this.productService.delete(product);
  }
}
