const inquirer = require('inquirer');
const prompts = require('./menus');
const db = require('./mysql');
const tables = require('console.table');

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
                updateEmpMenu(); // go to sub-menu (actually series of question prompts) to change the employee role
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
    db.viewAllRoles() // retrieve the array of role objects from the database
   .then(result => { // reduce tis array to JUST the role names
        const roleList = result[0].map(role => role.job_title);
        // console.log(roleList);
        db.returnManagerList() // retrieve the array of employee objects from the database whose employee id and manager id numbers are the same (if they report to themselves, they are a manager)
        .then(result2 => { // simplify the array to JUST manager name strings (first and last are concatenated around a ' '(space))
            const managerList = result2[0].map(manager => manager.name)
            // console.log(managerList);
            inquirer.prompt([...prompts.addEmp, {
                type: 'list',
                name: 'empJob',
                message: 'What is the employee\'s job?',
                choices: roleList // use the array of role names we got above
            },
            {
                type: 'list',
                name: 'empManage',
                message: 'Who does this employee report to?',
                choices: [...managerList, 'nobody: this employee is their own department\'s manager'] // use the array of manager name strings we got above
            }])
            .then((answers) => {
                db.roleNameToId(answers.empJob) // use the name the user picked from our array of role names to get that role's id number
                .then (result3 => {
                    // console.log(result3);
                    const roleId = result3[0][0].id; // grab the role id number
                    const reportTo = answers.empManage; // use the manager name our user picked from our array of existing manager names, or the oddball option if we are adding a new manager
                    if (reportTo === 'nobody: this employee is their own department\'s manager'){
                        const stringName = answers.empFirst.concat(' ', answers.empLast); // turn the first and last name of the new employee we are adding into one contcatenated string for converting to the employee id number
                        db.addEmployee(answers.empFirst, answers.empLast, roleId, 'NULL') // add our new manager with  a null reporting to value
                        .then(result5 => {
                            db.giveManagerTheirOwnId(stringName); // their reporting manager is now listed as themselves so they show up in the master employee list
                            goToMainMenu();
                        });
                    } else {
                        db.empNameToId(reportTo) // just get their manager's id number
                        .then(result4 =>{
                            const manId = result4[0][0].id; // assign to a more amnageable variable name
                            db.addEmployee(answers.empFirst, answers.empLast, roleId, manId); // add the employee with all 4 valid parameters
                        goToMainMenu();
                        });
                    };
                });    
            });    
        });    
    });
};

// Function for Updating a role
const updateEmpMenu = () => {
    db.viewAllEmployees()
    .then(result => {
        const empList = result[0].map(name => name.first.concat(' ', name.last));
        db.viewAllRoles() // retrieve the array of role objects from the database
        .then(result2 => { // reduce tis array to JUST the role names
            const roleList = result2[0].map(role => role.job_title);
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'empChoose',
                    message: 'Which employee are you Modifying?',
                    choices: empList,
                },
                {
                    type: 'list',
                    name: 'roleChoose',
                    message: 'What is the new role you would like to assign to this employee?',
                    choices: roleList
                }
            ])
            .then(answers => {
                db.empNameToId(answers.empChoose) // use the name the user picked from our array of employee names to get that role's id number
                .then(result3 => {
                    const empId = result3[0][0].id; // the actual id number of the employee we are working with
                    db.roleNameToId(answers.roleChoose) // use the name the user picked from our array of role names to get that role's id number
                    .then (result4 => {
                        const roleId = result4[0][0].id; // grab the role id number
                        db.changeRole(empId, roleId); // use the employee id to target the employee and update the role id number
                        goToMainMenu();
                    });
                });
            });
        });
    });
};

module.exports = {
    goToMainMenu,
    addDeptMenu,
    addRoleMenu,
    addEmpMenu,
    updateEmpMenu
};