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
  individualUser: any;
  groupName: any;
  type: any = "INDIVIDUAL";
  ownerId: any;
  loginUserData: any;
  image: any;
  user_id: any;
  filterData: any;
  file: any;

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

  onChange(event) {
    this.file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.file)
    this.chatService.uploadMedia(formData).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          this.image = event.location;
        }
      }
    );

  }

  addNewConversation() {
    let data: any = [];
    if (this.type === 'INDIVIDUAL') {
      this.chatService.addConversation({
        name: this.groupName,
        type: this.type,
        owner_id: this.ownerId,
        image: this.individualUser.profile.location,

      }).subscribe((result: any) => {
        data.push({
          conversation_id: result._id,
          user_id: this.ownerId,
          isAdmin: true,
          isReferal: false
        })
        data.push({
          conversation_id: result._id,
          user_id: this.individualUser._id,
          isAdmin: false,
          isReferal: false
        })
        this.chatService.addMoreUser({ data }).subscribe((res: any) => {

        })
      })
    }
    else {
      this.chatService.addConversation({
        name: this.groupName,
        type: this.type,
        owner_id: this.ownerId,
        image: this.image,

      }).subscribe((result: any) => {
        data.push({
          conversation_id: result._id,
          user_id: this.ownerId,
          isAdmin: true,
          isReferal: false
        })
        this.groupArray.forEach((ele, index) => {
          data.push({
            conversation_id: result._id,
            user_id: ele._id,
            isAdmin: false,
            isReferal: false
          })
          if (index === this.groupArray.length - 1) {
            this.chatService.addMoreUser({ data }).subscribe((res: any) => {

            })
          }
        })
      })
    }
  }

}
