//dependencies from 3rd party packages
const mySql2 = require("mysql2");
const inquirer = require("inquirer");
// const cTable = require("console.table");

//connection file for mysql2
const db = require("../db/index.js");

//cusom db query functions
const {dispChoices, findID, joinTable} = require("../db/queries.js");


//The add employee prompt function
async function addEmployee() {
    //object contaianing prompt questions
    const employeePrompts = [
        {
            type: "text",
            name: "empFirst",
            message: "What is the employee's first name?",
        },
        {
            type: "text",
            name: "empLast",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "empRole",
            message: "What role will this employee have?",
            //invoked query function to list role choices
            choices: await dispChoices("title", "roles"),
        },
        {
            type: "list",
            name: "empMgr",
            message: "Who will be this employee's Manager?",
            //invoked query fuction to list manager choices
            choices: await dispChoices("full_name", "employees"),
            default: "none"
        }
    ]
    //answers set to avariable
    let empAns = await inquirer.prompt(employeePrompts);
    //role id set to variable, value returned from query fuction
    let roleID = await findID("roles", "title", empAns.empRole);

    //mgr id set to variable, value returned from query fuction
    let mgrID = await findID("employees", "full_name", empAns.
    empMgr);

    //db query used to update db.  
    db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${empAns.empFirst}', '${empAns.empLast}', '${roleID}', '${mgrID}')`), (err, results) => {
        if (err) return err };
}

//add role prompt funciton
async function addRole() {
    //object containing prompt questions
    const rolePrompts = [
        {
            type: "text",
            name: "roleName",
            message: "What would you like to call this role?",
        },
        {
            type: "number",
            name: "roleSalary",
            message: "What should this role's salary be?",
        },
        {
            type: "list",
            name: "roleDpt",
            message: "To which department does this role belong?",
            //invoked function to list department choices
            choices: await dispChoices("department_name", "departments"),
        }
    ]
    //answers set to variable
    let roleAns = await inquirer.prompt(rolePrompts);

    //dpt id set to variable, value returned from query function
    let dptID = await findID("departments", "department_name", roleAns.roleDpt);

    //db query used to update db
    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ('${roleAns.roleName}', '${roleAns.roleSalary}', '${dptID}')`), (err, results) => {
        if (err) return err };
}

//add department prompt function
async function addDepartment() {
    //object containing prompt questions
    const dptPrompts = [
        {
            type: "text",
            name: "dptName",
            message: "What would you like to call this department?",
        }
    ]
    //answers set to variable
    let dptAns = await inquirer.prompt(dptPrompts);

    //db query used to update db
    db.query(`INSERT INTO departments(department_name) VALUES ('${dptAns.dptName}')`), (err, results) => {
        if (err) return err };
}

//update employee prompt function
async function updateEmployeeRole() {
    //object containing prompt questions
    const empUpdatePrompts = [
        {
            type: "list",
            name: "empUpName",
            message: "Which employee would you like to update?",
            //invoked function to list target employee choices
            choices: await dispChoices("full_name", "employees"),
        },
        {
            type: "list",
            name: "empUpRole",
            message: "What is this employee's new role?",
            //invoked function to list role choices
            choices: await dispChoices("title", "roles"),
        },
        
    ]
    
    //answers set to variable
    let empUpAns = await inquirer.prompt(empUpdatePrompts);

    //role id set to variable, value returned from query function
    let roleID = await findID("roles", "title", empUpAns.empUpRole);

    
    //db query used to update db
    db.query(`UPDATE employees SET role_id = '${roleID}'WHERE full_name = '${empUpAns.empUpName}'`), (err, results) => {
        if (err) return err };
}


async function updateEmployeeMgr() {
    //object containing prompt questions
    const empUpdatePrompts = [
        {
            type: "list",
            name: "empUpName",
            message: "Which employee would you like to update?",
            //invoked function to list target employee choices
            choices: await dispChoices("full_name", "employees"),
        },
        {
            type: "list",
            name: "empUpMgr",
            message: "Who will be this employee's new Manager?",
            //invoked function to list manager choices
            choices: await dispChoices("full_name", "employees"),
            default: "none"
        }
    ]
    
    //answers set to variable
    let empUpAns = await inquirer.prompt(empUpdatePrompts);

    //mgr id set to variable, value returned from query function
    let empMgr = await findID("employees", "full_name", empUpAns.empUpMgr);
    //db query used to update db
    db.query(`UPDATE employees SET manager_id=${empMgr} WHERE full_name = '${empUpAns.empUpName}'`), (err, results) => {
        if (err) return err };
}
module.exports = {addEmployee, addRole, addDepartment, updateEmployeeRole, updateEmployeeMgr};

