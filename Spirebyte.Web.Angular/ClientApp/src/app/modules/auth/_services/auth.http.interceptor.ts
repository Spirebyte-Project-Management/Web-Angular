import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { Observable, from } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = JSON.parse(
      localStorage.getItem(this.authLocalStorageToken)
    );

    if (user) {
      const cloned = request.clone({
        headers: request.headers.set(
          "Authorization",
          "Bearer " + user.accessToken
        )
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
