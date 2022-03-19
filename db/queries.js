const db = require("./index.js");

async function selectAll(table) {
    db.query(`SELECT * FROM ${table}`, function (err, results) {
    console.log("\n - - - - - - - - - - - - - - - ")
    console.table(results);
    })
};

async function displayChoices(column, table) {
    let choices =[];
    db.query(`Select ${column} from ${table}`, function (err, results) {
        
        results.forEach(element => choices.push(element.title));
        // console.log(choices);
    })
    return choices;
};

async function joinTable(){
    db.query('SELECT employees.first_name AS First, employees.last_name AS Last, roles.title, roles.salary, departments.department_name AS department FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id', function (err, results){
    console.log("test");
    console.table(results);
    })
}


module.exports = {selectAll, displayChoices, joinTable};
