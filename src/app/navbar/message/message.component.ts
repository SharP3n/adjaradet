import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

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
        'left': '25px',
        'transform': 'translateX(0)'
      })),
      transition('inactive <=> active', animate(900)),
    ])
  ]
})

export class MessageComponent implements OnInit, OnChanges {

  constructor() { }

  state = 'inactive'
  @Input() messageData: {message: string, error: boolean, state: string};

  ngOnChanges(){

    setTimeout(() => {
    this.state = this.messageData?.state;
    }, 0);

    setTimeout(() => {
      this.state = 'inactive'
    }, 4000);
  }

  ngOnInit(): void {
  }

}