const mySql2 = require("mysql2");
const inquirer = require("inquirer");
// const cTable = require("console.table");
const db = require("./db/index.js");
const {selectAll, displayChoices, joinTable} = require("./db/queries.js");

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

const title = "title";
const roles = "roles";

const mainMenu = {
    type: "list",
    name: "mainAction",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
};


async function mainPrompt () {

    let mainAction = await inquirer.prompt(mainMenu);

    switch (mainAction.mainAction) {
        
        case "View All Employees": 
            let employees = "employees";
            await selectAll(employees)
            console.log("\n ---------------");
            // await initPrompt ();
            break;
        case "View All Roles": 
            let roles = "roles";
            await selectAll(roles)
            console.log("\n ---------------");
            // await initPrompt ();
            break;
        case "View All Departments": 
            let departments = "departments";
            await selectAll(departments)
            console.log("\n ---------------");
            // await initPrompt ();
            break;
        case "Quit":
            console.log("Goodbye");
            process.exit();
            break;
        default:
            console.log("Not enabled Yet");
            // await initPrompt ();
            break;
    }
    await mainPrompt();
    return;
};

async function initPrompt() {
    await mainPrompt();
}

async function testPrompt() {

    const employeePrompts = [
        {
            type: "text",
            name: "empName",
            message: "What is the employee's Name",
        },
        {
            type: "list",
            name: "empRole",
            message: "What role will this employee have?",
            choices: await displayChoices("title", "roles"),
        }
    ]
    
    await inquirer.prompt(employeePrompts);
}

// testPrompt();

// initPrompt();

// displayChoices(title, roles);

// const departments = "departments";

// await selectAll(departments);