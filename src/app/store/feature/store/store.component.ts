import {ChangeDetectionStrategy, Component, HostListener, Renderer2} from '@angular/core';
import {ApiService} from "../../data-access/api.service";
import {map, Observable, tap} from "rxjs";
import {User} from "../../utils/user.interface";
import {ProductsComponent} from "../../ui/products/products.component";
import {AuthService} from "../../data-access/auth.service";
import {Dialog} from "@angular/cdk/dialog";
import {LoadingService} from "../../data-access/loading.service";

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

  isLoading$ = this.loading.isLoading$;

  constructor(private api: ApiService, private auth: AuthService, private dialog: Dialog, private loading: LoadingService) {
  }

  getProducts(category: string) {
    this.api.getInCategory(category)
      .pipe(
        tap(response => this.dialog.open(ProductsComponent, {data: response, hasBackdrop: true, panelClass: 'modal'}))
      ).subscribe()
  }

  onLogin() {
    this.auth.login("donero", "ewedon").subscribe()
  }
}
