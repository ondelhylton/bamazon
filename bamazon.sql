ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
ALTER USER 'root'@'localhost' IDENTIFIED BY '';

SET SQL_SAFE_UPDATES=0;

DROP Database IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
	item_id INT NOT NULL,
	product_name VARCHAR (30),
    department_name VARCHAR (30),
    price INTEGER (200),
    stock_quantity INTEGER (30),
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Televison", "Electronics", 400, 25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Radio", "Electronics", 20, 15);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Camera", "Electronics", 900, 40);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Phone", "Electronics", 750, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Computer", "Electronics", 1000, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Toaster", "Appliances", 30, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Oven", "Appliances", 700, 500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Refrigerator", "Appliances", 800, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Microwave", "Appliances", 50, 25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Dishwasher", "Appliances", 200, 5);


SELECT * FROM products;
SHOW TABLES;


