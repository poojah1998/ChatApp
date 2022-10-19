// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';;
// import * as io from 'socket.io-client';
// import { environment } from 'src/environments/environment';
// @Injectable({
//   providedIn: 'root'
// })
// export class SocketService {
//   private url = environment.socket;
//   private socket;
//   constructor() {
   
//     this.socket = io.connect(this.url)
//    }
   
// }
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  userId: any;
  private url = environment.socket;
  private socket;
  constructor() {
 this.socket = io.connect(this.url)
  }



  public sendSoketMessage(submit: any,senderId:any,receiverId:any=[]) {
   
    this.userId = localStorage.getItem('loginUserData') ? JSON.parse(localStorage.getItem('loginUserData')||'{}')._id: '0';
    this.socket.emit('new-qa', { submit, senderId: this.userId,receiverId:receiverId});
  }

  public getSoketMessage() {
    var that = this;
    
    return new Observable((observer) => {
      this.socket.on('new-qa-emited', (submit) => {
        console.log('1.1---------', that.userId)
        console.log('2.1---------', submit.senderId)
        if(that.userId == submit.senderId || submit.receiverId.includes(that.userId))
        {
          console.log(submit.senderId);
          observer.next(submit);
        }
      });
    });
  }


}