import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('messageState', [
      state('inactive', style({
        'left': '0px',
        'transform': 'translateX(-100%)'
      })),
      state('active', style({
        'left': '30px',
        'transform': 'translateX(0)'
      })),
      transition('inactive <=> active', animate(1000)),
    ])
  ]
})

export class MessageComponent implements OnInit, OnChanges {

  constructor() { }
  // @ViewChild('messageElem') messageElem: ElementRef;

  state = 'inactive'
  @Input() messageData: {message: string, error: boolean, state: string};

  ngOnChanges(changes){

    setTimeout(() => {
    this.state = this.messageData?.state;
    }, 0);

    setTimeout(() => {
      this.state = 'inactive'
    }, 5000);

  }

  ngOnInit(): void {

  }

}