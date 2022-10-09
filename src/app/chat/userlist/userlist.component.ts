import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChatService } from './../chat.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private leftsidenav: ChatService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
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
