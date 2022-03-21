const mySql2 = require("mysql2");
const inquirer = require("inquirer");
// const cTable = require("console.table");
const db = require("./db/index.js");
const {selectAll, dispChoices, findID, joinTable} = require("./db/queries.js");
const {addEmployee, addRole, addDepartment, updateEmployee} = require("./utils/dbMod.js")


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


const mainMenu = {
    type: "list",
    name: "mainAction",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
};

const pause = {
    type: "input",
    name: "continue",
    message: "Press Enter To Continue"
}


async function mainPrompt () {
    
    let mainAction = await inquirer.prompt(mainMenu);

    switch (mainAction.mainAction) {
        
        case "View All Employees": 
            // await selectAll("employees");
            await joinTable();
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "View All Roles": 
            await selectAll("roles");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "View All Departments": 
            await selectAll("departments");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "Add Employee": 
            await addEmployee();
            await selectAll("employees");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "Add Role": 
            await addRole();
            await selectAll("roles");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break; 
        case "Add Department": 
            await addDepartment();
            await selectAll("departments");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "Update Employee Role": 
            await updateEmployee();
            await selectAll("employees");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break; 
        case "Quit":
            console.log("Goodbye");
            process.exit();
            break;
        default:
            console.log("Not enabled Yet");
            break;
    };
    
    await mainPrompt();
    return;
};


mainPrompt();
// testPrompt();
// dispChoices("full_name", "employees");
// initPrompt();
// findID("employees", "first_name", "Milo")
// addEmployee();
// await selectAll(departments);