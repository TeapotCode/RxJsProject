import {HTTP_INTERCEPTORS, HttpInterceptor} from "@angular/common/http";
import {Provider, Type} from "@angular/core";

export function interceptorProvider(interceptor: Type<HttpInterceptor>): Provider {
  return {provide: HTTP_INTERCEPTORS, useClass: interceptor, multi: true}
}
