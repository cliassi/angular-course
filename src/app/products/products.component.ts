import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  //placeholder/form
  product: Product = {} as Product;
  currnetIndex: number = 1;

  ngOnInit() {
    this.reload();
  }

  reload() {
    var products =
      localStorage.getItem('product') ?? JSON.stringify({} as Product);
    this.products = JSON.parse(products);
    this.currnetIndex = this.products.length + 1;
  }

  save() {
    if (this.product.id > 0) {
      // Update
      localStorage.setItem('product', JSON.stringify(this.products));
      var product = {} as Product;
      this.product = product;
    } else {
      //Add
      this.product.id = this.currnetIndex;
      this.products.push(this.product);
      localStorage.setItem('product', JSON.stringify(this.products));
      var product = {} as Product;
      this.product = product;
      this.currnetIndex++;
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
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(this.products));
  }
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
}
