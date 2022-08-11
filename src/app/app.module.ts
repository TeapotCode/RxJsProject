import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreComponent} from './store/feature/store/store.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./store/utils/interceptors/token.interceptor";
import {ProductsComponent} from './store/ui/products/products.component';
import {DialogModule} from "@angular/cdk/dialog";
import {CategoriesComponent} from './store/ui/categories/categories.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RetryInterceptor} from "./store/utils/interceptors/retry.interceptor";
import {LoadingInterceptor} from "./store/utils/interceptors/loading.interceptor";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {interceptorProvider} from "./store/utils/interceptors/interceptorProvider";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

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
    MatProgressBarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  providers: [
    interceptorProvider(TokenInterceptor),
    interceptorProvider(RetryInterceptor),
    interceptorProvider(LoadingInterceptor),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
