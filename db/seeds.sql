USE human_resources

INSERT INTO department (id, dept_name)
VALUES
    (1, 'Administrative/Office'),
    (2, 'IT Services'),
    (3, 'Production Floor'),
    (4, 'Warehouse');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager', 90000, 1),
    ('Secretary', 34000, 1),
    ('Analyst', 72000, 1),
    ('Copywriter', 50000, 1),
    ('IT Manager', 80000, 2),
    ('Tech Specialist', 65000)