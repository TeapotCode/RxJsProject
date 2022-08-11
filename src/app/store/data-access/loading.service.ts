import {Injectable} from '@angular/core';
import {BehaviorSubject, delay} from "rxjs";

@Injectable()
export class LoadingService {

  private isLoading$$ = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoading$$.pipe(delay(0))

  setLoading() {
    this.isLoading$$.next(true)
  }

  setLoaded() {
    this.isLoading$$.next(false)
  }

  get isLoading() {
    return this.isLoading$$.value
  }

}
