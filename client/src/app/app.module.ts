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
  EntityDataModule,
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import {
  ProductDataService,
  ProductEntityService,
  ProductResolver,
} from './products/product.entity.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ParentComponentComponent } from './pagesw/parent-component/parent-component.component';
import { ChildOneComponent } from './pagesw/child-one/child-one.component';
import { ChildTwoComponent } from './pagesw/child-two/child-two.component';
import { ChildThreeComponent } from './pagesw/child-three/child-three.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
firebase.initializeApp(environment.firebaseConfig);
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    ParentComponentComponent,
    ChildOneComponent,
    ChildTwoComponent,
    ChildThreeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TabsModule,
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
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
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
