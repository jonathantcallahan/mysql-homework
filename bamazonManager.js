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
                    break;
                case 'Add to inventory':
                    managerConsole.addInventory();
                    break;
                case 'Add new product':
                    managerConsole.addProduct();
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
    },
    addInventory: () => {
        var productArray = [];
        con.query('select product_name from products', function(err, res){
            if(err) throw err;
            res.forEach(element => {
                productArray.push(element.product_name)
            })
            askQ()
    
        })
        function askQ(){
            inquirer.prompt([
                {
                    name: 'item',
                    type: 'list',
                    message: 'Which item would you like to add inventory to?',
                    choices: productArray
                },
                {
                    name: 'amount',
                    message: 'How many items would you like to add to the inventory?'
                }
            ]).then(function(res){
                var num = res.amount;
                var item = res.item;
                managerConsole.addInventoryFunct(num, item)
            }).catch(function(err){
                if(err) throw err;
            })
        }
    },
    addInventoryFunct: (num, item) => {
        console.log('')
        var query = "update products set stock_quantity = 350 where product_name = 'soccer ball';"
        con.query(query, function(err, res){
            if(err) throw err;
            console.log(res)
        })
    },
    addProduct: () => {
        inquirer.prompt([
            {
                message: 'What product would you like to add?',
                name: 'name'
            },{
                message: 'What department does this item belong to?',
                name: 'dept'
            },{
                message: 'How much will this item cost?',
                name: 'cost'
            },{
                message: 'How many of this item are you adding?',
                name: 'stock'
            }
        ]).then(function(response){
            console.log('jeb')
            var query = 'insert into products (product_name, department_name, price, stock_quantity) values (??,??,??,??);'
            con.query(query, [response.name,response.dept,response.cost,response.stock],function(err, res){
                if(err) throw err;
                console.log(res)
            })
        }).catch(function(err){
            if(err) throw err;
        })
    }
};

managerConsole.menuOptions()