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
      
        "_id": "6077cd1938b14c30d47b8adb",

        "department": [
          "Cancer"
        ],
        "name": "Dhruv Chhabra",
        "associatedhospital": {
          "$oid": "608923e16c9e212d6443fff9"
        },
        "degree": "MBBS",
        "expirence": "23",
        "user": "6076ddf9305343214c6f90bc",
        "__v": 0,
        "profile": {
          "fieldname": "profile",
          "originalname": "13ee56ed-c91f-421c-95aa-d01fa8de337e.jpg",
          "encoding": "7bit",
          "mimetype": "image/jpeg",
          "size": 96916,
          "bucket": "devoperation",
          "key": "2021-05-09T08-34-19.338Z13ee56ed-c91f-421c-95aa-d01fa8de337e.jpg",
          "acl": "public-read",
          "contentType": "image/jpeg",
          "contentDisposition": null,
          "storageClass": "STANDARD",
          "serverSideEncryption": null,
          "metadata": {
            "fieldName": "profile"
          },
          "location": "https://devoperation.s3.ap-south-1.amazonaws.com/2021-05-09T08-34-19.338Z13ee56ed-c91f-421c-95aa-d01fa8de337e.jpg",
          "etag": "\"a50181a0fd953a97d430f1d5ced5617d\"",
          "versionId": null
        }

      }))
  }


}
