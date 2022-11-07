import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.css']
})
export class NewchatComponent implements OnInit {
  newGrpHeader: boolean = false;
  usersData: any;
  index: any = 0;
  event: any;
  selectedMenu: string = 'Doctor';
  groupArray: any[] = [];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.tabs("Doctor");
  }

  tabClick(event) {
    console.log(event.index.tab, event);
    this.index = event.index;
  }
  tabs(type) {

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

  showOptions(event) {
    this.event = event.source.value;
    console.log(event.source.value);
    if (event.checked == true) {
      this.groupArray.push(event.source.value);

    } else {

      let index = this.groupArray.findIndex(o => o._id === event.source.value._id)
      console.log(index)
      this.groupArray.splice(index, 1)
    }


    console.log(this.groupArray)


  }

  isChecked(item) {

    let index = this.groupArray.findIndex(o => o._id === item._id)
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }

  addUser() {
    this.chatService.addConversation({
      name:"",
      type:"",
      owner_id:"" ,
      image:"",

    }).subscribe((result: any) => {
      this.chatService.addMoreUser("", {
        conversation_id: "",
        user_id: "",
        isAdmin: false,
        isReferal: false

      }).subscribe((res: any) => {

      })
    })
  }

}
