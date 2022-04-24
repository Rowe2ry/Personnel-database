const db = require('mysql2');

// function that gets the current list of departments by name and returns and array
const deptList = () => {
    this.mysql.promise().query('SELECT department.dept_name FROM department;', function(err, results) {
        const departments = []; // new empty array
        results.forEach(result => departments.push(result.dept_name)); // go thru array of objects and just pull out the department name values
        return departments; // return new array of department names
    });
};

// TODO: Get department id number by name

// function that gets the current list of roles by name and puts them in an array
const roleList = () => {
    this.mysql.promise().query('SELECT role.title FROM role;', function(err, results) {
        const roles = []; // new empty array
        results.forEach(result => departments.push(result.title)); // go thru array of objects and just pull out the role title values
        return roles; // return new array of department names
    });
};

// TODO: Get role id number by name

// function that gets the current list of employees by name and puts them in an array
const empList = () => {
    this.mysql.promise().query('SELECT employee.first_name, employee.last_name FROM employee;', function(err, results) {
        const employees = []; // new empty array
        results.forEach(result => departments.push(result.first_name.concat(` ${result.last_name}`))); // go thru array of objects and just pull out the department name values
        return employees; // return new array of department names
    });
};

// TODO: Get employee id number by first and last name
const empNameToId = (str) => {
    const fullName = str.split(' ');
    const first = fullName[0];
    const last = fullName[1];
    const employeeIdNum = this.mysql.promise().query(`SELECT id FROM employee WHERE first_name = '${first}' AND last_name = '${last}';`);
    return employeeIdNum[0][0];
};

// TODO: function to go to the main menu
// switch case statement for main menu response

// TODO: Function for handling the add new department menu

// TODO: Function for handling the add new role menu

// TODO: Function for handling the add new employee menu

