let deptList;
let empList;
let roleList;
let managerList =[];


const mainMenu = [
    {
        type: 'list',
        name: 'home',
        message:'Welcome to the personnel management tool. What would you like to accomplish today?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee' , 'update an employee role', 'exit application']
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
    }
];

module.exports = {
    mainMenu,
    addDept,
    addRole,
    addEmp
};