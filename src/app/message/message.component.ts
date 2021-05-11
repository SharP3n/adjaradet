import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges {

  constructor(private accountService: AccountService) { }
  @ViewChild('messageElem') messageElem: ElementRef;

  border: string;
  error: boolean;

  ngOnInit(): void {

    this.accountService.message.subscribe((message) => {
      this.message = message.message;
      this.error = message.error;
      // if(message.error){
      //   this.border = '1px solid red'
      // }
      // else{
      //   this.border = '1px solid green'
      // }
      this.autoCancelMessage();
    })
  }

  autoCancelMessage(){
    this.messageElem.nativeElement.style='opacity: 1';
    setTimeout(() => {
      this.messageElem.nativeElement.style='opacity: 0';
    }, 5000);
  }

  message: string;

  ngOnChanges(changes){
  }
}