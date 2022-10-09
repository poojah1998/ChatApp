import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('leftsidenav', { static: true }) leftsidenav!: MatSidenav;
  constructor(private sidenavService: ChatService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.setLeftSidenav(this.leftsidenav);
  }

}
