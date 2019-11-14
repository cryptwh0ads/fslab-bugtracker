const express = require("express"); // Import module 'express'
const path = require("path"); // Import global path module
const app = express(); // Create a instance of module

// Configure views template for render webpage
app.set("view engine", "ejs");
// Define the root dir to search templates
app.set("views", path.resolve(__dirname, "views"));

// On get in the root address,
// the server response it will be 'Hello from API'
//   res.send("Hello from API");
app.get("/", (req, res) => {
  res.render("home");
});

// Send form data in method post
app.post("/", (req, res) => {
  res.send("Posted!");
});

// On get in the 'sum' address,
// the server response with the sum of query params n1 and n2
app.get("/sum", (req, res) => {
  // input: http://localhost:3000/sum?n1=1&n2=1

  // Get the value in n1,
  // requested in query's URL
  const n1 = parseInt(req.query.n1);

  const n2 = parseInt(req.query.n2); // Get the value in n2

  const sum = n1 + n2; // calculate the sum of values

  res.send(`The sum is: ${sum}`); // Response the final value
  // output: The sum is: 2
});

// Define the app 'listening' port
app.listen(3000);
