import { Reimbursement } from './reimbursement';

export class ErsUser {
    
    ersUsersId= 0;
    ersUsername= '';
    ersPassword= '';
    ersUserFirstName = '';
    ersUserLastName = '';
    ersUserEmail = '';
    ersUserRoleId = 0;
    Reimbursement: Reimbursement[] = [];

    constructor(ersUserId?: number, ersUsername?: string, ersPassword?: string, ersUserFirstname?: string,
                ersUserLastName?: string, ersUserEmail?: string, ersUserRoleId?: number, Reimbursement?: Reimbursement[]){
    
        ersUserId && (this.ersUsersId = ersUserId);
        ersUsername && (this.ersUsername = ersUsername);
        ersPassword && (this.ersPassword = ersPassword);
        ersUserFirstname && ( this.ersUserFirstName = ersUserFirstname);
        ersUserLastName && ( this.ersUserLastName = ersUserLastName);  
        ersUserEmail && (this.ersUserEmail = ersUserEmail);
        ersUserRoleId && (this.ersUserRoleId = ersUserRoleId);
        Reimbursement && (this.Reimbursement = Reimbursement);
                      
    }

  }