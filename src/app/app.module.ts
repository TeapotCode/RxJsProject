import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreComponent} from './store/feature/store/store.component';
import {HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./store/utils/interceptors/token.interceptor";
import {ProductsComponent} from './store/ui/products/products.component';
import {DialogModule} from "@angular/cdk/dialog";
import {CategoriesComponent} from './store/ui/categories/categories.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {interceptorProvider} from "./store/utils/interceptors/interceptorProvider";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {PillComponent} from './store/ui/pill/pill.component';
import {SearchComponent} from './store/feature/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ProductsComponent,
    CategoriesComponent,
    PillComponent,
    SearchComponent,
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
        MatInputModule,
        ReactiveFormsModule
    ],
  providers: [
    interceptorProvider(TokenInterceptor),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
