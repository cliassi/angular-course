import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './@services/loader.service';
import { tap, finalize } from 'rxjs/operators';
import { StorageService } from './@services/storage.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const auth = this.storageService.get('auth');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    this.loaderService.counter$.next(true);
    return next.handle(request).pipe(
      tap((event) => {}),
      finalize(() => {
        console.log('Call complete');
        setTimeout(() => {
          this.loaderService.counter$.next(false);
        }, 2000);
      })
    );
  }
}
