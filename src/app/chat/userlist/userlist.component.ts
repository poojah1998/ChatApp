import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChatService } from './../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
ConversationList:any=[];
  constructor(private leftsidenav: ChatService, public breakpointObserver: BreakpointObserver,private router:Router) { }

  ngOnInit(): void {
this.leftsidenav.getAllConversation().subscribe((data:any)=>{
this.ConversationList = data
// console.log(this.ConversationList);

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
 async chatDeatils(conversationid: any){
this.leftsidenav.getAllconversationUser(conversationid).subscribe(()=>{
  this.router.navigate([`/chat/${conversationid}`]);
})
 }
}
