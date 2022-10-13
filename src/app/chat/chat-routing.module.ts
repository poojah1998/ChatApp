import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    path:'chatlist/:id',
    component:ChatlistComponent
  },
  {
    path:'userinfo',
    component:UserinfoComponent
  },
  {
    path:'userlist',
    component:UserlistComponent
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
