import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from './../chat.service';
@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  allConversation: any=[];
  conversationid: any="";
  message: any;
  userInput: any='';
  Usermessage: any ={};
  userData: any;
  chat: any={};

 

  constructor(private sidenav: ChatService, private activateRoute:ActivatedRoute,private router:Router, private datePipe : DatePipe) { }

  ngOnInit(): void {
    

    this.activateRoute.params.subscribe(params => {
      console.log(params["conversationId"]);
       this.conversationid = params["conversationId"];
      console.log(this.conversationid);
     
       this.sidenav.getAllconversationUser(this.conversationid).subscribe((data:any)=>{
      this.allConversation = data;
     
      
    })

    this.userData = JSON.parse(localStorage.getItem("loginUserData") || '{}');
    console.log(this.userData._id);

    })
   //all message
   this.sidenav.allMessageById(this.conversationid).subscribe((data:any)=>{

   })
  }

  
sendMessage(){
  

  if(this.userInput!='')
  {
  var data = {
    sender_id : this.userData._id,
    conversation_id:  this.conversationid,
    message: this.userInput,
    files: "",
    image: "",
    tag_id: "",
    hashtag_id: ""
  }
  this.sidenav.sendMessage(data).subscribe((event)=>{
    this.userInput = '';
    this.Usermessage = event;
    this.chat = this.Usermessage.ChatData
    console.log(this.Usermessage.ChatData);
      })

}
 
}


  toggleRightSidenav() {
		this.sidenav.open();
	}

  goUserList(){
    this.sidenav.openLeftNav();
  }
}
