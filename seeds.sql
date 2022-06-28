INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Legal'),
       ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 60000, 1),
       ('Lead Salesperson', 90000, 1),
       ('Software Engineer', 100000, 2),
       ('Lead Engineer', 150000, 2),
       ('Legal Team Lead', 200000, 3),
       ('Lawyer', 120000, 3),
       ('Account Manager', 150000, 4),
       ('Accountant', 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Ross', 1, 1),
       ('Amy', 'West', 2, null),
       ('Rick', 'Adams', 3, 2),
       ('Georgia', 'Smith', 4, null),
       ('Chuck', 'Robinson', 5, null),
       ('Mary', 'Bean', 6, 3),
       ('Annie', 'Illing', 7, null),
       ('Becky', 'Jordan', 8, 4);
       