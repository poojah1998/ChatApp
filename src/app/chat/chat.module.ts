import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { UserlistComponent } from './userlist/userlist.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ChatComponent } from './chat.component';
import { MaterialModule } from './../modules/material/material.module';

@NgModule({
  declarations: [
    UserlistComponent,
    ChatlistComponent,
    UserinfoComponent,
    ChatComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
