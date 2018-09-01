import { ErsUser } from "../model/ers-user";
import { SqlErsUser } from "../dto/sql-ers-user";

export function ersUserConverter(ersUser: SqlErsUser) {
  return new ErsUser(ersUser.ers_users_id, ersUser.ers_username, ersUser.ers_password,
                     ersUser.user_first_name, ersUser.user_last_name,
                     ersUser.user_email, ersUser.user_role_id);
}