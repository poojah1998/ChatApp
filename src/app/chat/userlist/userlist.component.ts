import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChatService } from './../chat.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
uid:any= "6076ddf9305343214c6f90bc";
ConversationList:any=[];
  constructor(private leftsidenav: ChatService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
this.leftsidenav.getConversationListById(this.uid).subscribe((data:any)=>{
this.ConversationList = data
console.log(this.ConversationList);
})
  }

  showConvo(){
    this.breakpointObserver
      .observe(['(max-width: 780px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
            this.leftsidenav.closeLeftNav();
        } else {

        }
      });
  }

}
