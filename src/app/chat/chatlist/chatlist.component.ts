import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Output, EventEmitter, SimpleChanges, Input, OnChanges } from '@angular/core';
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
  isMentionModalOpen: boolean = false;
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
  hashtag_id: any;
  tagUserAraay: any = [];
  mentionUserArray: any = [];
  taggedUsers: any;
  hashtag: any = [];
  mentionUsers: any;
  mentionConfig: any;
  mention_ids: any;
  mention_id: any;
  mentionUserName: any;
  mentionArrayIds: unknown[];
  isEmojiPickerVisible = false;
  disabledBtn: boolean = true;
  additionalBtns: boolean = false;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any; // Variable to store file
  imageSrc: any = "";
  fileSrc: any = "";
  constructor(private sidenav: ChatService, private activateRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router, private socketService: SocketService) {

  }

  ngOnInit(): void {
    this.sidenav.open();
    this.scrollToBottom();
    //coming from userlist page
    this.activateRoute.params.subscribe(params => {
      this.conversationid = params["conversationId"];
      this.userInput = '';
      this.sidenav.allHashtag().subscribe((hashtags: any) => {
        this.hashtag = hashtags.map((ele: any) => ele.name);
        this.userData = JSON.parse(localStorage.getItem("loginUserData") || '{}');
        this.sidenav.getAllconversationUser(this.conversationid).subscribe((data: any[] | any) => {
          this.allConversation = data;

          this.mentionUsers = data.map((ele: any) => ele.user_id.name);
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
  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    this.disabledBtn = false;
    if (this.file.type.includes("image/")) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = reader.result;
        console.log(this.imageSrc);
      }
      reader.readAsDataURL(this.file);
    } else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileSrc = reader.result;
        console.log(this.fileSrc);
      }
      reader.readAsDataURL(this.file);
    }

  }

  closePreview() {
    this.imageSrc = "";
    this.fileSrc = "";
    this.disabledBtn = true;
  }
  // OnClick of button Upload
  onUpload(data) {
    const formData = new FormData();
    formData.append('file', this.file)
    this.loading = !this.loading;
    this.sidenav.uploadMedia(formData).subscribe(
      (event: any) => {
        console.log(event);
        if (typeof (event) === 'object') {
          this.closePreview();
          // Short link via api response
          this.shortLink = event.location;
          if (this.file.type.includes("image/")) {
            data['image'] = this.shortLink;
            this.sendMessageApi(data);
          } else {
            data['files'] = this.shortLink;
            this.sendMessageApi(data);
          }

          this.loading = false; // Flag variable 
        }
      }
    );
  }


  closed(event: any) {
    if (event.label) {
      this.isMentionModalOpen = true;
    }

    this.mentionUserName = event.label;

    const newarray = this.allConversation.filter((ele: any) => ele.user_id.name.includes(this.mentionUserName));
    this.mentionArrayIds = [...new Set(newarray.map((it: any) => it.user_id._id))];
    // }



  }


  public addEmoji(event: any) {
    this.userInput = `${this.userInput}${event.emoji.native}`;
    this.userInput.focus();
    // this.isEmojiPickerVisible = false;
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
    console.log(this.shortLink);
    if (this.file || this.userInput.trim() != '') {
      this.disabledBtn = true
      var data = {
        sender_id: this.userData._id,
        conversation_id: this.conversationid,
        message: this.userInput,
      }
      if (this.mentionArrayIds?.length > 0) {
        data['isMailAvailability'] = true;
        data['isMailDelivered'] = false;
        data['allMentionUsers'] = this.mentionArrayIds
      }
      if (this.file) {
        this.onUpload(data);
      }
      else {
        this.sendMessageApi(data);
      }
    }

  }



  sendMessageApi(payload) {
    this.sidenav.sendMessage(payload).subscribe((event: any) => {
      this.userInput = '';
      this.Usermessage = event;
      this.chat = this.Usermessage.ChatData;
      this.mentionArrayIds = [];
      this.sendSoketMessage();
      this.ngOnInit();
    })
  }
  //after enter send msg
  handleKeyUp(e: any) {
    // console.log(this.userInput)
    if (this.isMentionModalOpen === false && e.keyCode == 13) {
      if (this.userInput.trim() != '') {
        if (e.keyCode == 13 && !e.shiftKey) {
          // prevent default behavior
          this.sendMessage();
        }
      }
    }
    else {
      this.isMentionModalOpen = false;
    }


    if (this.userInput.trim() != '') {
      this.disabledBtn = false
    } else {
      this.disabledBtn = true
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


  triggerBtns() {
    this.additionalBtns = !this.additionalBtns
  }
  // meadiaUpload(data:any){
  //   this.sidenav.uploadMedia(data).subscribe((event: any) => {
  //     this.ngOnInit();
  //   })
  // }

}
