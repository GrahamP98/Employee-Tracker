const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql");

const dbConnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    database: "employeeTracker_db"
})

dbConnect.connect(function(err){
    if (err) throw err;

})

