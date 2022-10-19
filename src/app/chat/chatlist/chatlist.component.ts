import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { ChatService } from './../chat.service';
@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef
  allConversation: any = [];
  conversationid: any = "";
  userId: any = "";
  message: any;
  userInput: any = '';
  Usermessage: any = {};
  userData: any;
  chat: any = {};
  allMessage: any = [];
  userDetails: any = {};
  receiverIds: any[] = [];
  newChatData: any 


  constructor(private sidenav: ChatService, private activateRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router, private socketService: SocketService) { }

  ngOnInit(): void {

    this.sidenav.open();
    //scroll
    this.scrollToBottom();
    //coming from userlist page
    this.activateRoute.params.subscribe(params => {
      this.userData = JSON.parse(localStorage.getItem("loginUserData") || '{}');
      this.conversationid = params["conversationId"];
      this.sidenav.getAllconversationUser(this.conversationid).subscribe((data: any[] | any) => {
        this.allConversation = data;
        this.newChatData = data.filter((o: any) => o.user_id._id != this.userData._id)
        this.userDetails = this.newChatData[0].user_id;
        this.receiverIds = data.map((o: any) => o.user_id._id)
      })
      //chatting page
      this.sidenav.allMessageById(this.conversationid).subscribe((data: any) => {
        this.allMessage = data;
      })

      //
    })
    this.getSoketMessage();
  }
  sendSoketMessage() {
    this.socketService.sendSoketMessage(true, this.userDetails._id,  this.receiverIds );

  }
  getSoketMessage() {
    this.socketService.getSoketMessage().subscribe((data:any) => {
      if (data.submit == "true") {
        this.ngOnInit();
      }
    })
  }




  //scroll
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }



  //send message
  sendMessage() {
    if (this.userInput.trim() != '') {
      var data = {
        sender_id: this.userData._id,
        conversation_id: this.conversationid,
        message: this.userInput,
        files: "",
        image: "",
      }
      // if(this.tag_id){
      //   data['tag_id'] = this.tag_id,
      // } 
      // if(this.hashtag_id){
      //   data['hashtag_id'] = this.hashtag_id,
      // }
      this.sidenav.sendMessage(data).subscribe((event) => {
        this.userInput = '';
        this.Usermessage = event;
        this.chat = this.Usermessage.ChatData
        // console.log(this.Usermessage.ChatData);
        this.sendSoketMessage();
        this.ngOnInit();
      })

    }

  }
  //after enter send msg
  handleKeyUp(e: any) {
    console.log(this.userInput)
    if (this.userInput.trim() != '') {
      if (e.keyCode == 13 && !e.shiftKey) {
        // prevent default behavior
        e.preventDefault();
        this.sendMessage();
      }
    }

  }





  returnArr(value: any): any {
    if (Array.isArray(value)) {
      value.sort((a: any, b: any) => a.createdAt - b.createdAt)
      return value
    }
  }
  public getTime(timeStamp: any) {
    let x = new Date(timeStamp)
    return this.datePipe.transform(x, 'h:mm a');
  }
  calculateDiff(dateSent: any) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    if (Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24)) === 0)
      return "Today";
    else if (Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24)) === 1)
      return "Yesterday";
    return this.getDate(dateSent)
  }
  public getDate(dateSent: any) {
    return this.datePipe.transform(new Date(dateSent).getTime(), 'EEE dd MMM yyyy')
  }

  toggleRightSidenav() {

    // console.log(this.conversationid);
    //console.log(this.userDetails._id);
    this.sidenav.getAllconversationUser(this.conversationid).subscribe(() => {
      this.router.navigate([`/chat/${this.conversationid}/${this.userDetails._id}`]);
      // 
    })
  }

  goUserList() {
    this.sidenav.openLeftNav();
  }




}
