import { Component, OnInit } from '@angular/core';
import { Product } from '../@models/product';
import { ItemService } from '../@services/item.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private itemService: ItemService) {}

  //placeholder/form
  product: Product = {} as Product;
  currnetIndex: number = 1;

  ngOnInit() {
    this.itemService.get().subscribe((data: any) => {
      this.products = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Product[];
      });
    });
  }

  save() {
    if (this.product.id) {
      this.itemService.update(this.product);
    } else {
      this.itemService.create(this.product);
    }
  }

  remove() {
    localStorage.clear();
    this.product = {} as Product;
  }

  editProduct(product: Product) {
    this.product = product;
  }
  deleteProduct(product: Product) {
    this.itemService.remove(product.id).then((res) => {
      alert("Yey! it's gone");
    });
    // this.productService.delete(product);
  }
}
