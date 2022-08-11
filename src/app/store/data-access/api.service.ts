import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../utils/user.interface";
import {API_CONFIG, ApiConfig} from "../utils/api.config";
import {Product} from "../utils/product.interface";
import {SecondApi} from "../utils/api2.interface";

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

  searchProducts(phrase: string) {
    const params = new HttpParams().append('q', phrase)
    return this.http.get<SecondApi.Response>('https://dummyjson.com/products/search', {params})
  }
}
