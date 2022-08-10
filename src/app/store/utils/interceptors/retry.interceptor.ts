import {Injectable, Injector} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, EMPTY, finalize, Observable, tap} from "rxjs";
import {retryPopUp} from "../retry-pop-up";

@Injectable()
export class RetryInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(retryPopUp(this.injector), catchError(() => EMPTY))
  }

}
