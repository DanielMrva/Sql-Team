const mySql2 = require("mysql2");
const inquirer = require("inquirer");
// const cTable = require("console.table");
const db = require("../db/index.js");
const {selectAll, dispChoices, findID, joinTable} = require("../db/queries.js");

async function addEmployee() {

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
            choices: await dispChoices("title", "roles"),
        },
        {
            type: "list",
            name: "empMgr",
            message: "Who will be this employee's Manager",
            choices: await dispChoices("full_name", "employees"),
            default: "none"
        }
    ]
    let empAns = await inquirer.prompt(employeePrompts);
    // console.log(empAns);

    let roleID = await findID("roles", "title", empAns.empRole);
    // console.log(roleID);

    let mgrID = await findID("employees", "full_name", empAns.empMgr);

    // console.log(mgrID);

    db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${empAns.empFirst}', '${empAns.empLast}', '${roleID}', '${mgrID}')`), (err, results) => {
        if (err) return err };
}

async function addRole() {

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
            message: "To which department does this role belong",
            choices: await dispChoices("department_name", "departments"),
        }
    ]
    let roleAns = await inquirer.prompt(rolePrompts);
    // console.log(roleAns);

    let dptID = await findID("departments", "department_name", roleAns.roleDpt);
    // console.log(roleID);

    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ('${roleAns.roleName}', '${roleAns.roleSalary}', '${dptID}')`), (err, results) => {
        if (err) return err };
}

async function addDepartment() {

    const dptPrompts = [
        {
            type: "text",
            name: "dptName",
            message: "What would you like to call this department?",
        }
    ]
    let dptAns = await inquirer.prompt(dptPrompts);

    db.query(`INSERT INTO departments(department_name) VALUES ('${dptAns.dptName}')`), (err, results) => {
        if (err) return err };
}

async function updateEmployee() {

    const empUpdatePrompts = [
        {
            type: "list",
            name: "empUpName",
            message: "Which employee would you like to update?",
            choices: await dispChoices("full_name", "employees"),
        },
        {
            type: "list",
            name: "empUpRole",
            message: "What is this employee's new role?",
            choices: await dispChoices("title", "roles"),
        }
    ]
    

    let empUpAns = await inquirer.prompt(empUpdatePrompts);

    let roleID = await findID("roles", "title", empUpAns.empUpRole);

    // let mgrID = await findID("employees", "full_name", empAns.empMgr);

    db.query(`UPDATE employees SET role_id = '${roleID}' WHERE full_name = '${empUpAns.empUpName}'`), (err, results) => {
        if (err) return err };
}

module.exports = {addEmployee, addRole, addDepartment, updateEmployee};

