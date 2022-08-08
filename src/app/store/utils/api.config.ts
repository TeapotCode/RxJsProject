import {InjectionToken} from "@angular/core";

export interface ApiConfig {
  url: string
}

const apiConfig: ApiConfig = {
  url: "https://fakestoreapi.com"
}

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG', {
  providedIn: "root",
  factory: () => apiConfig
})
