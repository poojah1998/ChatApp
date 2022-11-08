import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


const credentialsKey = 'currentUser';


@Injectable({
	providedIn: 'root'
})
export class ChatService {
	private sidenav!: MatSidenav;
	private leftsidenav!: MatSidenav;
	userId: any; conversationId: any;
	
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

	public getAllConversation() {
		return this.httpClient.get(environment.host + "getAllconversation");
	}
	public getAllconversationUser(id: string) {
		return this.httpClient.get(environment.host + "getAllconversationUser/" + id);
	}
	public sendMessage(data: any) {
		return this.httpClient.post(environment.host + "addChat", data);
	}


	public allHashtag() {
		return this.httpClient.get(environment.host + "getAllhashtag");
	}
	public uploadMedia(data: any) {
		return this.httpClient.post(environment.host + "upload/media", data);
	}
	public getAllDoctors() {
		return this.httpClient.get(environment.host + "getAllDoctors");
	}
	public getAllRefferals() {
		return this.httpClient.get(environment.host + "allRefferals");
	}

	public getAllPhotos(id: string) {
		return this.httpClient.get(environment.host + "getAllChatImage/" + id);
	}
	public getAllFiles(id: string) {
		return this.httpClient.get(environment.host + "getAllChatFile/" + id);
	}
	public addConversationUser(payload: any) {
		return this.httpClient.post(environment.host + "addconversationUser", {});
	}
	public addConversation(payload: any) {
		return this.httpClient.post(environment.host + "addconversation", payload);
	}
	public addMoreUser(payload: any) {
		return this.httpClient.post(environment.host + "addMoreUser", payload);
	}
	// public getConversationListById(uid: string) {
	// 	return this.httpClient.get(environment.host + uid +"/conversation");
	//   }
	//   public postConversation() {
	// 	return this.httpClient.post(environment.host + "/conversation",{});
	//   }
	//   public getAllConversation(firstUserId: string,secondUserId: string) {
	// 	return this.httpClient.get(environment.host + firstUserId+secondUserId+"/conversation");
	//   }
	//  public getMembers(uid:string){
	// 	return this.httpClient.get(environment.host+uid+"/members")
	//  }
	//  public getConversationMembers(uid: string){
	//     return this.httpClient.post(environment.host+uid+"/conversationmembers",{})
	//  }
	public allMessageById(id: string) {
		return this.httpClient.get(environment.host + "getAllChatbyId/" + id);
	}
}
