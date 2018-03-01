const mysql = require('mysql');
const inquirer = require('inquirer');
let query;

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Seamen42.',
    database: 'bamazon'
})

con.connect(function(err){
    if (err) throw err;
});

var managerConsole = {
    menuOptions: () => {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Welcome back! What would you like to do?',
                choices: [
                    'View products for sale',
                    'View low inventory',
                    'Add to inventory',
                    'Add new product'
                ],
                name: 'choice'
            }
        ]).then(function(response){
            let res = response.choice;
            switch(res) {
                case 'View products for sale':
                    managerConsole.viewProducts();
                    break;
                case 'View low inventory':
                    managerConsole.lowInventory();
            }

        }).catch(function(err){
            if (err) throw err;
        })
    },
    viewProducts: () => {
        con.query('select * from products', function(err, res, fields){
            if (err) throw err;
            console.log('\nHere is the full list of products currently for sale: ')
            for(var i = 0; i <res.length; i++){
                console.log(`
Item ID: ${res[i].item_id} 
Item Name: ${res[i].product_name} 
Dept: ${res[i].department_name} 
Price: ${res[i].price} 
Stock: ${res[i].stock_quantity}`)
            }
            con.end()
        })
    },
    lowInventory: () => {
        query = 'select * from products where stock_quantity between 0 and 30'
        con.query(query, function(err, res){
            if(err) throw err;
            res.forEach(element => {
                console.log(`ID: ${element.item_id} Name: ${element.product_name} Dept: ${element.department_name} Stock: ${element.stock_quantity}`)
            });
        })
    }
};

managerConsole.menuOptions()