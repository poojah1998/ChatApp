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
      "_id": "61878a6c913d7a1c604ce3bb",
      "department": [
        "Cancer"
      ],
      "name": "dhruv",
      "associatedhospital": "6187895660d4b33a28bdcfac",
      "degree": "32",
      "expirence": "32",
      "profile": {
        "fieldname": "profile",
        "originalname": "check.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "size": 30543,
        "bucket": "devoperation",
        "key": "2021-11-07T08-12-27.716Zcheck.png",
        "acl": "public-read",
        "contentType": "image/png",
        "contentDisposition": null,
        "storageClass": "STANDARD",
        "serverSideEncryption": null,
        "metadata": {
          "fieldName": "profile"
        },
        "location": "https://devoperation.s3.ap-south-1.amazonaws.com/2021-11-07T08-12-27.716Zcheck.png",
        "etag": "\"08258ba4f268e9d2749cfcbd49f4f216\""
      },
      "user": "618778b60a25131d041d1e07",
      "createdAt": {
        "$date": {
          "$numberLong": "1636272748393"
        }
      },
      "updatedAt": {
        "$date": {
          "$numberLong": "1636272748393"
        }
      },
      "__v": 0
    }))
  }


}
