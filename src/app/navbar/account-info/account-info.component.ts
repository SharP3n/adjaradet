import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  @ViewChild('password') password: ElementRef;

  constructor(private store: Store<{accounts: Account[]}>) { }

  ngOnInit(): void {
    this.accounts = this.store.select('accounts');
  }
  
  accounts: Observable<Account[]>

  toggleVisibility() {
    if (this.password.nativeElement.type === "password") {
      this.password.nativeElement.type = "text";
    } else {
      this.password.nativeElement.type = "password";
    }
  }
}
