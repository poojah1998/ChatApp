import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.css']
})
export class NewchatComponent implements OnInit {
  usersData: any;
  index: any=0;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {

  }
// doctors(){
//   this.chatService.getAllDoctors().subscribe((data: any) => {
//     this.allDoctors = data;
//   })
// }
tabClick(event){
 
console.log(event.index.tab,event);
this.index=event.index;
}
  tabs(type){
    if(type == "Doctor"){
  this.chatService.getAllDoctors().subscribe((data: any) => {
    this.usersData = data;
  })
    }else if (type == "Referral") {
      this.chatService.getAllRefferals().subscribe((data: any) => {
        this.usersData = data;
      })
    }

  }
}
