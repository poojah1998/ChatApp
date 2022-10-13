import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ChatService } from '../chat/chat.service';

/** 
 * Prefixes all requests with `environment.host`.
 */
const baseUrl: string = environment.host;

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor(private chat: ChatService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
const token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzZkZGY5MzA1MzQzMjE0YzZmOTBiYyIsImJyYW5jaGlkIjoiNjA3NmRkZjkzMDUzNDMyMTRjNmY5MGJjIiwibmFtZSI6IkRocnV2IENoaGFicmEiLCJlbWFpbCI6ImRocnV2LmNoaGFicmFhQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijk5NTM1OTQzNDgiLCJSb2xlIjoiU3VwZXIiLCJpYXQiOjE2NjU0ODU3NTJ9.Lm0I0WKtXz6lHbTMF4fLfyKpRdcSrdT92wOwDXK-HJA"
    if (token) {
      console.log(token,"hgggggggggggggggggggggggg");
      request = request.clone({
        setHeaders: {
          authorization: `${token}`
        }
      });  
    }
    request = request.clone({ url: request.url.startsWith('http') ? request.url : baseUrl + request.url });
    return next.handle(request);
  }
  
}
