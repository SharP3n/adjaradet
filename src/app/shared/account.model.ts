export interface Account {
    username?: string;
    email: string;
    password: string;
    id?: string
    balance: number;
}

// export class Account{ ???????maybe needed in account reducer??????

//     constructor(public username: string, public email: string, public password: string){
//         this.username = username;
//         this.email = email;
//         this.password = password;
        
//     }
    
// }