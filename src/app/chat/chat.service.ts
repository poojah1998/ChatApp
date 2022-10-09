import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Injectable({
	providedIn: 'root'
})
export class ChatService {
	private sidenav!: MatSidenav;
	private leftsidenav!: MatSidenav;
	constructor() { }

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
}
