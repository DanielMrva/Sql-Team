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

module.exports = {addEmployee, };