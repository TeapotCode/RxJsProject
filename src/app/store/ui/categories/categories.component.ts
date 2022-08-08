import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {

  @Input() categories: string[] | undefined | null
  @Output() selected = new EventEmitter<string>()

  constructor() {
  }

  onSelect(category: string) {
    this.selected.emit(category)
  }
}
