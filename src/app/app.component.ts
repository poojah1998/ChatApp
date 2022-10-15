import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatapp';

  constructor() {
    localStorage.setItem("loginUserData", JSON.stringify({
       
        "name": "me",
        "email": "me@gmail.com",
        "phone_no": 8763039826,
        "user_type": "DC",
        "_id": "634a8484aea2a36cefd8b36d",
        "__v": 0
    
    }))
  }
 

}
