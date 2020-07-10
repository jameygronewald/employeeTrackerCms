const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
};

const showEmployeesByRole = () => {
    connection.query('SELECT employee.id AS ID, employee.first_name AS EMPLOYEE_FIRST, employee.last_name AS EMPLOYEE_LAST, role.title AS TITLE, role.salary AS SALARY, role.department_id AS DEPARTMENT_ID FROM employee LEFT JOIN role ON employee.role_id = role.id ORDER BY role.title;', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
};

const showEmployeesByManager = () => {
    connection.query('SELECT A.id, A.first_name AS Emp_First_Name, A.last_name as Emp_Last_Name, A.role_id, B.first_name AS Mgr_First_Name, B.last_name AS Mgr_Last_Name FROM employee A, employee B WHERE A.manager_id = B.id ORDER BY Mgr_Last_Name;', (err, data) => {
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
    connection.query('SELECT id, first_name, last_name, role_id FROM employee', (err, data) => {
        let employeeList = data;
        console.log(employeeList);
    }).then(employeeList => {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employeeList
            }
        ]).then(employee => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', (err, data) => {
                if (err) throw err;
                console.log('Successfully changed role for employee 3 to 7!');
            });
        })
    })
}

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
    connection.query('SELECT * FROM role', (err, data) => {
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
    connection.query('SELECT * FROM department', (err, data) => {
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
                'View all employees by role',
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
            case 'View all employees by role':
                showEmployeesByRole();
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
        console.log(data.userAction);
    });
};

// connect to the mysql server and sql database
connection.connect(err => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});

