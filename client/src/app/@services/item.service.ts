import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../@models/product';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  collection = 'items';
  constructor(private firestore: AngularFirestore) {}

  create(item: Product) {
    return this.firestore.collection(this.collection).add(item);
  }

  get() {
    return this.firestore.collection(this.collection).snapshotChanges();
  }

  update(item: Product) {
    const id = item.id;
    return this.firestore.doc(this.collection + '/' + id).update({ ...item });
  }

  remove(id: string) {
    return this.firestore.doc(this.collection + '/' + id).delete();
  }
}
