USE human_resources

INSERT INTO department (id, dept_name)
VALUES
    (1, 'Administrative/Office'),
    (2, 'IT Services'),
    (3, 'Production Floor'),
    (4, 'Warehouse');

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

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Smith', 1, NULL),
    (2, 'Samantha', 'Johnson', 1, NULL),
    (15, 'Tameka', 'Jackson', 3, 1),
    (21, 'Kelly', 'Shuster', 7, NULL),
    (26, 'Maurice', 'Hamilton', 3, 1),
    (27, 'Sebastian', 'Gobtree', 4, 2),
    (28, 'Robert', 'Ballard', 8, 21),
    (30, 'Juliet', 'McPherson', 2, 2),
    (31, 'Abdul', 'Amaharazi', 6, 84),
    (34, 'Megan', 'Zanadtu', 3, 2),
    (35, 'Frank', 'Hemsworth', 8, 21),
    (41, 'Amanda', 'Moss', 6, 84),
    (46, 'David', 'Bartowski', 2, 1),
    (55, 'James', 'Kim', 3, 2),
    (71, 'Jerry', 'Ericson', 3, 2),
    (74, 'Bart', 'Flemming', 11, 21)
    (84, 'Duncan', 'Buchanon', 5, NULL),
    (94, 'Stephen', 'Tuttfort', 8, 21),
    (134, 'Luke', 'Holland', 9, 21),
    (141, 'Vanessa', 'Ross', 10 , 21),
    (184, 'Hanz', 'Leispitch', 10, 21);

