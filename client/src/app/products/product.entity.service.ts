import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  HttpUrlGenerator,
} from '@ngrx/data';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from '../@models/product';

// EntityService
@Injectable()
export class ProductEntityService extends EntityCollectionServiceBase<Product> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}

// Resolver
@Injectable()
export class ProductResolver implements Resolve<boolean> {
  constructor(private productService: ProductEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.productService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.productService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}

@Injectable()
export class ProductDataService extends DefaultDataService<Product> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Product', http, httpUrlGenerator);
  }
  entityUrl = environment.apiEndpoint + '/Products/';
  entitiesUrl = environment.apiEndpoint + '/Products';
  // add(color: Product): Observable<Product> {
  //   return this.http.post(this.entityUrl, color).pipe(map((res: Product) => res));
  // }
}
