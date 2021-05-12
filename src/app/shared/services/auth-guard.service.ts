import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "./account.service";
import { Injectable, OnInit } from '@angular/core'

@Injectable()

export class AuthGuard implements CanActivate, OnInit{
    canActivate(): Observable<boolean> | Promise<boolean> | boolean{
        return this.checkAccountActivity();
    }

    checkAccountActivity(){
        if(this.accountService.loggedIn){
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
    }

    ngOnInit(){
    }

    constructor(private accountService: AccountService, private router: Router){

    }
    

}