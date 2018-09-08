import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { ersReimbursementConverter } from "../util/ers-reimbursement-converter";
import { SqlReimbursement } from "../dto/sql-reimbursements";

/**
 * Retreive all reimbursement from the database
 */
export async function findAll(): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM expense_reimbursement_system.ers_reimbursement');
    return resp.rows.map(ersReimbursementConverter);
  } finally {
    client.release();
  }
}

// /**
//  * Retreive a reimbursement by its id
//  * @param id 
//  */
export async function findById(id: number): Promise<Reimbursement> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM expense_reimbursement_system.ers_reimbursement WHERE reimb_id = $1', [id]);
    let movie: SqlReimbursement = resp.rows[0];
    if (movie !== undefined) {
      return ersReimbursementConverter(movie);
    } else {
      return undefined;
    }
  } finally {
    client.release();
  }
}

// /**
//  * Add a new reimbursement to the DB
//  * @param movie 
//  */
export async function createReimbursement(reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO expense_reimbursement_system.ers_reimbursement 
        (reimb_amount, reimb_description, reimb_authur, reimb_type_id)
        VALUES ($1, $2, $3, $4)
        RETURNING reimb_id`, 
        [
            reimbursement.reimbAmount, 
            reimbursement.reimbDescription, 
            reimbursement.reimbAuthur,
            reimbursement.reimbTypeId
        ]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}

//update approve/deny a reimbursement
export async function changeReimbStatus(reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      'UPDATE expense_reimbursement_system.ers_reimbursement SET reimb_resolver = $1, reimb_status_id = $2 WHERE reimb_id = $3 RETURNING reimb_id', 
      [
        reimbursement.reimbResolver,
        reimbursement.reimbStatusId,
        reimbursement.reimbId
      ]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
