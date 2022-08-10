import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../data-access/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private token: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {Authorization: this.token.getToken()}
    })
    return next.handle(authReq)
  }
}
