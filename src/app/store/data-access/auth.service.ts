import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG, ApiConfig} from "../utils/api.config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token = new BehaviorSubject<string>('')

  token: Observable<string> = this._token.pipe()

  constructor(private http: HttpClient, @Inject(API_CONFIG) private apiConfig: ApiConfig) { }

  getToken() {
    return this._token.value
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(this.apiConfig.url + "/auth/login", {username, password})
      .pipe(
        tap(({token}) => this._token.next(token)),
        catchError(() => EMPTY)
      )
  }
}
