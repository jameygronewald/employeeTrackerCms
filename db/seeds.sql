DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY(id)
);

INSERT INTO department(name)
VALUES ('Sales'), ('Management'), ('Marketing'), ('Operations');

INSERT INTO role(title, salary, department_id)
VALUES ('Account Manager', 55000, 1), ('Operations Manager', 75000, 2), ('Ad Specialist', 60000, 3), ('Warehouse', 43000, 4), ('Sales and Marketing Manager', 80000, 2), ('Regional Sales Manager', 70000, 1), ('Data Analyst', 60000, 3), ('Facility Manager', 53000, 4);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ('John', 'Doe', 2), ('Mary', 'Olsen', 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Smith', 1, 2), ('Nancy', 'Drew', 7, 2), ('Jamey', 'Gronewald', 3, 2), ('Jerry', 'Jones', 4, 1), ('Gracie', 'Olsen', 8, 1), ('Willow', 'Agnes', 6, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;