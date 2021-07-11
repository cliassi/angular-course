import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import firebase from 'firebase';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DigitOnlyDirective } from './@directives/digit-only.directive';
import { CustomeDatePipe } from './@pipes/custome-date.pipe';
import { LoaderInterceptor } from './loader.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import {
  ProductDataService,
  ProductEntityService,
  ProductResolver,
} from './products/product.entity.service';
firebase.initializeApp(environment.firebaseConfig);

const entityMedadata: EntityMetadataMap = {
  Product: {},
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    RegisterComponent,
    LoginComponent,
    DigitOnlyDirective,
    CustomeDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: false,
        strictStateSerializability: true,
      },
    }),
  ],
  providers: [
    EntityDefinitionService,
    EntityDataService,
    ProductDataService,
    ProductEntityService,
    ProductResolver,
    DigitOnlyDirective,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private productDataService: ProductDataService
  ) {
    eds.registerMetadataMap(entityMedadata);
    entityDataService.registerService('Product', productDataService);
  }
}
