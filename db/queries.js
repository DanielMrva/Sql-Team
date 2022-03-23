const db = require("./index.js");

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

async function dispChoices(column, table) {
    
    let results = await db.promise().query(`SELECT ${column} FROM ${table}`)
    let choices = [];

    results[0].forEach(element => choices.push(element[`${column}`]))
    // console.log(choices);
    return choices;
    
};

async function findID(table, column, value) {
    let results = await db.promise().query(`SELECT id from ${table} WHERE ${column} = '${value}'`)
    
    let thisID = results[0][0].id;
    // console.log(thisID);
    return thisID;
}

// async function joinTable() {
//     let results = await db.promise().query('SELECT e.full_name AS Employee, m.full_name AS Managers, roles.title, roles.salary, departments.department_name AS Department FROM employees e INNER JOIN employees m on m.id = e.manager_id LEFT JOIN roles on e.role_id=roles.id LEFT JOIN departments on roles.department_id=departments.id')

//     console.table(results[0])
// };

module.exports = {dispChoices, findID, joinTable};

//coding artifacts below

// async function dispMgrChoices() {
//     let choices =[];
//     db.query(`Select first_name, last_name from employees`, function (err, results) {
//         let protoChoices = [];
        
        
//         results.forEach(element => protoChoices.push(Object.values(element)));
//         protoChoices.forEach(element => choices.push(element.join(' ')));
//         // console.log(protoChoices);
        
//     })
    
//     return choices;
    
// };

// async function dispDptChoices() {
//     let choices =[];
//     db.query(`SELECT department_name FROM departments`, function (err, results) {
        
//         results.forEach(element => choices.push(element.department_name));
//         console.log(choices);
//     })
    
//     return choices;
    
// };


// async function dispRoleChoices() {
//     let choices =[];
//     db.query(`Select title from roles`, function (err, results) {
        
//         results.forEach(element => choices.push(element.title));
//         // console.log(choices);
//     })
    
//     return choices;
    
// };

// async function dispChoicesONE(column, table) {
//     let choices =[];
//     // let key = column;
//     db.query(`Select ${column} from ${table}`, function (err, results) {
//         // console.log(results);
//         results.forEach(element => choices.push(element[`${column}`]));
//         // console.log(choices);
//     })
    
//     return choices;
    
// };

