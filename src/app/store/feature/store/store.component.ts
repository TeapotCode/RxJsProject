import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {ApiService} from "../../data-access/api.service";
import {catchError, EMPTY, map, Observable, tap} from "rxjs";
import {User} from "../../utils/user.interface";
import {ProductsComponent} from "../../ui/products/products.component";
import {AuthService} from "../../data-access/auth.service";
import {Dialog} from "@angular/cdk/dialog";
import {retryPopUp} from "../../utils/retry-pop-up";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreComponent {

  users$: Observable<User[]> = this.api.getUsers().pipe(catchError(() => EMPTY))
  categories$: Observable<string[]> = this.api.getCategories().pipe(catchError(() => EMPTY))
  isUserLogIn$: Observable<boolean> = this.auth.token.pipe(map(value => !!value));

  constructor(private api: ApiService, private auth: AuthService, private dialog: Dialog, private injector: Injector) {
  }

  getProducts(category: string) {
    this.api.getInCategory(category)
      .pipe(
        tap(response => this.dialog.open(ProductsComponent, {data: response, hasBackdrop: true, panelClass: 'modal'})),
        retryPopUp(this.injector),
        catchError(() => EMPTY)
      ).subscribe()
  }

  onLogin() {
    this.auth.login("donero", "ewedon").subscribe()
  }
}
