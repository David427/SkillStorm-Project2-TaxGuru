DROP SEQUENCE IF EXISTS form_1099_data_id_seq CASCADE;
DROP SEQUENCE IF EXISTS form_w2_data_id_seq CASCADE;
DROP SEQUENCE IF EXISTS adjustments_id_seq CASCADE;
DROP SEQUENCE IF EXISTS tax_returns_id_seq CASCADE;

DROP TABLE IF EXISTS form_1099_data CASCADE;
DROP TABLE IF EXISTS form_w2_data CASCADE;
DROP TABLE IF EXISTS adjustments CASCADE;
DROP TABLE IF EXISTS tax_returns CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE form_1099_data (
  id SERIAL PRIMARY KEY,
  account_num VARCHAR,
  income NUMERIC,
  fed_tax_withheld NUMERIC,
  payer_name VARCHAR(200),
  payer_state VARCHAR(2),
  payer_zip_code VARCHAR(10)
);

CREATE TABLE form_w2_data (
  id SERIAL PRIMARY KEY,
  eid VARCHAR(50),
  emp_name VARCHAR(100),
  emp_street_address VARCHAR(200),
  emp_city VARCHAR(100),
  emp_state VARCHAR(2),
  emp_zip_code VARCHAR(10),
  income NUMERIC,
  fed_tax_withheld NUMERIC,
  ss_tax_withheld NUMERIC,
  medi_tax_withheld NUMERIC
);

CREATE TABLE adjustments (
  id SERIAL PRIMARY KEY,
  std_deduction boolean
);

CREATE TABLE tax_returns (
	id SERIAL PRIMARY KEY,
  tax_year VARCHAR(4),
  filing_status VARCHAR(30),
  dependent BOOLEAN,
  claimed_dependents SMALLINT,
	total_income NUMERIC,
  total_tax_withheld NUMERIC,
  spouse_total_income NUMERIC,
  spouse_total_tax_withheld NUMERIC,
  taxable_income NUMERIC,
  total_tax_owed NUMERIC,
  return_result NUMERIC,
  form_1099_id INTEGER,
  FOREIGN KEY (form_1099_id) REFERENCES form_1099_data (id),
  form_w2_id INTEGER,
  FOREIGN KEY (form_w2_id) REFERENCES form_w2_data (id),
  adjustments_id INTEGER,
  FOREIGN KEY (adjustments_id) REFERENCES adjustments (id)
);

CREATE TABLE users (
	username VARCHAR(50) PRIMARY KEY,
  email VARCHAR(100),
  first_name VARCHAR(50),
  last_name VARCHAR(100),
  suffix VARCHAR(10),
  date_of_birth DATE,
  ssn VARCHAR(11),
  street_address VARCHAR(200),
  city VARCHAR(100),
  user_state VARCHAR(2),
  zip_code VARCHAR(10),
  phone_number VARCHAR(20),
  user_password VARCHAR,
  user_role VARCHAR(20),
  tax_return_id INTEGER,
  FOREIGN KEY (tax_return_id) REFERENCES tax_returns (id)
);

INSERT INTO users (username, email, first_name, last_name, suffix, date_of_birth, ssn, street_address, city, user_state, zip_code, phone_number, user_password, user_role)
VALUES ('user01', 'user01@email.com', 'User', 'Oh-One', 'Jr.', '2000-12-31', '123-45-6789', '100 Street Rd', 'Anytown', 'NC', '27607', '919-123-4567', '$2y$10$ddPzzgt1CRUQpAHBudutHejN1PSpPfU93MRIZXi6bnkUAs10qwg.W', 'USER');

INSERT INTO adjustments (std_deduction)
VALUES (true);

INSERT INTO tax_returns (filing_status, tax_year, dependent, claimed_dependents, total_income, total_tax_withheld, spouse_total_income, spouse_total_tax_withheld, return_result, adjustments_id)
VALUES ('Married', '2023', false, 0, 50000.00, 20000.00, 30000.00, 12000.00, 0, 1);

INSERT INTO users (username, email, first_name, last_name, date_of_birth, ssn, street_address, city, user_state, zip_code, phone_number, user_password, user_role, tax_return_id)
VALUES ('user02', 'user02@email.com', 'User', 'Oh-Two', '2001-01-01', '234-56-7890', '150 Street Rd', 'Anytown', 'VA', '23704', '757-123-4567', '$2y$10$IkQCJFjl2Aj78EIS2XJ50Onta7zKCVoRA4bFJl3ohyRx0HtllNt9K', 'USER', 1);

