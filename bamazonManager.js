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


function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        if (res = []) {
            console.log("Fully Stocked")
        } else {
            console.table(res);
        }
        afterConnection();
    });
};

function addInventory() {
    inquirer.prompt([{
                message: "What is the ID of the product you would like to add inventory to?",
                name: "productID"
            },
            {
                message: "How many units would you like to add?",
                name: "addQuantity"

            }
        ])
        .then(answer => {
            connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${answer.addQuantity}  WHERE item_id = ${answer.productID}`,
                function (err, res) {
                    if (err) throw err;
                    viewProducts();
                });
        })
};

function addProducts() {
    inquirer.prompt([{
                message: "What product do you want to add?",
                name: "productName"
            },
            {
                message: "What sales department does this product belong to?",
                name: "departmentName"
            },
            {
                message: "How much does this product cost?",
                name: "price"

            },
            {
                message: "How many products are in-stock?",
                name: "stockQuantity"

            }
        ])
        .then(answer => {
            connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${answer.productName}', '${answer.departmentName}', '${answer.price}', '${answer.stockQuantity}')`,
                function (err, res) {
                    if (err) throw err;
                    console.log("Product has been added to your inventory and is now available for sale.")
                    afterConnection();
                });
        })
};


function afterConnection() {
    inquirer.prompt([{
            message: "Choose a menu item.",
            name: "menuItems",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(answer => {

            switch (answer.menuItems) {
                case 'View Products for Sale':
                    viewProducts()
                    break;
                case 'View Low Inventory':
                    lowInventory()
                    break;
                case 'Add to Inventory':
                    addInventory()
                    break;
                case 'Add New Product':
                    addProducts()
                    break;
                default:
                    console.log(`Whomp Whomp.... You manged to break the app! ${err}`)
                    afterConnection()
                    break;
            };

        });
};