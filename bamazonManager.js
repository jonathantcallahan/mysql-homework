const mysql = require('mysql');
const inquirer = require('inquirer');

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
            }

        }).catch(function(err){
            if (err) throw err;
        })
    },
    viewProducts: () => {
        con.query('select * from products', function(err, res, fields){
            if (err) throw err;
            console.log(res)
        })
    }
};

managerConsole.menuOptions()