import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { ErsUser } from "../model/ers-user";
import { ersReimbursementConverter } from "../util/ers-reimbursement-converter";
import { ersUserConverter } from "../util/ers-user-converter";

export async function findAll(): Promise<ErsUser[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM expense_reimbursement_system.ers_users eu
        LEFT JOIN expense_reimbursement_system.ers_reimbursement er
        ON eu.ers_users_id = er.reimb_authur`);
        
    // extract the users and their reimbursement from the result set
    let users = [];
    resp.rows.forEach((userReimbursementResult) => {
      console.log(userReimbursementResult);
      const reimbursement = ersReimbursementConverter(userReimbursementResult);
      const exists = users.some( existingUser => {
        if(userReimbursementResult.ers_users_id === existingUser.ersUsersId) {
          reimbursement.reimbAuthur && existingUser.Reimbursement.push(reimbursement);
          return true;
        }
      })
      if (!exists) {
        const newUser = ersUserConverter(userReimbursementResult);
        reimbursement.reimbAuthur && newUser.Reimbursement.push(reimbursement);
        users.push(newUser);
      }
    })
    return users;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users reimbursement
 * @param id 
 */
export async function findById(id: number): Promise<ErsUser> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
       `SELECT * FROM expense_reimbursement_system.ers_users eu
        LEFT JOIN expense_reimbursement_system.ers_reimbursement er
        ON eu.ers_users_id = er.reimb_authur WHERE eu.ers_users_id = $1`, [id]);
        
        let user;

        if(resp.rows[0]){
          user = ersUserConverter(resp.rows[0]); // get the user data from first row
                  
          // get the reimbursement from all the rows
          resp.rows.forEach((reimbursement) => {
            reimbursement.reimb_authur && user.Reimbursement.push(ersReimbursementConverter(reimbursement));
          });
          
        } 

        return user;
  } finally {
    client.release();
  }
}

// /**
//  * Retreive a single user by username and password, will also retreive all of that users reimbursement
//  * @param id 
//  */
export async function findByUsernameAndPassword(username: string, password: string): Promise<ErsUser> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM expense_reimbursement_system.ers_users u
        WHERE u.ers_username = $1
        AND u.ers_password = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return ersUserConverter(resp.rows[0]); // get the user data from first row
        }
        return null;
  } finally {
    client.release();
  }
}

//create new ers-user account
 export async function create(user: ErsUser): Promise<number> {
   const client = await connectionPool.connect();

   try {
     const resp = await client.query(
       `INSERT INTO expense_reimbursement_system.ers_users 
         (ers_username, ers_password, user_first_name,
          user_last_name, user_email)
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING ers_users_id`, 
         [
           user.ersUsername, 
           user.ersPassword, 
           user.ersUserFirstName,
           user.ersUserLastName,
           user.ersUserEmail
        ]);
      
     return resp.rows[0].ers_users_id;
   } finally {
     client.release();
   }
 }