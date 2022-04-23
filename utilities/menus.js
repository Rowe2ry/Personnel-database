const mainMenu = [
    {
        type: 'list',
        name: 'home',
        message:'Welcome to the personnel management tool. What would you like to accomplish today?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee' , 'update an employee role']
    }
];

const addDept = [
    {
        type: 'input',
        name: 'deptName',
        message: 'What name do you want to give the new Department?'
    }
];

const addRole = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What name do you want to give the new Role?'
    },
    {
        type: 'list',
        name: 'roleToDept',
        message: 'Which department does this role operate under?',
        choices: deptList
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'How much does this role pay?'
    }
]

const addEmp = [
    {
        type: 'input',
        name: 'empFirst',
        message: 'What is the employee\'s first name?'
    },
    {
        type: 'input',
        name: 'empLast',
        message: 'What is the employee\'s last name?'
    },
    {
        type: 'list',
        name: 'empName',
        message: 'What is the employee\'s job?',
        choices: roleList
    },
    {
        type: 'list',
        name: 'empManage',
        message: 'Who does this employee report to?',
        choices: [...empList, 'nobody: this employee is their department\'s manager'] 
    }
];

const updateEmp = [
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
];

module.exports = {
    mainMenu,
    addDept,
    addRole,
    addEmp,
    updateEmp
};