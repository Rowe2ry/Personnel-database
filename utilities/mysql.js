/* =========================================================================
 * Imports
 * ========================================================================= */

const db = require('./startmysql');

/* =========================================================================
 * Function Definitions
 * ========================================================================= */

class SQL {
    constructor(db) {
        this.mysql = db;
    };


    // View all Departments
    viewAllDepts() {
        return this.mysql.promise().query('SELECT * FROM department;');
    };
    // table shows -> department names and department ids

    // view all roles
    viewAllRoles() {
        return this.mysql.promise().query('SELECT role.title AS job_title, role.id AS role_id, department.dept_name AS department, role.salary AS salary FROM role JOIN department ON role.department_id = department.id;');
    };
    // table shows -> job title, role id, department for role, & salary

    // view all employees
    viewAllEmployees() {
        return this.mysql.promise().query('SELECT employee.id AS id, employee.first_name AS first, employee.last_name AS last, role.title AS job_title, role.salary AS compensation, department.dept_name AS department, CONCAT(manager.first_name, \' \', manager.last_name) AS reporting_manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id;');
    };
    // formatted table shows -> employee ids, first & last, job titles, salaries, and reporting managers

    // add a department
    addDepartment(departmentName) {
        return this.mysql.promise().query(`INSERT INTO department (name) VALUES ('${departmentName}');`);
    };

    // add a role
    addRole(job_title, salary, department) {
        return this.mysql.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${job_title}', ${salary}, ${department});`);
    };

    // add employee
    addEmployee(first, last, role, manager) {
        return this.mysql.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first}', '${last}', ${role}, ${manager});`);
    };

    // CHANGE role_id to whatever
    changeRole(empId, role_id) {
        return this.mysql.promise().query(`UPDATE employee SET role_id = "${role_id}" WHERE id = ${empId};`);
    };

    // function that gets the current list of departments by name and returns and array
    deptList() {
        this.mysql.promise().query('SELECT department.dept_name FROM department;', function(err, results) {
            const departments = []; // new empty array
            results.forEach(result => departments.push(result.dept_name)); // go thru array of objects and just pull out the department name values
            return departments; // return new array of department names
        });
    };

    // Get department id number by name
    deptNameToId(str) {
        const deptIdNum = this.mysql.promise().query(`SELECT id FROM department WHERE dept_name = '${str}';`);
        return deptIdNum[0][0];
    };

    // function that gets the current list of roles by name and puts them in an array
    roleList() {
        this.mysql.promise().query('SELECT role.title FROM role;', function(err, results) {
            const roles = []; // new empty array
            results.forEach(result => departments.push(result.title)); // go thru array of objects and just pull out the role title values
            return roles; // return new array of department names
        });
    };

    // Get role id number by name
    roleNameToId(str) {
        const roleIdNum = this.mysql.promise().query(`SELECT id FROM role WHERE title = '${str}';`);
        return roleIdNum[0][0];
    };

    // function that gets the current list of employees by name and puts them in an array
    empList() {
        this.mysql.promise().query('SELECT employee.first_name, employee.last_name FROM employee;', function(err, results) {
            const employees = []; // new empty array
            results.forEach(result => departments.push(result.first_name.concat(` ${result.last_name}`))); // go thru array of objects and just pull out the department name values
            return employees; // return new array of department names
        });
    };

    // Get employee id number by first and last name
    empNameToId(str) {
        const fullName = str.split(' ');
        const first = fullName[0];
        const last = fullName[1];
        const employeeIdNum = this.mysql.promise().query(`SELECT id FROM employee WHERE first_name = '${first}' AND last_name = '${last}';`);
        return employeeIdNum[0][0];
    };

    returnManagerList() {
        return this.mysql.promise().query('SELECT CONCAT(employee.first_name, \' \', employee.last_name) AS name FROM employee WHERE id = manager_id;');
    };
};

module.exports = new SQL(db);