import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable, tap} from "rxjs";
import {LoadingService} from "../../data-access/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req.clone()).pipe(tap(() => this.loading.setLoading()), finalize(() => this.loading.setLoaded()))
  }

}