INSERT INTO form_w2_data (eid, emp_name, emp_street_address, emp_city, emp_state, emp_zip_code, income, fed_tax_withheld, ss_tax_withheld, medi_tax_withheld)
VALUES ('1234567890', 'Super Company', '5000 Business Blvd', 'Moneytown', 'NY', '10024', 60000.00, 24000.00, 4000.00, 2500.00);

INSERT INTO adjustments (std_deduction)
VALUES (true);

INSERT INTO tax_returns (filing_status, tax_year, dependent, claimed_dependents, total_income, total_tax_withheld, spouse_total_income, spouse_total_tax_withheld, return_result, form_w2_id, adjustments_id)
VALUES ('Married', '2023', false, 0, 60000.00, 24000.00, 50000.00, 28000.00, 3475.00, 1, 2);

INSERT INTO users (username, email, first_name, last_name, date_of_birth, ssn, street_address, city, user_state, zip_code, phone_number, user_password, user_role, tax_return_id)
VALUES ('user03', 'user03@email.com', 'User', 'Oh-Three', '2002-02-02', '345-67-8901', '200 Street Rd', 'Anytown', 'MA', '02123', '618-123-4567', '$2y$10$LfCwb0vNERSnCdXiHgrnIen3NSsBBCM4S/1EF/u04EkUWq4Jf4nNO', 'USER', 2);

INSERT INTO form_1099_data (account_num, income, fed_tax_withheld, payer_name, payer_state, payer_zip_code)
VALUES ('1234567890', 42784.15, 12457.48, 'Uber Technologies', 'CA', '90210');

INSERT INTO adjustments (std_deduction)
VALUES (true);

INSERT INTO tax_returns (filing_status, tax_year, dependent, claimed_dependents, total_income, total_tax_withheld, spouse_total_income, spouse_total_tax_withheld, return_result, form_1099_id, adjustments_id)
VALUES ('Single', '2023', false, 0, 42784.15, 12457.48, 0, 0, -5472.15, 1, 3);

INSERT INTO users (username, email, first_name, last_name, date_of_birth, ssn, street_address, city, user_state, zip_code, phone_number, user_password, user_role, tax_return_id)
VALUES ('user04', 'user04@email.com', 'User', 'Oh-Four', '2003-03-03', '456-78-9012', '250 Street Rd', 'Anytown', 'CA', '90210', '909-123-4567', '$2y$10$nxr4RmnlNNai8Im6VQOQKOqmYbgmgq.oIuzTmGa.ocQTWH8h6CRpK', 'USER', 3);

INSERT INTO form_w2_data (eid, emp_name, emp_street_address, emp_city, emp_state, emp_zip_code, income, fed_tax_withheld, ss_tax_withheld, medi_tax_withheld)
VALUES ('9876543210', 'Company, Inc.', '7784 Currency Ct', 'Richville', 'WA', '98108', 85000.00, 36000.00, 8000.00, 5000.00);

INSERT INTO form_1099_data (account_num, income, fed_tax_withheld, payer_name, payer_state, payer_zip_code)
VALUES ('1234567890', 42784.15, 12457.48, 'Uber Technologies', 'CA', '90210');

INSERT INTO adjustments (std_deduction)
VALUES (true);

INSERT INTO tax_returns (filing_status, tax_year, dependent, claimed_dependents, total_income, total_tax_withheld, spouse_total_income, spouse_total_tax_withheld, return_result, form_w2_id, form_1099_id, adjustments_id)
VALUES ('Single', '2023', false, 0, 85000.00, 24000.00, 0, 0, 3475.00, 2, 2, 4);

INSERT INTO users (username, email, first_name, last_name, date_of_birth, ssn, street_address, city, user_state, zip_code, phone_number, user_password, user_role, tax_return_id)
VALUES ('user05', 'user05@email.com', 'User', 'Oh-Five', '2004-04-04', '567-89-0123', '300 Street Rd', 'Anytown', 'AL', '35004', '251-123-4567', '$2y$10$nUUed2Yt3hDkvbqRz5IYvu1cwTodXCaek3Sn7sARiSShTVtINCpvS', 'USER', 4);