import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { ChatService } from '../chat/chat.service';




// const logger = new Logger('HTTP_ERROR');
/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  reqUrl: string | undefined;

  constructor(


    private chat: ChatService,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.reqUrl = request.url;
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if ( this.reqUrl !== '/login') {
      // if (localStorage.getItem('AppContext')) {
      //   this.auth.isLoggedIn();
      // }else{
        this.chat.removeToken();
      // }

      // setTimeout(() => {
      //   this.auth.removeToken();
      // }, 700);
      // } else if (response['status']) {
      //   // this.toastr.error(response['error']['message'] || response['error']['errors']);
      //   this.auth.displayToast(response['error']['message'] || response['error']['errors'],500);

    }
    throw response;
  }

}
