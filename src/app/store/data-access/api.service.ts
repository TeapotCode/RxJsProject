import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../utils/user.interface";
import {API_CONFIG, ApiConfig} from "../utils/api.config";
import {Product} from "../utils/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private apiConfig: ApiConfig) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiConfig.url + '/users')
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiConfig.url + "/products/categories")
  }

  getInCategory(category: string) {
    return this.http.get<Product[]>(this.apiConfig.url + `/products/category/${category}`)
  }
}
