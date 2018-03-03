var mysql = require('mysql');
var inquirer = require('inquirer');
require('dotenv').config()


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASS,
    database: 'bamazon'
});

con.connect(function(err){
    if (err) throw err;
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
        inquirer.prompt([
            {
                message: 'How many items would you like to purchase?',
                name: 'amount'
            }
        ]).then(function(response){
            var num = response.amount;
            console.log(response)
            console.log(`Are you sure you would like to purchase ${num} of item ${id}?`)
            databaseQuery.checkStock(id,num)
        }).catch(function(err){
            console.log(err)
        })
    },
    checkStock: (id,amount) => {
        con.query(`SELECT * FROM products WHERE item_id = ${id}`, function(err, result, fields){
        if (err) throw err;
        var remStock = result[0].stock_quantity;
        if(remStock>amount){
            console.log('There are enough items in stock to complete this order')
            databaseQuery.buyItems(id,remStock,amount)
        } else {
            console.log('There are not enough items left in stock to complete this order')
        }

        });
    },
    buyItems: (id,remStock,amount) => {
        var sql = `update products set stock_quantity = ${remStock - amount} where item_id = ${id}`;
        con.query(sql, function(err,result){
            if (err) throw err;
            console.log(result.affectedRows + 'Records updated')
        });
    },
};

databaseQuery.purchaseId()