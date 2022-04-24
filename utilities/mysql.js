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
        return this.mysql.promise().query(`INSER INTO role (title, salary, department_id) VALUES ('${job_title}', ${salary}, ${department});`);
    };

    // add employee
    addEmployee(first, last, role, manager) {
        return this.mysql.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first}', '${last}', ${role}, ${manager});`);
    };

    // CHANGE role_id to whatever
    changeRole(empId, role_id) {
        return this.mysql.promise().query(`UPDATE employee SET role_id = "${role_id}" WHERE id = ${empId};`);
    }
}