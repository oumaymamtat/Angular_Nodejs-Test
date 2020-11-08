import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class FileService {
 
  SERVER_URL: string = "https://file.io/";  

  constructor(private httpClient:HttpClient){}

  envoiFichier(fichierAEnvoyer: File): Observable<boolean> {
    const url = 'URL du site vers lequel envoyer le fichier';
    const formData: FormData = new FormData();
    formData.append('fichier', fichierAEnvoyer, fichierAEnvoyer.name);
    return this.httpClient
      .post(url, formData, )
      .map(() => { return true; })
      .catch((e) => this.handleError(e));
}
  handleError(e: any): import("rxjs").ObservableInput<boolean> {
    throw new Error('Method not implemented.');
  }

}