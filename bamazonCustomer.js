const mysql = require("mysql");
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});


function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        purchaseRequest();
    })
};


function purchaseRequest() {
    inquirer.prompt([{
                message: "What is the ID of the product they would like to buy?",
                name: "productID"
            },
            {
                message: "How many units of the product would you like to buy?",
                name: "purchaseQuantity"
            }
        ])
        .then(answer => {
            console.log(answer);

            connection.query(`SELECT * FROM products WHERE item_id = ${answer.productID}`, function (err, res) {
                if (err) throw err;
                console.log(res[0].stock_quantity)
                let stockQuantity = res[0].stock_quantity

                if (answer.purchaseQuantity > res[0].stock_quantity) {
                    console.log("Insufficient quantity!")
                    purchaseRequest();
                } else {
                    connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${answer.purchaseQuantity}  WHERE item_id = ${answer.productID}`,
                        (error, response) => {
                            console.log(`Final Cost: $${res[0].price * answer.purchaseQuantity} Enjoy!`)
                            connection.query("SELECT * FROM products", function (err, res) {
                                if (err) throw err;
                                console.table(res);
                                purchaseRequest();
                            })

                        });
                };
            });
        });
};