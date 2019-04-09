var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  supervisor();
});



function supervisor() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Product Sales by Department",
          "Create New Department",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Product Sales by Department":
          superQuery();
          break;
  
        case "Create New Department":
          createDepartment();
          break;
        }
      });
  }


  function superQuery() {

    var query = 'SELECT * FROM products'
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
          var sales = parseInt(res[i].product_sales);
        console.log(sales);

        // var sum = 0;
        // for (var i = 0; i < res[i].product_sales.length; i++) {
        // sum += res[i].product_sales;
        // console.log(sum);
        // }
      }
      supervisor();
    });
  }

  function createDepartment() {
    supervisor();
  }