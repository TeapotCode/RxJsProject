import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../data-access/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({setHeaders: {Authorization: this.token.getToken()}}))
  }
}
