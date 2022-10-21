import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { UserlistComponent } from './userlist/userlist.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
// import { ChatComponent } from './chat.component';
import { MaterialModule } from './../modules/material/material.module';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { animation } from '@angular/animations';
import { MentionModule } from 'angular-mentions';
@NgModule({
  declarations: [
    UserlistComponent,
    ChatlistComponent,
    UserinfoComponent,
    ChatComponent,
   
  ],
 
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    MentionModule
  ],
  providers:[
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatModule { }
