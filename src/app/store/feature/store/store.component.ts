import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {ApiService} from "../../data-access/api.service";
import {catchError, delay, EMPTY, map, Observable, Subject, tap} from "rxjs";
import {User} from "../../utils/user.interface";
import {ProductsComponent} from "../../ui/products/products.component";
import {AuthService} from "../../data-access/auth.service";
import {Dialog} from "@angular/cdk/dialog";
import {retryPopUp} from "../../utils/retry-pop-up";
import {LoadingService} from "../../data-access/loading.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoadingService]
})
export class StoreComponent {

  users$: Observable<User[]> = this.api.getUsers()
  categories$: Observable<string[]> = this.api.getCategories()
  isUserLogIn$: Observable<boolean> = this.auth.token.pipe(map(value => !!value));

  isLoading$ = this.loading.isLoading$;

  constructor(private api: ApiService, private auth: AuthService, private dialog: Dialog, private injector: Injector, private loading: LoadingService) {
  }

  getProducts(category: string) {
    this.loading.setLoading()

    this.api.getInCategory(category)
      .pipe(
        tap({
          next: response => {
            this.dialog.open(ProductsComponent, {data: response, hasBackdrop: true, panelClass: 'modal'})
          },
          error: () => this.loading.setLoaded(),
          complete: () => this.loading.setLoaded()
        }),
        retryPopUp(this.injector),
        catchError(() => EMPTY)
      ).subscribe()
  }

  onLogin() {
    this.auth.login("donero", "ewedon").subscribe()
  }
}
