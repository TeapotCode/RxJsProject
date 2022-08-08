import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../data-access/api.service";
import {filter, fromEvent, Observable, take, tap} from "rxjs";
import {User} from "../../utils/user.interface";
import {Dialog} from "@angular/cdk/dialog";
import {ProductComponent} from "../../ui/product/product.component";
import {Product} from "../../utils/product.interface";
import {Overlay, ScrollStrategyOptions} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  users$: Observable<User[]> = this.api.getUsers()
  categories$: Observable<string[]> = this.api.getCategories()

  constructor(private api: ApiService, private overlay: Overlay, @Inject(DOCUMENT) private document: Document) {
  }

  getProducts(category: string) {
    let overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
      hasBackdrop: true,
      panelClass: 'modal'
    })

    let componentRef = overlayRef.attach(new ComponentPortal(ProductComponent))
    componentRef.setInput('products', this.api.getInCategory(category))

    overlayRef.backdropClick().subscribe(() => {
      componentRef.destroy()
      overlayRef.dispose()
    })
  }

  onLogin() {
    this.api.login("donero", "ewedon").subscribe()
  }
}
