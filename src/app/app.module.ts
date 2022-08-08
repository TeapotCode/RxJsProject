import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreComponent} from './store/feature/store/store.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./store/utils/token.interceptor";
import { ProductComponent } from './store/ui/product/product.component';
import {DialogModule} from "@angular/cdk/dialog";

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
