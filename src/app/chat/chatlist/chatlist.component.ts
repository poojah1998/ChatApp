import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Output, EventEmitter, SimpleChanges, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { AudioService } from '../audio.service';
import { ChatService } from './../chat.service';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  msaapDisplayDuration = false;
  msaapDisplayArtist = false;
  msbapAudioUrl = "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
  msaapDisablePositionSlider = false;
  msaapDisplayVolumeControls = false;
  msaapDisplayRepeatControls = false;
  msaapDisplayPlayList = false;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;
  @Output() itemSelected: EventEmitter<any>;
  isMentionModalOpen: boolean = false;
  allConversation: any = [];
  conversationid: any = "";
  userId: any = "";
  message: any;
  userInput: string = '';
  Usermessage: any = {};
  userData: any;
  chat: any = {};
  repeat: any = [1, 2, 3];
  allMessage: any = [];
  userDetails: any = {};
  receiverIds: any[] = [];
  newChatData: any
  hashtag_id: any;
  tagUserAraay: any = [];
  mentionUserArray: any[] = [];
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
  mediaName: string = "";
  loading: boolean = false; // Flag variable
  file: any; // Variable to store file
  imageSrc: any = "";
  fileSrc: any = "";
  recordStart: boolean = true;
  dataURItoBlob: any;
  ownerId: any;
  fileName: any;
  audioPlayStatus: any[] = [];
  private currentPlayedElem: HTMLAudioElement;
  isPaused: boolean;
  conversation: any;
  mentionUserNameArray: any[] = [];
  isPlaying: boolean = false;
  convData: any[] = [];
  filterUserDetail: any;
  apiexecute = false;
  date: any;
  messageDateString: any;
  constructor(private sidenav: ChatService, private activateRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router, private socketService: SocketService, private audioService: AudioService) {

  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("loginUserData") || '{}');
    this.ownerId = this.userData._id;
    this.sidenav.open();
    this.scrollToBottom();
    //coming from userlist page
    this.activateRoute.params.subscribe(params => {
      this.conversation = JSON.parse(localStorage.getItem("currentConversationData") || '{}');
      this.conversationid = params["conversationId"];
      this.userInput = '';
      this.sidenav.allHashtag().subscribe((hashtags: any) => {
        this.hashtag = hashtags.map((ele: any) => ele.name);
        this.sidenav.getAllconversationUser(this.conversationid).subscribe((data: any[] | any) => {
          this.apiexecute = true;
          this.allConversation = data;
          

          this.convData = this.allConversation.filter((o: any) => o.user_id && o.user_id._id != this.ownerId);

          this.mentionUsers = data.map((ele: any) => {
            if (ele.user_id) {
              return ele.user_id.name
            }
          });
          this.mentionUsers = this.mentionUsers.filter((o: any) => o != undefined);
         
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
          this.newChatData = data.filter((o: any) => o.user_id && o.user_id._id != this.userData._id)
          if (this.conversation.type !== 'INDIVIDUAL') {
            this.userDetails = this.conversation; // need to change for all user
          
          }
          else {
            this.userDetails = this.newChatData[0].user_id;
           
          }
          this.receiverIds = data.map((o: any) => o.user_id && o.user_id._id)
        })
      })
      //chatting page
      this.sidenav.allMessageById(this.conversationid).subscribe((data: any) => {
        this.allMessage = data;
     
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
        console.log(this.allMessage);
      })

      //
    })
    this.getSoketMessage();
    this.scrollToBottom();
   
  }

  isDifferentDay(messageIndex: number): boolean {
    if (messageIndex === 0) return true;
    const d1 = new Date(this.allMessage[messageIndex - 1].createdAt);
    const d2 = new Date(this.allMessage[messageIndex].createdAt);

    return (
      d1.getFullYear() !== d2.getFullYear() ||
      d1.getMonth() !== d2.getMonth() ||
      d1.getDate() !== d2.getDate()
    );
  }
  getMessageDate(messageIndex: number): string {
    let dateToday = new Date().toDateString();
    let longDateYesterday = new Date();
    longDateYesterday.setDate(new Date().getDate() - 1);
    let dateYesterday = longDateYesterday.toDateString();
    let today = dateToday.slice(0, dateToday.length - 5);
    let yesterday = dateYesterday.slice(0, dateToday.length - 5);

    const wholeDate = new Date(
      this.allMessage[messageIndex].createdAt
    ).toDateString();

    this.messageDateString = wholeDate.slice(0, wholeDate.length - 5);

    if (
      new Date(this.allMessage[messageIndex].createdAt).getFullYear() ===
      new Date().getFullYear()
    ) {
      if (this.messageDateString === today) {
        return "Today";
      } else if (this.messageDateString === yesterday) {
        return "Yesterday";
      } else {
        return this.messageDateString;
      }
    } else {
      return wholeDate;
    }
  }




  convrsationDetails(id: any) {
    return this.convData.filter(o => o.user_id._id == id)[0]?.user_id;
  }


  setUserInfo(user_id) {
    this.filterUserDetail = this.allConversation.filter(o => o.user_id && o.user_id._id == user_id)[0]
    console.log(this.filterUserDetail)
    console.log(this.allConversation)
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

          this.mediaName = event.originalname;
          if (this.file.type.includes("image/")) {
            data['image'] = this.shortLink;
            data['mediaName'] = this.mediaName;
            this.sendMessageApi(data);
          } else {
            data['files'] = this.shortLink;
            data['mediaName'] = this.mediaName;
            this.sendMessageApi(data);
          }

          this.loading = false; // Flag variable 
        }
      }
    );
  }
  //get name from url   
  getName(url: string) {
    let str = url?.substring(7, url.lastIndexOf('.'))
    url.replace(str, "...");
    return url;
  }

  // fileExt(name) {
  //   if (name && name.includes('.pdf')) {
  //     return 'pdf';
  //   }
  //   else if (name && name.includes('.js')) {
  //     return 'js';
  //   }
  //   else if (name && name.includes('.css')) {
  //     return 'css';
  //   }
  //   else if (name && name.includes('.docx')) {
  //     return 'docx';
  //   }
  //   else if (name && name.includes('.gif')) {
  //     return 'gif';
  //   }
  //   // else if (name && name.includes('.svg')) {
  //   //   return 'svg';
  //   // }
  //   // else {
  //   //   return 'image';
  //   // }
  // }




  updateTrackTime(track, index) {
    var currTimeDiv: any = document.getElementById('currentTime-' + index);
    // var durationDiv: any = document.getElementById('duration-' + index);

    var currTime: any = Math.floor(track.currentTime).toString();
    // var duration: any = Math.floor(track.duration).toString();

    currTimeDiv.innerHTML = this.formatSecondsAsTime(currTime);

    // if (isNaN(duration)) {
    //   durationDiv.innerHTML = '00:00';
    //   // this.isPlaying = false
    // }
    // else {
    //   durationDiv.innerHTML = this.formatSecondsAsTime(duration);
    //   // this.isPlaying = true
    // }
    this.getProgress(track, index)
  }
  getProgress(track, index) {
    var progress: any = document.getElementById('progress-' + index);

    progress.style.width = track.currentTime / track.duration * 100 + '%'
    if (track.currentTime / track.duration * 100 == 100) {
      this.audioPlayStatus[index] = false;
      progress.style.width = 0
    }

  }
  getLengthOfAudio(track) {
    return Math.floor(track.duration);
  }

  formatSecondsAsTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min: any = Math.floor((secs - (hr * 3600)) / 60);
    var sec: any = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ':' + sec;
  }





  closed(event: any) {
    if (event.label) {
      this.isMentionModalOpen = true;
    }

    this.mentionUserName = event.label;
    this.mentionUserNameArray.push(event.label);
    console.log(this.mentionUserNameArray, this.mentionUserName)
    const newarray = this.allConversation.filter((ele: any) => ele.user_id.name.includes(this.mentionUserName));
    this.mentionArrayIds = [...new Set(newarray.map((it: any) => it.user_id._id))];
    // }



  }


  public addEmoji(event: any) {
    this.userInput = `${this.userInput}${event.emoji.native}`;
    // this.userInput.focus();
    this.messageInput.nativeElement.focus();
    this.isEmojiPickerVisible = false;

  }


  sendSoketMessage() {
    this.socketService.sendSoketMessage(true, this.ownerId, this.receiverIds);

  }
  getSoketMessage() {
    this.socketService.getSoketMessage().subscribe((data: any) => {
      if (data.submit == true) {
        this.ngOnInit();
      }
    })
  }



  startPlay() {
    this.audioService.startPlay();
    this.recordStart = false;
  }


  stopPlay() {
    this.audioService.stopPlay().then(audioBlob => {
      this.file = new File([audioBlob], `${this.ownerId}-${new Date().getTime()}.wav`, { type: 'audio/wav; codecs=MS_PCM' })
      this.sendMessage();
      this.recordStart = true;
    });

    console.log('Record stop')
  }


  // //scroll
  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }



  //send message
  sendMessage() {

    if (this.file || this.userInput.trim() != '') {
      // if (this.userInput.includes('@') || this.userInput.includes('#')) {
      //   let data: any = [];
      //   this.userInput.split(' ').forEach(element => {
      //     console.log(element)
      //     if (element.includes('@') || element.includes('#')) {
      //       data.push(`<span class="mentions">${element}</span>`);
      //     }
      //     else {
      //       data.push(element);
      //     }
      //   });
      //   this.userInput = data.join(' ');
      // }
      let data: any = [];
      this.mentionUserNameArray.forEach(element => {
        if (this.userInput.includes(element)) {
          if (this.userInput.includes('@')) {
            data.push(`<span class="mentions">@${element}</span>`);
            let arr = this.userInput.split('@' + element);
            this.userInput = arr.join('');
          }
          else {
            data.push(`<span class="mentions">#${element}</span>`);
            let arr = this.userInput.split('#' + element);
            this.userInput = arr.join('');
          }
        }
        else {
          data.push(element);
        }
      })
      this.userInput = data.join(' ') + this.userInput;
      this.disabledBtn = true
      var payload = {
        sender_id: this.userData._id,
        conversation_id: this.conversationid,
        message: this.userInput,
        image: "",
        files: "",
        mediaName: ""

      }
      if (this.mentionArrayIds?.length > 0) {
        payload['isMailAvailability'] = true;
        payload['isMailDelivered'] = false;
        payload['allMentionUsers'] = this.mentionArrayIds
      }
      if (this.file) {
        this.onUpload(payload);
      }
      else {
        this.sendMessageApi(payload);
      }
    }

  }



  sendMessageApi(payload) {
    this.sidenav.sendMessage(payload).subscribe((event: any) => {
      this.userInput = '';
      this.Usermessage = event;
      this.chat = this.Usermessage.ChatData;
      this.mentionArrayIds = [];
      this.mentionUserNameArray = [];
      this.sendSoketMessage();
      this.ngOnInit();
      this.file = undefined;
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
    // this.sidenav.getUserinfoUpdate.subscribe((info:any)=>{
    this.sidenav.open();
    // console.log(this.conversationid);
    //console.log(this.userDetails._id);

    this.router.navigate([`/chat/${this.conversationid}/${this.userDetails._id}`]);
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

  onPlay(elm: HTMLAudioElement) {

    if (this.currentPlayedElem && this.currentPlayedElem !== elm) {

      this.currentPlayedElem.pause();

    } else {

    }

    this.currentPlayedElem = elm;
  }

  singleAudioPlay(index) {

    this.audioPlayStatus = Array(this.allMessage.length).fill(false);
    this.audioPlayStatus[index] = true;

  }

  singleAudioPause(index) {

    this.audioPlayStatus = Array(this.allMessage.length).fill(false);
    this.audioPlayStatus[index] = false;

  }

  showDurationOfAudio(ref) {
    console.log(ref.duration);
  }


}
