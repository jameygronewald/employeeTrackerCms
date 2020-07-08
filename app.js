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

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter the first name of the new employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the last name of the new employee:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please enter the id of the role that your new employee has:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Please enter the id of this employee\'s manager (if applicable):'
        }
    ]).then(employeeData => {
        console.log(employeeData);
        connection.query('INSERT INTO employee SET ?', employeeData, err => {
            if (err) throw err;
            console.log(`Successfully added employee ${employeeData.first_name} ${employeeData.last_name}!`);
            init();
        });
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of the new department:'
        }
    ]).then(departmentData => {
        console.log(departmentData);
        connection.query('INSERT INTO department SET ?', departmentData, err => {
            if (err) throw err;
            console.log(`Successfully added department ${departmentData.name}!`);
            init();
        });
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the job title associated with the new role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary of the new role:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Please enter the id of the department that contains your role:'
        }
    ]).then(roleData => {
        console.log(roleData);
        connection.query('INSERT INTO role SET ?', roleData, err => {
            if (err) throw err;
            console.log(`Successfully added role ${roleData.title}!`);
            init();
        });
    });
}

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
                'Add a new department',
                'View all departments'
            ]
        }
    ]).then(data => {
        switch (data.userAction) {
            case 'View all employees':
                showEmployees();
                break;
            case 'View all employees by department':
                showEmployees();
                break;
            case 'View all employees by role':
                showEmployees();
                break;
            case 'Add a new employee':
                addEmployee();
                break;
            case 'Remove an employee':
                deleteEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
            case 'Update an employee manager':
                updateEmployee();
                break;
            case 'Add a new role':
                addRole();
                break;
            case 'View all roles':
                showRoles();
                break;
            case 'Add a new department':
                addDepartment();
                break;
            case 'View all departments':
                showDepartments();
                break;
            default:
                connection.end();
        }
        console.log(data.userAction);
    });
};

// connect to the mysql server and sql database
connection.connect(err => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});

