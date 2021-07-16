import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  counter: number = 0;
  counter$: Subject<number> = new Subject();

  constructor() {}

  inc() {
    this.counter++;
    this.counter$.next(this.counter);
  }

  dec() {
    this.counter--;
    this.counter$.next(this.counter);
  }
}
