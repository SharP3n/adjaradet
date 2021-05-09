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

  ngOnInit(): void {

    this.accountService.message.subscribe((message) => {
      console.log(message)
      this.message = message;
      this.cancelMessage();
    })
  }

  cancelMessage(){
    this.messageElem.nativeElement.style='opacity: 1';
    setTimeout(() => {
      this.messageElem.nativeElement.style='opacity: 0';
    }, 5000);
  }

  message: string;

  ngOnChanges(changes){
    console.log(changes)
  }
}