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
  // if (err) throw err;
  manager();
});

function manager() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          products();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          addProduct();
          break;

        }
      });
  }


  function products() {

    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // console.log(res);

      for (var i = 0; i < res.length; i++) {
        console.log('\n' + "Product: " +
        res[i].product_name + 
        '\n' + "Product ID: " + 
        res[i].item_id + 
        '\n' + "Department: " + 
        res[i].department_name +
        '\n' + "Item Price: $" + 
        res[i].price +
        '\n' 
          );
      }
      manager();
      }
    );
 }



 function lowInventory() {
  var query = 'SELECT * FROM products WHERE stock_quantity < 5'; 
      connection.query(query, function(err, res) {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
          console.log('\n' + "Product: " +
          res[i].product_name + 
          '\n' + "Product ID: " + 
          res[i].item_id + 
          '\n' + "Department: " + 
          res[i].department_name +
          '\n' + "Item Price: $" + 
          res[i].price +
          '\n' + "Quantity: " + 
          res[i].stock_quantity +
          '\n' 
            );
        }
        manager();
      });
}



function addInventory() {

  inquirer
  .prompt([
    {
      name: "restock",
      type: "list",
      message: "What product to restock?",
      choices: [
        "microwave",
        "oven",
        "radio",
        "camera",
        "phone",
        "computer",
        "toaster",
        "refrigerator",
        "dishwasher",
        "television",
        "exit"
      ]
    },
    {
    name: "count",
    type: "input",
    message: "How many new units added?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  },
  ])

  .then(function(answer) {

    if (answer.restock === "exit") {
      manager();
    }

    else {
    var query = 'SELECT * FROM products WHERE ?'; 
    connection.query(query, {product_name: answer.restock}, function(err, res) {
    //console.log(answer.restock)
    var oldStock = res[0].stock_quantity;
    var newStock = oldStock + parseInt(answer.count);
      
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [{
        stock_quantity: newStock,
      },
      {product_name: answer.restock}
      ]);
      console.log("You added " + parseInt(answer.count) + " item(s) to " + answer.restock + "'s inventory." + " Total count is now " + newStock + "." 
      + '\n') 
      manager();
    })   
  }
});
}



function addProduct() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Name of the new item would you like to submit?"
      },
      {
        name: "department",
        type: "input",
        message: "What department would you like to place your item in?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the new item?($)",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of the items would you like to add?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var queryID = 'SELECT item_id FROM products'; 
      connection.query(queryID, function(err, res) {
    newID = res.length + 1;
    //console.log(res.length + 1);
        
      connection.query(
        "INSERT INTO products SET ?",
        { item_id: newID,
          product_name: answer.name,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log('\n' + "Your item was successfully added!!!" +
          '\n' + "Product: " +
          answer.name + 
          '\n' + "Product ID: " + 
          newID + 
          '\n' + "Department: " + 
          answer.department +
          '\n' + "Item Price: $" + 
          answer.price +
          '\n'  + "Quantity: " + 
          answer.quantity +
          '\n' );
          manager();
        }
      );
    });
  });   
}






