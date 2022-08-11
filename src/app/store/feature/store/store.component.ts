import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {ApiService} from "../../data-access/api.service";
import {delay, map, Observable, Subject, tap} from "rxjs";
import {User} from "../../utils/user.interface";
import {ProductsComponent} from "../../ui/products/products.component";
import {AuthService} from "../../data-access/auth.service";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreComponent {

  users$: Observable<User[]> = this.api.getUsers()
  categories$: Observable<string[]> = this.api.getCategories()
  isUserLogIn$: Observable<boolean> = this.auth.token.pipe(map(value => !!value));

  isLoading$ = new Subject<boolean>();

  constructor(private api: ApiService, private auth: AuthService, private dialog: Dialog, private injector: Injector) {
  }

  getProducts(category: string) {
    this.isLoading$.next(true)

    this.api.getInCategory(category)
      .pipe(
        delay(0),
        tap({
          next: response => {
            this.dialog.open(ProductsComponent, {data: response, hasBackdrop: true, panelClass: 'modal'})
          },
          error: () => this.isLoading$.next(false),
          complete: () => this.isLoading$.next(false)
        })
      ).subscribe()
  }

  onLogin() {
    this.auth.login("donero", "ewedon").subscribe()
  }
}
