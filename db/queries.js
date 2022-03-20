const db = require("./index.js");

async function selectAll(table) {
    db.query(`SELECT * FROM ${table}`, function (err, results) {
    console.log("\n - - - - - - - - - - - - - - - ")
    
    console.table(results);
    })
};

async function dispRoleChoices() {
    let choices =[];
    db.query(`Select title from roles`, function (err, results) {
        
        results.forEach(element => choices.push(element.title));
        // console.log(choices);
    })
    
    return choices;
    
};

async function dispMgrChoices() {
    let choices =[];
    db.query(`Select first_name, last_name from employees`, function (err, results) {
        let protoChoices = [];
        
        
        results.forEach(element => protoChoices.push(Object.values(element)));
        protoChoices.forEach(element => choices.push(element.join(' ')));
        // console.log(protoChoices);
        
    })
    
    return choices;
    
};


// let dispMgrChoices = function() {
    
//     db.query(`SELECT GROUP_CONCAT(first_name, ' ', last_name SEPARATOR ', ') FROM employees`, function (err, results) {

//         // console.log(results);
//         // console.log("##########################")
//         let namesArray = Object.values(results[0]);
//         let namesString = (namesArray[0]);
//         let choices = [...namesString.split(', ')];
        
//     // console.log(choices)
//     return choices;
//     })

// };

async function joinTable(){
    db.query('SELECT employees.first_name AS First, employees.last_name AS Last, roles.title, roles.salary, departments.department_name AS department FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id', function (err, results){
    console.log("test");
    console.table(results);
    })
}


module.exports = {selectAll, dispRoleChoices, dispMgrChoices, joinTable};
