import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {Product} from "../../utils/product.interface";
import {DIALOG_DATA} from "@angular/cdk/dialog";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  @Input('products') products: Product[] = this.data;

  constructor(@Inject(DIALOG_DATA) public data: Product[]) {
  }

}
