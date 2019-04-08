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
                        //console.log(oldStock)
                        //console.log(newStock)
                      

                        connection.query(
                          "UPDATE products SET ? WHERE ?",
                          [{
                            stock_quantity: newStock,
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

      
          

            // if (parseInt(answer.count) > res[0].stock_quantity) {

            //   console.log("sorry, there are only " + res[0].stock_quantity + " left");
            //   pickProduct();




        // if (answer.count <= res[i].stock_quantity) {
        //         var newStock = res[i].stock_quantity - answer.count;

        //         connection.query(
        //           "REPLACE INTO products SET WHERE ID = res[i].item_id",
        //           {
        //             stock_quantity: newStock,
        //           },
        //         );
        //     console.log("You've been charged " + res[i].price + ". " + res[i].stock_quanity + res[i].product_name + "s" + " left in stock.");
        //   }
        // else {console.log("Insufficient quantity!")
        //     query();
        //   }  
      













// if (answer.confirm = "No") {
//   query();
// }

// if (answer.count <= res[i].stock_quantity) {
//       var newStock = res[i].stock_quantity - answer.count;

//       connection.query(
//         "REPLACE INTO products SET WHERE ID = res[i].item_id",
//         {
//           stock_quantity: newStock,
//         }, function(err, res) {
//           for (var i = 0; i < res.length; i++);
  
//     {
//       console.log("You've been charged " + res[i].price + ". " + res[i].stock_quanity + res[i].product_name + "s" + " left in stock.");
//   }
// });
// }
  
// else {
// console.log("Insufficient quantity!");
//   query();
// } 

// }








// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.