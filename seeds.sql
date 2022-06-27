INSERT INTO department (name, department_id)
VALUES ('Sales', 1),
       ('Engineering', 2),
       ('Legal', 3),
       ('Finance', 4);

INSERT INTO role (title, salary, department_id, role_id)
VALUES ('Salesperson', 60000, 1, 1),
       ('Lead Salesperson', 90000, 1, 2),
       ('Software Engineer', 100000, 2, 3),
       ('Lead Engineer', 150000, 2, 4),
       ('Legal Team Lead', 200000, 3, 5),
       ('Lawyer', 120000, 3, 6),
       ('Account Manager', 150000, 4, 7),
       ('Accountant', 95000, 4, 8);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Michael', 'Ross', 1),
       ('Amy', 'West', 2),
       ('Rick', 'Adams', 3),
       ('Georgia', 'Smith', 4),
       ('Chuck', 'Robinson', 5),
       ('Mary', 'Bean', 6),
       ('Annie', 'Illing', 7),
       ('Becky', 'Jordan', 8);
       