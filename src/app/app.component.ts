import { Component, OnInit } from '@angular/core';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adjaradet';

  constructor(private accountService: AccountService) {}

  ngOnInit(){
    this.accountService.autoLogIn();
  }




}
