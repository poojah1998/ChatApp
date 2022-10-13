import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from './../chat.service';
@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  allConversarion: any=[];
  conversationid: any;
 

  constructor(private sidenav: ChatService, private activateRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   
    this.activateRoute.params.subscribe(params => {
      this.conversationid = params['id'];
       this.sidenav.getAllconversationUser(this.conversationid).subscribe((data:any)=>{
      this.allConversarion = data
    })
    })
   
  }

  toggleRightSidenav() {
		this.sidenav.open();
	}

  goUserList(){
    this.sidenav.openLeftNav();
  }
}
