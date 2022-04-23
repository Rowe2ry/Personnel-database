DROP DATABASE IF EXISTS human_resources;
CREATE DATABASE human_resources;

USE human_resources;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    manager_id INT
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);