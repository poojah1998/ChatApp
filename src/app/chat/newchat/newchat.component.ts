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
  groupName: any;
  type: any = "INDIVIDUAL";
  ownerId: any;
  loginUserData: any;
  image: any;
  user_id: any;
  filterData: any;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.tabs("Doctor");
    this.loginUserData = JSON.parse(localStorage.getItem("loginUserData") || '{}');
    this.ownerId = this.loginUserData._id;
    console.log(this.ownerId)
  }

  tabClick(event) {
    console.log(event.index.tab, event);
    this.index = event.index;
    this.type = event.tab.textLabel
    console.log(this.type);
  }
  tabs(type) {

    this.selectedMenu = type;
    if (type == "Doctor") {
      this.chatService.getAllDoctors().subscribe((data: any) => {
        this.usersData = data;
        this.filterData=this.usersData;
      })
    } else if (type == "Referral") {
      this.chatService.getAllRefferals().subscribe((data: any) => {
        this.usersData = data;
        this.filterData=this.usersData;
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

    this.groupArray.forEach((ele) => {
      console.log(ele.profile.location)
      this.image = ele.profile.location
      this.user_id = ele._id

    })
  }

  isChecked(item) {

    let index = this.groupArray.findIndex(o => o._id === item._id)
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }
  filterdata(event: any) {
    this.filterData = this.usersData.filter(ele => ele.name.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(this.filterData)
  }

  addUser() {


    this.chatService.addConversation({
      name: this.groupName,
      type: this.type,
      owner_id: this.ownerId,
      image: this.image,

    }).subscribe((result: any) => {
      this.chatService.addMoreUser({
        conversation_id: result._id,
        user_id: this.user_id,
        isAdmin: false,
        isReferal: false

      }).subscribe((res: any) => {

      })
    })
  }

}
