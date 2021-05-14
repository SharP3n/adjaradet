import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor(
    private accountService: AccountService,
  ) {}

  private activatedSub: Subscription;

  ngOnInit(): void {
    this.activatedSub = this.accountService.displayModal.subscribe((modalInfo: {displayModal: boolean, action: string}) => {
      this.action = modalInfo.action;
      this.showModal = modalInfo.displayModal;
    })
  }

  action: string;
  showModal: boolean;

  closeModal(modal:HTMLDivElement){
    if(modal.classList.contains('modal')){
      this.showModal=false;
    }
  }

  ngOnDestroy(){
    this.activatedSub.unsubscribe();
  }


  
}
