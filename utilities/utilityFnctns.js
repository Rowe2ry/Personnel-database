const inquirer = require('inquirer');
const prompts = require('./menus');
const db = require('./mysql');
const tables = require('console.table');
const { empNameToId } = require('./mysql');

// function to go to the main menu
// switch case statement for main menu response
const goToMainMenu = () => {
    inquirer.prompt([...prompts.mainMenu])
    .then((res) => {
        // switch statement launches conditional logic execution for the menu interaction
        switch (res.home) { // whatever option the user picks from the main menu
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
            case 'view all employees': // log the formatted table object array returned from mysql
                console.table(db.viewAllEmployees()
                .then(result => {
                    console.table(result[0]);
                    goToMainMenu();
                }).catch(err => {
                    console.log(err);
                }));
                break;
            case 'add a department': // go to sub-menu (actually series of question prompts) to add a new department
                addDeptMenu();
                break;
            case 'add a role':// go to sub-menu (actually series of question prompts) to add a new role
                addRoleMenu();
                break;
            case 'add an employee': // go to sub-menu (actually series of question prompts) to add a new employee
                addEmpMenu();
                break;
            case 'update an employee role':
                updateEmpMenu(); // TODO: write function below to change the employee role (db.changeRole(empId, roleId))
                break;
            case 'exit application': // close app
                console.log('I hope you enjoyed using this application. Have a great day.'); // being polite and fun
                process.exit();
            default: // not sure if possible since user will have multiple choice, but we should know if this event is triggered
                throw new Error('User submitted invalid command');
        };
    });
};

// Function for handling the add new department menu
const addDeptMenu = () => {
    inquirer.prompt([...prompts.addDept]) // ask the questions in this case what is the name fo rthe new department
        .then((res) => {
            db.viewAllDepts().then(result => {
                const currentDepts = result[0].map(department => department.dept_name); // go through the array of departments and turn it into an array of JUST department names
                // console.log(`currentsDepts variables equals: \n ${currentDepts}`);
                 if (!currentDepts.includes(res.deptName)) { //if this array of names already has the new department's proposed name, that would be a duplicate. We're checking for the negative ehre
                    db.addDepartment(res.deptName);
                } else {
                    console.log('That departments already exists. It has NOT been added again.');
                }
                goToMainMenu(); // return to the main menu now the add department task is complete
            });
        });
};

// Function for handling the add new role menu
const addRoleMenu = () => {
   db.viewAllDepts() // get an array of department objects from the database
   .then(result => {
       const deptList = result[0].map(department => department.dept_name);
       // turn our array of department objects into an array of JUST department names
        inquirer.prompt([...prompts.addRole, { // ask the questions
            type: 'list',
            name: 'roleToDept',
            message: 'Which department does this role operate under?',
            choices: deptList // this question's choices are populated by our current department names
        }])
        .then((answers) => {
            db.viewAllRoles() // retrieve all of the current role objects from the database and put them in an array
            .then(result2 => {
                const currentRoles = result2[0].map(role => role.job_title);
                // go thru the array of role objects and turn them into an array of JUST role names
                db.deptNameToId(answers.roleToDept) // get the answer from the last questin in the 'add role" menu and use the department name string to get back THAT department's id #
                .then(result3 => {
                    const departmentId = result3[0][0].id; // this is the id number for the department where we are adding a new role to
                    if (!currentRoles.includes(answers.roleName)) {
                        // check to make sure this role does not already exist to avoid duplicates
                        db.addRole(answers.roleName, answers.roleSalary, departmentId); // use the string value and the nubmer values from the user for parameter's 1 and 2, then use the department id from the user's department choice for parameter 3
                    } else {
                        console.log('That role already exists. It has NOT been added again.');
                    }
                    goToMainMenu(); // return to the main menu
                });
            });
        });    
    });
};

// TODO: Function for handling the add new employee menu
const addEmpMenu = () => {
    db.viewAllRoles()
   .then(result => {
        const roleList = result[0].map(role => role.job_title);
        // console.log(roleList);
        db.returnManagerList()
        .then(result2 => {
            const managerList = result2[0].map(manager => manager.name)
            // console.log(managerList);
            inquirer.prompt([...prompts.addEmp, {
                type: 'list',
                name: 'empJob',
                message: 'What is the employee\'s job?',
                choices: roleList
            },
            {
                type: 'list',
                name: 'empManage',
                message: 'Who does this employee report to?',
                choices: [...managerList, 'nobody: this employee is their own department\'s manager'] 
            }])
            .then((answers) => {
                db.roleNameToId(answers.empJob)
                .then (result3 => {
                    // console.log(result3);
                    const roleId = result3[0][0].id;
                    const reportTo = answers.empManage;
                    if (reportTo === 'nobody: this employee is their own department\'s manager'){
                        db.addEmployee(answers.empFirst, answers.empLast, roleId, 'NULL');
                        goToMainMenu();
                    } else {
                        db.empNameToId(reportTo)
                        .then(result4 =>{
                            const manId = result4[0][0].id;
                            db.addEmployee(answers.empFirst, answers.empLast, roleId, manId);
                        goToMainMenu();
                        });
                    };
                });    
            });    
        });    
    });
};

// TODO: Function for Updating a role

const updateEmpMenu = () => {
    managerList = returnManagerList();
    goToMainMenu();
};

module.exports = {
    goToMainMenu,
    addDeptMenu,
    addRoleMenu,
    addEmpMenu,
    updateEmpMenu
};