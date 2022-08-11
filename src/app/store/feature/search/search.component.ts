import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BehaviorSubject, debounceTime, distinctUntilChanged, map, startWith, Subject, switchMap, tap} from "rxjs";
import {ApiService} from "../../data-access/api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private api: ApiService) {
  }

  input = new FormControl<string>('', {nonNullable: true})

  response$ = this.input.valueChanges.pipe(
    map(value => value.trim()),
    debounceTime(500),
    startWith(''),
    distinctUntilChanged(),
    tap(() => this.isLoading$.next(true)),
    switchMap(value => {
      return this.api.searchProducts(value).pipe(tap(() => this.isLoading$.next(false)))
    }),
  )

}
