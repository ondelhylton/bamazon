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
  query();
});


  function query() {
      inquirer
      .prompt([
        {
        name: "item_id",
        type: "input",
        message: "What is the ID of the product you'd like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "count",
        type: "input",
        message: "How many units would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      },
      {
        name: "confirm",
        type: "confirm",
        message: "Confirm purchase?",    
      }
      ]) 
              .then(function(answer) {
                //console.log(answer.confirm);
                if (answer.confirm === false) {
                  console.log("BYE!") 
                query(); }

                if (answer.confirm === true) {     
                var q = connection.query("SELECT * FROM products WHERE ?", { item_id: answer.item_id}, function(err, res) {


                if (answer.count <= res[0].stock_quantity) {
                        var oldStock = res[0].stock_quantity;
                        var newStock = res[0].stock_quantity - parseInt(answer.count);
                        var productSales =  res[0].price * parseInt(answer.count)
                        var newTotal = res[0].product_sales + productSales
                        //console.log(oldStock)
                        //console.log(newStock)
                        //console.log(newTotal)
                      

                        connection.query(
                          "UPDATE products SET ? WHERE ?",
                          [{
                            stock_quantity: newStock,
                          },
                          {item_id: answer.item_id}
                          ]);

                          
                          connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [{
                              product_sales: newTotal,
                            },
                            {item_id: answer.item_id}
                            ]);



                    console.log("You've been charged $" + res[0].price * parseInt(answer.count) + " for " + answer.count + " " +  res[0].product_name + "s!" +
                    '\n' + "Product: " +
                    res[0].product_name + 
                    '\n' + "Product ID: " + 
                    res[0].item_id + 
                    '\n' + "Department: " + 
                    res[0].department_name +
                    '\n' + "Item Price: $" + 
                    res[0].price +
                    '\n' + "Stock: " + 
                    newStock + " " + res[0].product_name + "s" + " left in stock." + 
                    '\n');
                      query();
                  }
                else {console.log("Insufficient quantity!");
                    query();
                  }  
                });
              }

              });
            }
