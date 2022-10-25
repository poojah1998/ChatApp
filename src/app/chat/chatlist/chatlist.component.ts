import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { ChatService } from './../chat.service';
@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Output() itemSelected: EventEmitter<any>;
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
  isEmojiPickerVisible = false;
  hashtag_id: any;
  tagUserAraay: any = [];
  mentionUserArray: any = [];
  mention_id: any;
  taggedUsers: any;
  hashtag: any = [];
  mentionUsers: any;
  mentionConfig: any;

  constructor(private sidenav: ChatService, private activateRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router, private socketService: SocketService) { }

  ngOnInit(): void {
    this.sidenav.open();
    this.scrollToBottom();



    //coming from userlist page
    this.activateRoute.params.subscribe(params => {
      this.conversationid = params["conversationId"];
      this.sidenav.allHashtag().subscribe((hashtags: any) => {
        this.hashtag = hashtags.map((ele: any) => ele.name);
        this.userData = JSON.parse(localStorage.getItem("loginUserData") || '{}');
        
        this.sidenav.getAllconversationUser(this.conversationid).subscribe((data: any[] | any) => {
          this.allConversation = data;
           console.log(this.allConversation);
          this.mentionUsers = data.map((ele: any) => ele.user_id.name);
          console.log(this.mentionUsers);
          this.mentionConfig = {

            mentions: [
              {
                items: this.mentionUsers,
                triggerChar: '@',
                dropUp: true
              },
              {
                items: this.hashtag,
                triggerChar: '#',
                dropUp: true
              },
            ]
          }
          this.newChatData = data.filter((o: any) => o.user_id._id != this.userData._id)
          this.userDetails = this.newChatData[0].user_id;

          this.receiverIds = data.map((o: any) => o.user_id._id)
        })
      })
      //chatting page
      this.sidenav.allMessageById(this.conversationid).subscribe((data: any) => {
        this.allMessage = data;
      })

      //
    })
    this.getSoketMessage();
  }

  closed(event:any){
console.log(event);
  }


  public addEmoji(event: any) {
    this.userInput = `${this.userInput}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }


  sendSoketMessage() {
    this.socketService.sendSoketMessage(true, this.userDetails._id, this.receiverIds);

  }
  getSoketMessage() {
    this.socketService.getSoketMessage().subscribe((data: any) => {
      if (data.submit == true) {
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
   
      if (this.mentionUserArray.length > 0) {
        data['isMailAvailability'] = true;
        data['isMailDelivered'] = false;
        data['mentionUserArray'] = this.mention_id;
      }
      if (this.tagUserAraay.length > 0) {
        data['tagUserAraay'] = this.hashtag_id;
      }
      this.sidenav.sendMessage(data).subscribe((event: any) => {
        this.userInput = '';
        this.Usermessage = event;
        this.chat = this.Usermessage.ChatData;
    
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
    this.sidenav.open();
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
