import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading$$ = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoading$$.asObservable()

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
