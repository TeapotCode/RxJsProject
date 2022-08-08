import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../utils/product.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input('products') products$: Observable<Product[]> | undefined;

  constructor() { }


}
