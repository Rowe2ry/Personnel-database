const inquirer = require('inquirer');
const prompts = require('./menus');
const db = require('./mysql');
const tables = require('console.table');

// TODO: function to go to the main menu
// switch case statement for main menu response
const goToMainMenu = () => {
    inquirer.prompt([...prompts.mainMenu])
    .then((res) => {
        //console.log(res)

        // switch statement launches conditional logic execution for the menu interaction
        switch (res.home) {
            case 'view all departments': // log the table object array returned from mysql
                console.table(db.viewAllDepts()
                .then(result => {
                    console.table(result[0]);
                    goToMainMenu();
                  }).catch(err => {
                    console.log(err);
                  }));
                break;
            case 'view all roles': // log the table object array returned from mysql
                console.table(db.viewAllRoles()
                .then(result => {
                    console.table(result[0]);
                    goToMainMenu();
                }).catch(err => {
                    console.log(err);
                }));
                break;
            case 'view all employees': // log the formated table object array returned from mysql
                console.table(db.viewAllEmployees()
                .then(result => {
                    console.table(result[0]);
                    goToMainMenu();
                }).catch(err => {
                    console.log(err);
                }));
                break;
            case 'add a department': // log the formatted table object array returned from mysql
                addDeptMenu();
                break;
            case 'add a role':
                addRoleMenu();
                break;
            case 'add an employee':
                addEmpMenu(); // TODO: write function below for the menu that gets the 4 parameters and inserts them into the 'db.addEmployee(res.empFirst, res.empLast, res.empJob, managerId)'
                break;
            case 'update an employee role':
                updateEmpMenu(); // TODO: right function below to change the employee role (db.changeRole(empId, roleId))
                break;
            case 'exit application':
                console.log('I hope you enjoyed using this application. Have a great day.');
                process.exit();
            default: // not sure if possible since user will have multiple choice, but we should know if this event is triggered
                throw new Error('User submitted invalid command');
        };
    });
};

// Function for handling the add new department menu
const addDeptMenu = () => {
    inquirer.prompt([...prompts.addDept])
        .then((res) => {
            db.viewAllDepts().then(result => {
                const currentDepts = result[0].map(department => department.dept_name);
                console.log(`currentsDepts variables equals: \n ${currentDepts}`);
                 if (!currentDepts.includes(res.deptName)) {
                    db.addDepartment(res.deptName);
                } else {
                    console.log('That departments already exists. It has NOT been added again.');
                }
                goToMainMenu();
            });
        });
};

// Function for handling the add new role menu
const addRoleMenu = () => {
   // function for the menu that gets 3 values and passes in the 'db.addRole(res.roleName, res.roleSalary, res.roleToDepot)'
   const deptList = db.viewAllDepts().map(department => department.dept_name);
    inquirer.prompt([...prompts.addRole])
    .then((res) => {
        const currentRoles = db.viewAllRoles().map(roles => roles.job_title);
        if (!currentRoles.includes(res.roleName)) {
            db.addRole(res.roleName, res.roleSalary, db.deptNameToId(res.roleToDept));
        } else {
            console.log('That departments already exists. It has NOT been added again.');
        }
        goToMainMenu();
    });
};

// TODO: Function for handling the add new employee menu
const addNewEmpMenu = () => {
    goToMainMenu();
}

// TODO: Function for Updating a role

const updateEmpMenu = () => {
    managerList = returnManagerList();
    goToMainMenu();
};

module.exports = {
    goToMainMenu,
    addDeptMenu,
    addRoleMenu,
    addNewEmpMenu,
    updateEmpMenu  
};