import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ApiService} from "../../data-access/api.service";
import {map, Observable, switchMap, tap} from "rxjs";
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

  constructor(private api: ApiService, private auth: AuthService, private dialog: Dialog) {
  }

  getProducts(category: string) {
    this.api.getInCategory(category)
      .pipe(
        tap(response => this.dialog.open(ProductsComponent, {data: response}))
      ).subscribe()
  }

  onLogin() {
    this.auth.login("donero", "ewedon").subscribe()
  }
}
