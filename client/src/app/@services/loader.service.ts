import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  counter$: Subject<boolean> = new Subject();
  constructor() {}
}
