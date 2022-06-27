const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql2");

const dbConnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "employeeTracker_db"
})

dbConnect.connect(function (err) {
    if (err) throw err;
    console.log("connected as");
    connected();

})

connected = () => {
    console.log("putting something cool here.")
    list();
};

// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function list() {
    inquirer.prompt({
        name: "choices",
        type: "list",
        message: "Please select an option from the following selections ↓",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "delete an employee",
            "update an employee's role",
            "exit"
        ]
    }).then(function (answer) {
        switch (answer.choices) {
            case "view all departments":
                viewAllDepartments();
                break;

            case "view all roles":
                viewAllRoles();
                break;
            case "view all employees":
                viewAllEmployees();
                break;

            case "add a department":
                newDepartment();
                break;

            case "add a role":
                newRole
                break;

            case "add an employee":
                newEmployee();
                break;

            case "exit":
                exit();
                break;

            default:
                break;
        }
    })
}

function viewAllDepartments() {
    const query = "SELECT * FROM department";
    dbConnect.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Departments:", res);
        list();
    })
};

function viewAllRoles() {
    const query = "SELECT * FROM role";
    dbConnect.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Roles:", res);
        list();
    })
};

function viewAllEmployees() {
    const query = "SELECT * FROM employee";
    dbConnect.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + " | Employees")
        console.table("All Employees:", res);
        list();
    })
};

function newDepartment() {
    inquirer.prompt([
        {
            name: "new_department",
            type: "input",
            message: "What\'s the name of the new department?"
        }
    ]).then(function (answer) {
        dbConnect.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_department
            });
        const query = "SELECT * FROM department";
        dbConnect.query(query, function (err, res) {
            if (err) throw err;
            console.log("Department added!");
            console.table("All Departments:", res);
            list();
        })
    })
};

function newRole() {
    dbConnect.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
    })
    inquirer.prompt([
        {
            name: "new_role",
            type: "input",
            message: "What\'s the name of the new role?"
        },
        {
            name: "salary",
            type: "input",
            message: "Annual salary of new role?"
        },
        {
            name: "department",
            type: "list",
            choices: function () {
                const departmentArr = [];
                for (let i = 0; i < res.length; i++) {
                    departmentArr.push(res[i].name);
                }
                return departmentArr;
            },
        }
    ]).then(function (answer) {
        let departmentId;
        for (let a = 0; a < res.length; a++) {
            if (res[a].name == answer.department) {
                departmentId = res[a].id;
            }
        }
        dbConnect.query(
            "INSERT INTO role SET ?",
            {
                title: answer.new_role,
                salary: answer.salary,
                department_id: departmentId
            },
            function (err, res) {
                if (err) throw err;
                console.log("Role added!");
                console.table("All Roles:", res);
                list();
            }
        );
    })
};

function newEmployee() {
    dbConnect.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
    })
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What\'s the first name of the new employee?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What\'s the last name of the new employee?"
        },
        {
            name: "role",
            type: "list",
            choices: function () {
                const rolesArr = [];
                for (let i = 0; i < res.length; i++) {
                    rolesArr.push(res[i].title);
                }
                return rolesArr;
            },
            message: "What\'s the new employee's role? "
        }
    ]).then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
            if (res[a].title == answer.role) {
                role_id = res[a].id;
                console.log(role_id)
            }
        }
        dbConnect.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: role_id,
            },
            function (err) {
                if (err) throw err;
                console.log("Employee added!");
                list();
            }
        );
    })
};

function exit() {
    dbConnect.end();
}
