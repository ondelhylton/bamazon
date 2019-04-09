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
    product_sales INTEGER (30),
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1, "Televison", "Electronics", 400, 25, 500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (2, "Radio", "Electronics", 20, 15, 800);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (3, "Camera", "Electronics", 900, 40, 500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (4, "Phone", "Electronics", 750, 50, 900);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (5, "Computer", "Electronics", 1000, 3, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (6, "Toaster", "Appliances", 30, 30, 10000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (7, "Oven", "Appliances", 700, 50, 560);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (8, "Refrigerator", "Appliances", 800, 10, 4000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (9, "Microwave", "Appliances", 50, 25, 2390);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (10, "Dishwasher", "Appliances", 200, 4, 0);


SELECT * FROM products;
SHOW TABLES;



DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
	department_id INT NOT NULL,
    department_name VARCHAR (30),
    over_head_cost INTEGER (200),
    PRIMARY KEY (item_id)
);

SELECT * FROM departments;
