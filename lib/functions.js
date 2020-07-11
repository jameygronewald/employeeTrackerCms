/* const inquirer = require("inquirer");
const mysql = require('mysql');
const app = require('../app.js')

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
    connection.query('SELECT employee.id AS ID, employee.first_name AS EMPLOYEE_FIRST, employee.last_name AS EMPLOYEE_LAST, role.title AS TITLE, role.salary AS SALARY, role.department_id AS DEPARTMENT_ID FROM employee LEFT JOIN role ON employee.role_id = role.id;', (err, data) => {
        if (err) throw err;
        console.table(data);
        app.init();
    });
};

const showEmployeesByManager = () => {
    connection.query('SELECT A.id, A.first_name AS Emp_First_Name, A.last_name as Emp_Last_Name, A.role_id, B.first_name AS Mgr_First_Name, B.last_name AS Mgr_Last_Name FROM employee A, employee B WHERE A.manager_id = B.id ORDER BY Mgr_Last_Name;', (err, data) => {
        if (err) throw err;
        console.table(data);
        app.init();
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
            app.init();
        });
    });
};

const updateEmployeeRole = () => {
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        let dataNames = data.map(employee => employee.first_name);
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: dataNames,
                name: 'employee'
            },
            {
                type: 'list',
                message: 'What role would you like to give that employee?',
                choices: roleId,
                name: 'role'
            }
        ]).then(answers => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role, answers.employee], err => {
                if (err) throw err;
                console.log('Successfully changed role for employee 3 to 7!');
                app.init();
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
            app.init();
        });
    });
};


const showRoles = () => {
    connection.query('SELECT role.id AS ID, role.title AS TITLE, role.salary AS SALARY, department.name AS DEPARTMENT_NAME FROM role LEFT JOIN department ON role.department_id = department.id', (err, data) => {
        if (err) throw err;
        console.table(data);
        app.init();
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
            app.init();
        });
    });
};

const showDepartments = () => {
    connection.query('SELECT * FROM department', (err, data) => {
        if (err) throw err;
        console.table(data);
        app.init();
    });
};

const getBudgetByDepartment = () => {
    connection.query('SELECT department.name AS DEPARTMENT, SUM(role.salary) AS DEPARTMENT_BUDGET FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.name', (err, data) => {
        if (err) throw err;
        console.table(data);
        app.init();
    })
};

module.exports = {
    showEmployees: showEmployees,
    showEmployeesByManager: showEmployeesByManager,
    addEmployee: addEmployee,
    // deleteEmployee: deleteEmployee,
    updateEmployeeRole: updateEmployeeRole,
    // updateEmployeeManager: updateEmployeeManager,
    addRole: addRole,
    showRoles: showRoles,
    addDepartment: addDepartment,
    showDepartments: showDepartments,
    getBudgetByDepartment: getBudgetByDepartment
}; */