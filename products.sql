DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INTEGER (10) NULL,
  stock_quantity INTEGER (10) NULL, 
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk", "Home", "499", "100"),
("Chair", "Home", "299", "77"),
("TV", "Home", "999", "1000"),
("Lamp", "Home", "49", "200"),
("Tire", "Auto", "79", "1000"),
("Windshield Wipers", "Auto", "12", "542"),
("Ice Scraper", "Auto", "8", "784"),
("Board Game", "Toys", "60", "800"),
("Basketball", "Toys", "10", "145"),
("Skateboard", "Toys", "32", "120"); 