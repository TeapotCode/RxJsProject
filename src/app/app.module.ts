import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreComponent} from './store/feature/store/store.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./store/utils/token.interceptor";
import {ProductsComponent} from './store/ui/products/products.component';
import {DEFAULT_DIALOG_CONFIG, DialogModule} from "@angular/cdk/dialog";
import {CategoriesComponent} from './store/ui/categories/categories.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: DEFAULT_DIALOG_CONFIG, useValue: {hasBackdrop: true, panelClass: 'modal'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
