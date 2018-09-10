set schema 'expense_reimbursement_system';

CREATE TABLE ers_users (
  ers_users_id serial primary key,
  ers_username varchar not null,
  ers_password varchar not null,
  user_first_name varchar,
  user_last_name varchar,
  user_email varchar,
  user_role_id int DEFAULT 1
);

CREATE TABLE ers_user_roles (
  ers_user_role_id serial primary key,
  user_role varchar
)
;
-- Creating two type of user role: Employee & Finance Manager.
INSERT INTO ers_user_roles (user_role) values ('Employee'), ('Finance Manager');

-- Selecting all Employee.
SELECT * FROM ers_users eu INNER JOIN ers_user_roles eur ON eu.user_role_id = eur.ers_user_role_id;

CREATE TABLE ers_reimbursement (
  reimb_id serial primary key,
  reimb_amount float NOT NULL,
  reimb_submitted timestamptz NOT NULL DEFAULT now(),
  reimb_resolved timestamptz NOT NULL DEFAULT now(),
  reimb_description varchar NOT NULL,
  reimb_receipt varchar,
  reimb_authur int NOT NULL,
  reimb_resolver int,
  reimb_status_id int,
  reimb_type_id int NOT NULL
);

CREATE TABLE ers_reimbursement_status (
  reimb_status_id serial primary key,
  reimb_status varchar NOT NULL
);

--Creating reimbursement status: Approve and Deny
INSERT INTO ers_reimbursement_status (reimb_status) values ('Approve'), ('Deny');

CREATE TABLE ers_reimbursement_type (
  reimb_type_id serial primary key,
  reimb_type varchar NOT NULL
);

--Creating reimbursement type: lodging, travel, food, and other
INSERT INTO ers_reimbursement_type (reimb_type) values ('LODGING'), ('TRAVEL'), ('FOOD'), ('OTHER');