import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, Observable, tap} from "rxjs";
import {User} from "../utils/user.interface";
import {API_CONFIG, ApiConfig} from "../utils/api.config";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private apiConfig: ApiConfig, private token: TokenService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiConfig.url + '/users')
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(this.apiConfig.url + "/auth/login", {username, password})
      .pipe(
        tap(({token}) => this.token.setToken(token)),
        catchError(() => EMPTY)
      )
  }
}
