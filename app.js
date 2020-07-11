const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// const functions = require("./lib/functions")

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

const showEmployees = () => {
    connection.query(
        `SELECT employee.id AS ID, employee.first_name AS EMPLOYEE_FIRST, employee.last_name AS EMPLOYEE_LAST, role.title AS TITLE, role.salary AS SALARY, role.department_id AS DEPARTMENT_ID 
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id;`, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
};

const showEmployeesByManager = () => {
    connection.query(
    `SELECT A.id AS ID, A.first_name AS EMPLOYEE_FIRST_NAME, A.last_name as EMPLOYEE_LAST_NAME, B.first_name AS MANAGER_FIRST_NAME, B.last_name AS MANAGER_LAST_NAME 
    FROM employee A, employee B 
    WHERE A.manager_id = B.id 
    ORDER BY MANAGER_LAST_NAME;`, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
};

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
        connection.query('INSERT INTO employee SET ?', employeeData, err => {
            if (err) throw err;
            console.log(`Successfully added employee ${employeeData.first_name} ${employeeData.last_name}!`);
            init();
        });
    });
};

const updateEmployeeRole = () => {
    connection.query('SELECT * FROM employee', (err, eData) => {
        if (err) throw err;
        let employeeChoices = eData.map(employee => `${employee.id}. ${employee.first_name} ${employee.last_name}`);
        connection.query('SELECT role.id, role.title FROM role', (err, roleData) => {
            if (err) throw err;
            let titles = roleData.map(role => `${role.id}. ${role.title}`);
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which employee would you like to update?',
                    choices: employeeChoices,
                    name: 'employee'
                },
                {
                    type: 'list',
                    message: 'What role would you like to give that employee?',
                    choices: titles,
                    name: 'title'
                }
            ]).then(answers => {
                let employeeId = answers.employee.slice(0, 1);
                let roleId = answers.title.slice(0, 1);
                let employeeName = answers.employee.slice(3);
                let employeeTitle = answers.title.slice(3);
                connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], err => {
                    if (err) throw err;
                    console.log(`Successfully changed ${employeeName}'s title to ${employeeTitle}!`);
                    init();
                });
            });
        });
    });
};

const updateEmployeeManager = () => {
    connection.query('SELECT * FROM employee', (err, eData) => {
        if (err) throw err;
        let employeeChoices = eData.map(employee => `${employee.id}. ${employee.first_name} ${employee.last_name}`);
        /* connection.query(
            `SELECT employee.id AS ID, employee.first_name AS EMPLOYEE_FIRST, employee.last_name AS EMPLOYEE_LAST, role.department_id AS DEPARTMENT_ID 
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id;`, (err, managerData) => {
            if (err) throw err;
            console.log(managerData);
            let managers = managerData.reduce(manager => `${role.id}. ${role.title}`); */
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which employee would you like to update?',
                    choices: employeeChoices,
                    name: 'employee'
                },
                {
                    type: 'list',
                    message: 'Which manager would you like to assign to that employee?',
                    choices: employeeChoices,
                    name: 'manager'
                }
            ]).then(answers => {
                let employeeId = answers.employee.slice(0, 1);
                let managerId = answers.manager.slice(0, 1);
                let employeeName = answers.employee.slice(3);
                let employeeManager = answers.manager.slice(3);
                connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId], err => {
                    if (err) throw err;
                    console.log(`Successfully changed ${employeeName}'s manager to ${employeeManager}!`);
                    init();
                });
            });
        });
    /* }); */
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
        connection.query('INSERT INTO role SET ?', roleData, err => {
            if (err) throw err;
            console.log(`Successfully added role ${roleData.title}!`);
            init();
        });
    });
};


const showRoles = () => {
    connection.query(
        `SELECT role.id AS ID, role.title AS TITLE, role.salary AS SALARY, department.name AS DEPARTMENT_NAME 
        FROM role 
        LEFT JOIN department 
        ON role.department_id = department.id`, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
};

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

const showDepartments = () => {
    connection.query('SELECT id AS ID, name AS DEPARTMENT FROM department', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
};

const getBudgetByDepartment = () => {
    connection.query('SELECT department.name AS DEPARTMENT, SUM(role.salary) AS DEPARTMENT_BUDGET FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.name', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
};

const init = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userAction',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by manager',
                'Add a new employee',
                'Remove an employee',
                'Update an employee role',
                'Update an employee manager',
                'Add a new role',
                'View all roles',
                'Add a new department',
                'View all departments',
                'Get budget by department',
                'Exit'
            ]
        }
    ]).then(data => {
        switch (data.userAction) {
            case 'View all employees':
                showEmployees();
                break;
            case 'View all employees by manager':
                showEmployeesByManager();
                break;
            case 'Add a new employee':
                addEmployee();
                break;
            case 'Remove an employee':
                deleteEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Update an employee manager':
                updateEmployeeManager();
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
            case 'Get budget by department':
                getBudgetByDepartment();
                break;
            default:
                connection.end();
        }
    });
};

// connect to the mysql server and sql database
connection.connect(err => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});