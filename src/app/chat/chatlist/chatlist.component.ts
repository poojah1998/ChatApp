import { Component, OnInit } from '@angular/core';
import { ChatService } from './../chat.service';
@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {

  constructor(private sidenav: ChatService) { }

  ngOnInit(): void {
  }

  toggleRightSidenav() {
		this.sidenav.open();
	}

  goUserList(){
    this.sidenav.openLeftNav();
  }
}
