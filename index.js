const express = require('express');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql');
const db = require ('./server');

//Employee database connection
db.connect(function () {
    console.log(`Connected to the Employee database`);
    startMenu();
});

//startMenu function
const startMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please select an option:',
            choices: [  '1) View all employees',
                        '2) Add Employee',
                        '3) Update Employee role',
                        '4) View all roles',
                        '5) Add Role',
                        '6) View all Departments',
                        '7) Add Department',
                        '8) Exit'
            ]
        }
    ]).then(userChoice => {
        switch (userChoice.menu) {
            case '1) View all employees':
                viewAllEmployees();
                break;
            case '2) Add Employee':
                addEmployee();
                break;
            case '3) Update Employee role':
                updateEmployeeRole();
                break;
            case '4) View all roles':
                viewAllRoles();
                break;
            case '5) Add Role':
                addRole();
                break;
            case '6) View all Departments':
                viewAllDepartments();
                break;
            case '7) Add Department' :
                addDepartment();
                break;
            case '8) Exit':
                exit();
                break;
            default:
            console.log('Please select an option')
        }
    });
}

//View all employees function
const viewAllEmployees = () => {
    console.log('This is a list of all employees')
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) throw err;
        console.table(results);
        startMenu();
    });
};

//Add an employee function
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter First Name:',
            validate: firstNameInput => {
                if (firstNameInput){
                    return true;
                } else {
                    console.log('Enter First Name:')
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'lastName',
            message: 'Enter Last Name:',
            validate: lastNameInput => {
                if (lastNameInput){
                    return true;
                }else {
                    console.log('Enter Last Name:')
                    return false;
                }
            }
        },

    ]).then(({firstName, lastName}) => {
        const newEmployee = [firstName, lastName];
        db.query(`SELECT * FROM role`, (err, results) => {
            if(err) throw err;
            const activeRoles = [];
            results.forEach(({title, id}) => {
                activeRoles.push({
                    name: title,
                    value: id
                });
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select a role for your employee:',
                    choices: activeRoles,
                },
            ]).then(({role}) => {
                newEmployee.push(role);
                console.log(newEmployee);

                db.query(`SELECT * FROM employee`, (err, results) => {
                    if(err) throw err;
                    const managers = [
                        {
                            name: 'None',
                            value: null,
                        },
                    ];
                    results.forEach(({id, first_name, last_name}) => {
                        managers.push({
                            name:`${first_name} ${last_name}`,
                            value: id,
                        });
                    });
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Select a manager for your employee:',
                            choices: managers,
                        }
                    ]).then(({manager}) => {
                        newEmployee.push(manager);

                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                        newEmployee, (err, results) => {
                            if (err) throw err;
                            console.log(results);
                            console.log(`The employee has been added`);
                            viewAllEmployees();
                        }
                        );
                    })

                })
            })
        })
    })
}

//Update employee function
const updateEmployeeRole = () => {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) throw err;
        const listofEmployees = [];
        results.forEach(({id, first_name, last_name}) => {
            listofEmployees.push({
                name: `${first_name} ${last_name}`,
                value: id,
            });
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select an employee to update:',
                choices: listofEmployees,
            },
        ]).then(({employee}) => {
            let employeeId = employee;
            console.log(employeeId);

            db.query(`SELECT * FROM role`, (err, results) => {
                if (err) throw err;
                const active_roles = [];
                results.forEach(({title, id}) => {
                    active_roles.push({
                        name: title,
                        value: id,
                    });
                });
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'Select a role for the employee:',
                        choices: active_roles,
                    },
                ]).then(({newRole}) => {
                    console.log(newRole);
                    console.log(employeeId);

                    db.query(
                        `UPDATE employee SET role_id = ${newRole} WHERE id=${employeeId}`,
                        (err, results) => {
                            console.log(results);
                            viewAllEmployees();
                        }
                    );
                });
            });
        });
    });
};

//View all roles function
const viewAllRoles = () => {
    console.log('View all roles');
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) throw err;
        console.table(results);
        startMenu();
    });
}

//Add role function
const AddRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter a role title:',
            validate: roleInput => {
                if (roleInput){
                    return true;
                } else {
                    console.log('Enter a role title:')
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
            validate: roleSalary => {
                if (roleSalary){
                    return true;
                } else {
                    console.log('Enter the salary for this role:')
                    return false;
                }
            }
        },
    ]).then(({title, salary}) => {
        console.log(title, salary);
        const newroleInput = [title, salary];
        const active_department = [];
        db.query(`SELECT * FROM department`, (err, results) => {
            results.forEach(({departmentName, id}) => {
                active_department.push({
                    name: departmentName,
                    value: id,
                })
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select a department for this role:',
                    choices: active_department,
                },
            ]).then(({department}) => {
                newroleInput.push(department);
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`),
                newroleInput, (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    viewAllRoles();
                }
            });
        });
    });
};

//View all departments function
const viewAllDepartments = () => {
    console.log('View all departments');
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) throw err;
        console.table(results);
        startMenu();
    })
};

//Add department function
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the department:',
            validate: departmentInput => {
                if (departmentInput){
                    return true;
                } else {
                    console.log('Enter the name of the department:')
                    return false;
                }
            },
        },

    ]).then(({department}) => {
        db.query(`INSERT INTO department (departmentName) VALUES (?)`, department, function (err, results) {
            if (err) throw err;
            console.log(results);
            viewAllDepartments();
        }
        );
    });
};

const exit = () => {
    console.log('Goodbye')
}
