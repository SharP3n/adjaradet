import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.accountService.displayModal.subscribe((modalInfo: {displayModal: boolean, action: string}) => {
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


  
}
