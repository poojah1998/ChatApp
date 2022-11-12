import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from './../chat.service';
import { NewchatComponent } from '../newchat/newchat.component'
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  about: any = false;
  images: any = false;
  files: any = false;
  pinned: any = false;
  userId: any;
  conversationId: any = "";
  allConversation: any = Array;
  userDetails: any = {};
  allPhotos: any;
  allFiles: any;
  img: any;
  file: any;
  conversation: any;
  repeat: any = [1];
  allMessage: any[] = [];
  filterUserDetail: any;
  // constructor(private sidenav: ChatService, private activateRoute: ActivatedRoute, private router: Router) { }
  participantSearchWindow: boolean;
  filterData: any;
  apiexecute = false;
  deleteUser: any;
  loggedInUser: any;
  currentGroupUser: any;
  limitFilterData:any[]=[];
  constructor(private sidenav: ChatService, public dialog: MatDialog, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //coming from params 
    this.loggedInUser = JSON.parse(localStorage.getItem("loginUserData") || '{}');
    this.activateRoute.params.subscribe(params => {
      this.conversation = JSON.parse(localStorage.getItem("currentConversationData") || '{}');

      this.userId = params["userId"];
      this.conversationId = params["conversationId"];

      // coming from chat list component
      this.sidenav.getAllconversationUser(this.conversationId).subscribe((data: any) => {
        this.allConversation = data;
       
        this.filterData = this.allConversation;
        console.log(this.filterData);
        

        
        this.currentGroupUser= this.allConversation.filter(o=>o.user_id._id == this.loggedInUser._id)[0]
        console.log(this.currentGroupUser);
        if (this.conversation.type !== 'INDIVIDUAL') {
          this.userDetails = this.conversation; // need to change for all user
          console.log(this.userDetails);
        }
        else {
          this.userDetails = data[0].user_id;
          console.log(this.userDetails);
        }
      })
      this.sidenav.getAllPhotos(this.conversationId).subscribe((photos: any) => {
        this.apiexecute = true;
        this.allPhotos = photos;
      })
      this.sidenav.getAllFiles(this.conversationId).subscribe((allfiles: any) => {
        this.allFiles = allfiles;

        this.file = allfiles.files
      })
    })

    
  }



  filterdata(event: any) {
    // this.apiexecute = true;
    this.filterData = this.allConversation.filter(ele => ele.user_id?.name.toLowerCase().includes(event.target.value.toLowerCase()));
  }
  additionalDetails(name: any) {

    if (name == 'about') {
      this.about = !this.about;
      if (this.about == true) {
        this.images = false
        this.files = false
        this.pinned = false
      }
    }
    if (name == "images") {
      this.images = !this.images;
      if (this.images == true) {
        this.about = false
        this.files = false
        this.pinned = false
      }
    }
    if (name == "files") {
      this.files = !this.files;
      if (this.files == true) {
        this.about = false
        this.images = false
        this.pinned = false
      }
    }
    if (name == "pinned") {
      this.pinned = !this.pinned;
      if (this.pinned == true) {
        this.about = false
        this.files = false
        this.images = false
      }
    }
  }

  closeSidenav() {
    this.sidenav.close();
    this.router.navigate([`/chat/${this.conversationId}`]);
  }

  newChat() {
    let dialogRef = this.dialog.open(NewchatComponent, {
      width: '480px',
      panelClass: 'custom-dialog',

    });
  }

  allParticipantsSearch() {
    this.participantSearchWindow = true
  }


  remove(templateRef, id) {
    this.deleteUser = id;
    let dialogRef = this.dialog.open(templateRef, {
      width: '300px'
    });
  }
  deleteUserByAdmin() {
    this.sidenav.deleteByAdmin(this.deleteUser).subscribe((res: any) => {
      console.log(res)
    })
  }

  deleteCurrentUser() {
    this.sidenav.deleteByAdmin(this.currentGroupUser._id).subscribe((res: any) => {
      console.log(res)
    })
  }

}
