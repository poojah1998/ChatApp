import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    path:'chat/:conversationId',
    component:ChatComponent
  },
  {
    path:'chat/:conversationId/:userId',
    component:ChatComponent,
  },
  {
    path:'chat',
    component:ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
