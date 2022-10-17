import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './../chat.service';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  about: any = false;
  images: any = false;
  files: any = false;
  pinned: any = false;
  constructor(private sidenav: ChatService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  additionalDetails(name: any) {
    if (name == 'about'){
      this.about = !this.about;
        if(this.about == true){
          this.images = false
          this.files = false
          this.pinned = false
        }    
    }
    if (name == "images"){
      this.images = !this.images;
      if(this.images == true){
        this.about = false
        this.files = false
        this.pinned = false
      }    
    }
    if (name == "files"){
      this.files = !this.files;
      if(this.files == true){
        this.about = false
        this.images = false
        this.pinned = false
      }    
    }
    if (name == "pinned"){
      this.pinned = !this.pinned;
      if(this.pinned == true){
        this.about = false
        this.files = false
        this.images = false
      }    
    }
  }

  closeSidenav() {
		this.sidenav.close();
	}

}
