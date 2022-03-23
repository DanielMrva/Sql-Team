const db = require("./index.js");

/**
 * 
 * @param {string} table table to be targeted
 * @returns {void} nothing, but it does console.table the results of the db query depending on switch statement
 */
async function joinTable(table) {
    switch (table) {
        case "roles":
            let roleResults = await db.promise().query(`SELECT ${table}.title, roles.salary, departments.department_name FROM roles LEFT JOIN departments ON roles.department_id=departments.id;`);
            console.table(roleResults[0]);
            break;
        case "departments":
            let dResults = await db.promise().query(`SELECT * FROM ${table}`);
            console.table(dResults[0]);
            break;
        case "employees":
            let eResults = await db.promise().query('SELECT e.full_name AS Employee, m.full_name AS Managers, roles.title, roles.salary, departments.department_name AS Department FROM employees e INNER JOIN employees m on m.id = e.manager_id LEFT JOIN roles on e.role_id=roles.id LEFT JOIN departments on roles.department_id=departments.id');
            console.table(eResults[0]);
            break;
        default:
            console.log("Something went wrong with displaying from database...");
        break;
    }
};

/**
 * 
 * @param {string} column column to be targeted
 * @param {string} table table to be targeted
 * @returns {array} array of all of the values from the column
 */
async function dispChoices(column, table) {
    
    let results = await db.promise().query(`SELECT ${column} FROM ${table}`)
    let choices = [];

    results[0].forEach(element => choices.push(element[`${column}`]))
    return choices;
    
};

/**
 * @async so it can await the db query
 * @param {string} table table targeted for search
 * @param {string} column collumn to referance
 * @param {string} value value searched for
 * @returns {number}the id number on the table targeted
 */
async function findID(table, column, value) {
    let results = await db.promise().query(`SELECT id from ${table} WHERE ${column} = '${value}'`)
    
    let thisID = results[0][0].id;

    return thisID;
}

module.exports = {dispChoices, findID, joinTable};