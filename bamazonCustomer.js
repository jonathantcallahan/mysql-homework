var mysql = require('mysql');
var inquirer = require('inquirer');


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Seamen42.',
    database: 'bamazon'
});

con.connect(function(err){
    if (err) throw err;
    con.query('SELECT * FROM products', function(err, result, fields){
        if (err) throw err;
        console.log(result)
    })
})

var databaseQuery = {
    purchaseId: () => {
        inquirer.prompt([
            {
                message: 'What is the id of the product you would like to purchase?',
                name: 'productId'
            }
        ]).then(function(response){
            var itemId = response.productId;
            databaseQuery.purchaseQuantity(itemId);
        }).catch(function(err){
            console.log(err)
        });
    },
    purchaseQuantity: (id) => {
        console.log('second inquirer ran')
    }
}

databaseQuery.purchaseId()