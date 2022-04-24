USE human_resources

INSERT INTO department (dept_name)
VALUES
    ('Administrative/Office'),
    ('IT Services'),
    ('Production Floor'),
    ('Warehouse');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Office Manager', 90000, 1),
    ('Secretary', 34000, 1),
    ('Analyst', 72000, 1),
    ('Copywriter', 50000, 1),
    ('IT Manager', 80000, 2),
    ('Tech Specialist', 65000, 2),
    ('Foreman', 57500, 3),
    ('Equipment Operator', 45000, 3),
    ('Quality Control', 42000, 3),
    ('Forklift Operator', 48000, 4),
    ('Shipping/Receiving', 38000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 1, 1),
    ('Samantha', 'Johnson', 1, 2),
    ('Duncan', 'Buchanon', 5, 3),
    ('Kelly', 'Shuster', 7, 4),
    ('Tameka', 'Jackson', 3, 1),
    ('Maurice', 'Hamilton', 3, 1),
    ('Sebastian', 'Gobtree', 4, 2),
    ('Robert', 'Ballard', 8, 4),
    ('Juliet', 'McPherson', 2, 2),
    ('Abdul', 'Amaharazi', 6, 3),
    ('Megan', 'Zanadtu', 3, 2),
    ('Frank', 'Hemsworth', 8, 4),
    ('Amanda', 'Moss', 6, 3),
    ('David', 'Bartowski', 2, 1),
    ('James', 'Kim', 3, 2),
    ('Jerry', 'Ericson', 3, 2),
    ('Bart', 'Flemming', 11, 4),
    ('Stephen', 'Tuttfort', 8, 4),
    ('Luke', 'Holland', 9, 4),
    ('Vanessa', 'Ross', 10 , 4),
    ('Hanz', 'Leispitch', 10, 4);

