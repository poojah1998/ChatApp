import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';;
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = environment.socket;
  private socket;
  constructor() {
   
    this.socket = io.connect(this.url)
   }
   
}
