import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChatService } from './../chat.service';
import { Router } from '@angular/router';
import { NewchatComponent } from '../newchat/newchat.component'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  ConversationList: any = [];
  filterData: any = [];
  selectedUserlist: any;
  repeat: any = [1, 2, 3, 4, 5, 6, 7];
  apiexecute = false;
  loggedInUser: any;
  filterConversationList:any[]=[];
  constructor(private leftsidenav: ChatService, public dialog: MatDialog, public breakpointObserver: BreakpointObserver, private router: Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem("loginUserData") || '{}');
    this.showConvo();
    this.leftsidenav.getownChatUsers(this.loggedInUser._id).subscribe((data: any) => {
      this.apiexecute = true;
      this.ConversationList = data;
    
      this.filterData=this.ConversationList;
      
      console.log(this.filterData);

    })
    this.leftsidenav.newConv.next(false);
    this.refreshPage();
  }
  filterdata(event: any) {
    this.apiexecute = true;
    this.filterData = this.ConversationList.filter(ele => ele.name?.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  showConvo() {
    this.breakpointObserver
      .observe(['(max-width: 780px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.leftsidenav.closeLeftNav();
        } else {

        }
      });
  }
  async chatDeatils(conversation: any) {
    this.selectedUserlist = conversation._id;
      console.log(conversation._id,conversation)
    // this.leftsidenav.getAllconversationUser(conversationid).subscribe(() => {
      localStorage.setItem("currentConversationData", JSON.stringify(conversation))
      this.router.navigate([`/chat/${conversation._id}`]);
    

    // })
  }

  newChat() { 
    let dialogRef = this.dialog.open(NewchatComponent, { 
      width: '480px',
      panelClass: 'custom-dialog' 
    });

  }

  refreshPage() {
    this.leftsidenav.getNewConv().subscribe(result =>{
      if(result === true)
      this.ngOnInit();
    })
  }
  public getTime(timeStamp: any) {
    let x = new Date(timeStamp)
    return this.datePipe.transform(x, 'h:mm a');
  }
}
