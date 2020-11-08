import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  sendEmail(url, data) {
    console.log("excute send email with url ="+url+" and data = ");
    console.log(data);
    return this.http.post(url, data);
  }
}
