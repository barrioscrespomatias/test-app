import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importa AfterViewInit
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms'; // Importa FormsModules
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';


@Component({
  selector: 'app-custom-captcha',
  templateUrl: './custom-captcha.component.html',
  styleUrls: ['./custom-captcha.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomCaptchaComponent{

  constructor(private sweetAlertServicio: SweetAlertService,){

  }
  
  @Input() visible:boolean = false;
  @Output() captchaVerified: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  captchaText: any = [];
  captchaEntered: string = '';
  captchaPassed = this.visible ? false : true;

  async ngOnInit() {
    this.GenerateCaptcha();
    
  }

  MakeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  GenerateCaptcha() {
    // let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const lengthOfCode = 1;

    for (let i = 0; i < 5; i++) {
      let captchaChar = this.MakeRandom(lengthOfCode, possible);
      this.captchaText[i] = captchaChar;
    }

    this.captchaEntered = "";
  }

  ValidateCaptcha() {
    let i = 0;
    let letterNotPassed = 0;
    for (i; i < 5; i++) {
      if (this.captchaEntered.charAt(i) != this.captchaText[i]) {
        letterNotPassed ++;
      }
    }

    if(letterNotPassed > 0)
      this.GenerateCaptcha();
    else{
      this.captchaPassed = true;
      this.captchaVerified.emit(true);
      this.visible = false;
    }
  }
}