INSERT INTO department (id, departmentName);
VALUES ('Engineering', 'Finance', 'Legal', 'Sales');

INSERT INTO role (title, salary, department_id);
VALUES ("Senior Engineer", 120000, 1),
       ("Junior Engineer", 70000, 1),
       ("QA Engineer", 65000, 1),
       ("Accounts Receivable", 80000, 2),
       ("Accounts Payable", 85000, 2),
       ("Financial Analyst", 95000, 2),
       ("Legal Secretary", 100000, 3),
       ("Contract Admin", 90000, 3),
       ("Staff Attorney", 80000, 3),
       ("Senior Account Executive" 100000, 4),
       ("Associate Account Executive" 125000, 4),
       ("Sales Support" 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id);
VALUES ('Santha', 'Nadakumar', 1, NULL),
       ('Erick', 'Dirige', 1, 1),
       ('Adam', 'Roy', 1, NULL),
       ('Jennifer', 'Lopez', 2, 3),
       ('Beyonce', 'Knowles', 2, 3),
       ('Jack', 'Black', 2, NULL),
       ('Shane', 'Miller', 3, 6),
       ('Amanda', 'Meyer', 3, 6),
       ('Larry', 'Strong', 3, NULL),
       ('Karen', 'Barnes', 4, 7),
       ('Christina', 'Spears', 4, 5),
       ('Jeremy', 'Versace', 4, NULL);