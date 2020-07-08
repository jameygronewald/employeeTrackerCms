const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "ferial08",
  database: "employeeTrackerDB"
});

const init = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userAction',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by role',
                'Add a new employee',
                'Remove an employee',
                'Update an employee role',
                'Update an employee manager',
                'Add a new role',
                'View all roles',
                'Add a new deparment',
                'View all departments'
            ]
        }
    ]).then(data => {
        switch (data.userAction) {
            case 'View all employees':
                break;
            case 'View all employees by department':
                break;
            case 'View all employees by role':
                break;
            case 'Add a new employee':
                addEmployee();
                break;
            case 'Remove an emlpoyee':
                break;
            case 'Update an employee role':
                break;
            case 'Update an employee manager':
                break;
            case 'Add a new role':
                break;
            case 'View all roles':
                break;
            case 'Add a new department':
                break;
            case 'View all departments':
                break;
        }
        console.log(data.userAction);
    });
};

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});

