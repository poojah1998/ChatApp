import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';


const credentialsKey = 'currentUser';
@Injectable({
	providedIn: 'root'
})
export class ChatService {
	private sidenav!: MatSidenav;
	private leftsidenav!: MatSidenav;
	constructor(private httpClient: HttpClient) { }
  

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}
	public setLeftSidenav(leftsidenav: MatSidenav) {
		this.leftsidenav = leftsidenav;
	}

	public open() {
		this.sidenav.open();
	}
	public close() {
		this.sidenav.close();
	}
	public toggle(): void {
		this.sidenav.toggle();
	}

	public openLeftNav() {
		this.leftsidenav.open();
	}
	public closeLeftNav() {
		this.leftsidenav.close();
	}
	public toggleLeftNav(): void {
		this.leftsidenav.toggle();
	}



	public getConversationListById(uid: string) {
		return this.httpClient.get(environment.host + uid+"/conversation");
	  }
	  public postConversation() {
		return this.httpClient.post(environment.host +"/conversation",{});
	  }
	  public getAllConversation(firstUserId: string,secondUserId: string) {
		return this.httpClient.get(environment.host + firstUserId+secondUserId+"/conversation");
	  }
	 public getMembers(uid:string){
		return this.httpClient.get(environment.host+uid+"/members")
	 }
	 public getConversationMembers(uid: string){
        return this.httpClient.post(environment.host+uid+"/conversationmembers",{})
	 }
	 
	public getToken(){
	
	}
	public removeToken(){
	  
	}
}
