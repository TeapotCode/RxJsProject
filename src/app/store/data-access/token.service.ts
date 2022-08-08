import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _token = new BehaviorSubject<string>('')

  token: Observable<string> = this._token.pipe()

  constructor() { }

  setToken(token: string) {
    this._token.next(token)
  }

  getToken() {
    return this._token.value
  }
}
