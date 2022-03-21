const db = require("./index.js");

async function selectAll(table) {
    let results = await db.promise().query(`SELECT * FROM ${table}`)
    console.table(results[0]);
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
    console.log(thisID);
    return thisID;
}

async function joinTable(){
    db.query('SELECT employees.first_name AS First, employees.last_name AS Last, roles.title, roles.salary, departments.department_name AS department FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id', function (err, results){
    console.log("test");
    console.table(results);
    })
}


module.exports = {selectAll, dispChoices, findID, joinTable};

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

