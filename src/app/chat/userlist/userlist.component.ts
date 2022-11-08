import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChatService } from './../chat.service';
import { Router } from '@angular/router';
import { NewchatComponent } from '../newchat/newchat.component'
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  ConversationList: any = [];
  filterData: any;
  constructor(private leftsidenav: ChatService, public dialog: MatDialog, public breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
    this.showConvo();
    this.leftsidenav.getAllConversation().subscribe((data: any) => {
      this.ConversationList = data;
      this.filterData=this.ConversationList;
      console.log(this.ConversationList);

    })
  }
  filterdata(event: any) {
    this.filterData = this.ConversationList.filter(ele => ele.name.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(this.filterData)
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
}
