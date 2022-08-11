import {Component, Injector} from '@angular/core';
import {FormControl} from "@angular/forms";
import {
  BehaviorSubject,
  catchError,
  debounceTime, delay,
  distinctUntilChanged,
  EMPTY,
  map, Scheduler,
  startWith,
  switchMap,
  tap
} from "rxjs";
import {ApiService} from "../../data-access/api.service";
import {retryPopUp} from "../../utils/retry-pop-up";
import {LoadingService} from "../../data-access/loading.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [LoadingService]
})
export class SearchComponent {

  isLoading$ = this.loading.isLoading$;


  constructor(private api: ApiService, private injector: Injector, private loading: LoadingService) {
  }

  input = new FormControl<string>('', {nonNullable: true})

  response$ = this.input.valueChanges.pipe(
    map(value => value.trim()),
    debounceTime(500),
    startWith(''),
    distinctUntilChanged(),
    tap(() => this.loading.setLoading()),
    switchMap(value => {
      return this.api.searchProducts(value)
        .pipe(
          tap({next: () => this.loading.setLoaded(), error: () => this.loading.setLoaded()}),
          retryPopUp(this.injector),
          catchError(() => EMPTY)
        )
    })
  )

}
