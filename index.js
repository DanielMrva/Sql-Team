//link to mysql2 module
const mySql2 = require("mysql2");

//link to inquirer module
const inquirer = require("inquirer");

//link to console.table module. Not actually used as console.table is avaible natively in NODE
// const cTable = require("console.table");

//link to index file which sets up mysql2 connection
const db = require("./db/index.js");

//link to queries functions
const {dispChoices, findID, joinTable} = require("./db/queries.js");

//link to db-modifying functions in utils folder
const {addEmployee, addRole, addDepartment, updateEmployee} = require("./utils/dbMod.js")

/**
 * Main menu function, contains object for main menu prompts, a pause prompt, and a main action variable set equal to the responses.  Contains switch for invoking various functions depending on main menu prompt
 * @returns {void} 
 */

async function mainPrompt () {

    //object for main menu prompts
    const mainMenu = {
        type: "list",
        name: "mainAction",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    };
    //object for pause prompt which aids in proper display
    const pause = {
        type: "input",
        name: "continue",
        message: "Press Enter To Continue"
    }

    let mainAction = await inquirer.prompt(mainMenu);

    switch (mainAction.mainAction) {
        
        case "View All Employees": 
            await joinTable("employees");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "View All Roles": 
            await joinTable("roles");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "View All Departments": 
            await joinTable("departments");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "Add Employee": 
            await addEmployee();
            await joinTable("employees");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "Add Role": 
            await addRole();
            await joinTable("roles");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break; 
        case "Add Department": 
            await addDepartment();
            await joinTable("departments");
            await inquirer.prompt(pause);
            console.log("\n ---------------");
            break;
        case "Update Employee Role": 
            await updateEmployee();
            await joinTable("employees");
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
    
    mainPrompt();
    return;
};

mainPrompt();