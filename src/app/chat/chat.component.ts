import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('leftsidenav', { static: true }) leftsidenav!: MatSidenav;
  isUserChatHistoryExist: boolean = false;
  isUserInfoExist: boolean = false;
  constructor(private sidenavService: ChatService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramObj: any) =>{
      if(paramObj.conversationId) {
        this.isUserChatHistoryExist = true;
      }
      if(paramObj.userId) {
        this.isUserInfoExist = true;
      }
    })
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.setLeftSidenav(this.leftsidenav);
  }

}
