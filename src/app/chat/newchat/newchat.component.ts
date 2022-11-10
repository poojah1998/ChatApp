import { Component, Inject, OnInit } from '@angular/core';
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
  user_type: any;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.tabs("Doctor");
    this.loginUserData = JSON.parse(localStorage.getItem("loginUserData") || '{}');
    this.ownerId = this.loginUserData._id;
    this.user_type =this.loginUserData.user_type;
    console.log(this.ownerId);

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
        this.filterData = this.usersData;
      })
    } else if (type == "Referral") {
      this.chatService.getAllRefferals().subscribe((data: any) => {
        this.usersData = data;
        this.filterData = this.usersData;
      })
    }else if (type == "Hospital") {
      this.chatService.getAllHospitals().subscribe((data: any) => {
        this.usersData = data;
        this.filterData = this.usersData;
      })
    }else if (type == "Patient") {
      this.chatService.getAllPatients().subscribe((data: any) => {
        this.usersData = data;
        this.filterData = this.usersData;
      })
    }
  }
  
  showOptions(event) {
    this.event = event.source.value;
    console.log(event.source.value);
    if (event.checked == true) {
      this.groupArray.push(event.source.value);
      console.log( this.groupArray);

    } else {

      let index = this.groupArray.findIndex(o => o._id === event.source.value._id)
      console.log(index)
      this.groupArray.splice(index, 1)
      console.log( this.groupArray);
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
      console.log(event.location, event);
      if (typeof (event) === 'object') {
        this.image = event.location;
      }
    }
    );

  }

  removeItem(index) {
    console.log(index);
    this.groupArray.splice(index, 1)
  }

  addNewConversation() {
    let data: any = [];
    if (this.type === 'INDIVIDUAL') {
      this.chatService.addConversation({
        name: this.individualUser.name,
        type: this.type,
        user_type:this.selectedMenu,
        owner_id: this.ownerId,
        image: this.individualUser.profile?.location,

      }).subscribe((result: any) => {
        console.log(result._id, result)
        data.push({
          conversation_id: result.ConversationData._id,
          user_id: this.ownerId,
          user_type:this.selectedMenu,
          isAdmin: true,
          isReferal: false
        })
        data.push({
          conversation_id: result.ConversationData._id,
          user_id: this.individualUser._id,
          user_type:this.selectedMenu,
          isAdmin: false,
          isReferal: false
        })
        this.chatService.addMoreUser({ data }).subscribe((res: any) => {
          this.chatService.newConv.next(true);
        })
      })
    }
    else {
      this.chatService.addConversation({
        name: this.groupName,
        type: this.type,
         user_type:this.selectedMenu,
        owner_id: this.ownerId,
        image: this.image,

      }).subscribe((result: any) => {
        data.push({
          conversation_id: result.ConversationData._id,
          user_id: this.ownerId,
          user_type:this.selectedMenu,
          isAdmin: true,
          isReferal: false
        })
        this.groupArray.forEach((ele, index) => {
          data.push({
            conversation_id: result.ConversationData._id,
            user_id: ele._id,
            user_type:this.selectedMenu,
            isAdmin: false,
            isReferal: false
          })
          if (index === this.groupArray.length - 1) {
            this.chatService.addMoreUser({ data }).subscribe((res: any) => {
              this.chatService.newConv.next(true);
            })
          }
        })
      })
    }
  }

}
