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

dbConnect.connect(err => {
    if (err) throw err;
    console.log("connected as id " + dbConnect.threadId);
    connected();
});

connected = () => {
    console.log('       \\\\\\    /// ))    W  W       .-.   wWw  wWw            ');
    console.log("   wWw ((O)  (O))(o0)-.(O)(O)    c(O_O)c (O)  (O)wWw   wWw   ")
    console.log("   (O)_ | \\  / |  | (_)) ||     ,'.---.`,( \\  / )(O)_  (O)_  ")
    console.log("  .' __)||\\\\//||  | .-'  | \\   / /|_|_|\\ \\\\ \\/ /.' __).' __) ") 
    console.log(" (  _)  || \\/ ||  |(     |  `. | \\_____/ | \\o /(  _) (  _)   ")
    console.log("  `.__) ||    ||   \\)   (.-.__)'. `---' .`_/ /  `.__) `.__)  ")
    console.log("       (_/    \\_)  (     `-'     `-...-' (_.'                ")
    console.log("        (o)__(o) ))             c  c       _      ))         ")
    console.log("        (__  __)(Oo)-.   /)     (OO)(OO) .' )wWw (Oo)-.      ")
    console.log("          (  )   | (_))(o)(O) ,'.--.)||_/ .' (O)_ | (_))     ")
    console.log("           )(    |  .'  //\\\\ / //_|_\\|   /  .' __)|  .'      ")
    console.log("          (  )   )|\\\\  |(__)|| \\___  ||\\ \\ (  _)  )|\\\\       ")
    console.log("           )/   (/  \\) /,-. |'.    )(/\\)\\ `.`.__)(/  \\)      ")
    console.log("          (      )    -'   ''  `-.'      `._)     )          ")
    list();
};

// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const list = () => {
    inquirer.prompt([
        {
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
                "exit"
            ]
        }
    ]).then((answers) => {
        const { choices } = answers;

        if (choices === "view all departments") {
            viewAllDepartments();
        }
        if (choices === "view all roles") {
            viewAllRoles();
        }
        if (choices === "view all employees") {
            viewAllEmployees();
        }
        if (choices === "add a department") {
            newDepartment();
        }
        if (choices === "add a role") {
            newRole
        }
        if (choices === "add an employee") {
            newEmployee();
        }
        if (choices === "exit") {
            exit();
        };
    });
};


function viewAllDepartments() {
    const query = `SELECT department.id AS id, department.name AS department FROM department`;
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
