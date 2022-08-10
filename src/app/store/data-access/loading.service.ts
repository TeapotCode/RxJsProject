import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading$$ = new BehaviorSubject<boolean>(true);

  isLoading$ = this.isLoading$$.pipe()

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
