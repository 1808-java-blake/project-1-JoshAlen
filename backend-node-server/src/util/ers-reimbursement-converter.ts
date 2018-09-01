import { Reimbursement } from "../model/reimbursement";
import { SqlReimbursement } from "../dto/sql-reimbursements";

export function ersReimbursementConverter(reimbursement: SqlReimbursement) {
  return new Reimbursement(
    reimbursement.reimb_id, 
    reimbursement.reimb_amount, 
    reimbursement.reimb_submitted,
    reimbursement.reimb_resolved, 
    reimbursement.reimb_description, 
    reimbursement.reimb_receipt,
    reimbursement.reimb_authur, 
    reimbursement.reimb_resolver, 
    reimbursement.reimb_status_id,
    reimbursement.reimb_type_id 
  );
} 