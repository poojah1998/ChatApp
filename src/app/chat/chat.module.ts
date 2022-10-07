import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { UserlistComponent } from './userlist/userlist.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [
    UserlistComponent,
    ChatlistComponent,
    UserinfoComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
