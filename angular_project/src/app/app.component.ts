import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from './services/file.service';
import { HttpService } from './services/http.service';
import { ViewChild, ElementRef  } from '@angular/core';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;
    fichierAEnvoyer: File = null;

    @ViewChild("cv", {static: false}) cv: ElementRef;files  = [];  
    
    constructor(private formBuilder: FormBuilder,public http: HttpService,private fileService: FileService) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            cv: ['', [Validators.required]],         
        });
    }
    get f() { return this.registerForm.controls; }

    envoiFichier (fichiers: FileList) {
      this.fichierAEnvoyer = fichiers.item(0);
    }

    envoiFichierParLeService() {
    this.fileService.envoiFichier(this.fichierAEnvoyer).subscribe(resultat => {
      console.log("enovoyé");
      }, erreur => {
        console.log("Erreur lors de l'envoi du fichier : ", erreur);
      });
    }
       
    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        let user = {
          firstName: this.registerForm.get('firstName').value,
          lastName: this.registerForm.get('lastName').value,
          email: this.registerForm.get('email').value,
          cv: this.registerForm.get('cv').value,
        }
        this.http.sendEmail("http://localhost:3000/",user).subscribe(
          data=>{
            let res:any = data; 
            console.log(user.firstName+'is successfully register ');
           /* console.log("data = "+data);
            console.log(this.registerForm.value+"successufly registered ");*/
          },
          err =>{
            console.log(err);
          },
        ) 
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}