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
        "_id": "63469c43a452cf0c5c545e12",
        "name": "ABC",
        "email": "ABC@gmail.com",
        "phone_no": 1234567891,
        "user_type": "RP",
        "__v": 0,
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png"
    }))
  }
 

}
