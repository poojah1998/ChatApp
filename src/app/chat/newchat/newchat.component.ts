import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.css']
})
export class NewchatComponent implements OnInit {
  usersData: any;
  selectedMenu: string = 'Doctor';
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {

  }
  // doctors(){
  //   this.chatService.getAllDoctors().subscribe((data: any) => {
  //     this.allDoctors = data;
  //   })
  // }

  tabs(type: string) {
    this.selectedMenu = type;
    if (type == "Doctor") {
      this.chatService.getAllDoctors().subscribe((data: any) => {
        this.usersData = data;
      })
    } else if (type == "Referral") {
      this.chatService.getAllRefferals().subscribe((data: any) => {
        this.usersData = data;
      })
    }
  }
}
