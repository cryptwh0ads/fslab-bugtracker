const express = require("express"); // Imported module 'express'
const path = require("path"); // Imported global path module
const { promisify } = require("util");
const bodyParser = require("body-parser"); // imported module 'body-parser'

const app = express(); // Create a instance of module
const port = 3000;
/*
      Spreadsheet Config
*/
const GoogleSpreadsheet = require("google-spreadsheet");
const credentials = require("./bugtracker.json");

const docId = "1T-m0EQUv23WWcDcsF6eWOq8NVyhww-ZxTp16EiQ7KGg";
const worksheetIndex = 0;

// Configured views template for render webpage
app.set("view engine", "ejs");
// Defined the root dir to search templates
app.set("views", path.resolve(__dirname, "views"));
// Created middleware to accept all url data
app.use(bodyParser.urlencoded({ extended: true }));

// On get in the root address,
// the server response it will be 'Hello from API'
//   res.send("Hello from API");
app.get("/", (req, res) => {
  res.render("home");
});

// Send form data in method post
app.post("/", async (req, res) => {
  try {
    const doc = new GoogleSpreadsheet(docId);

    await promisify(doc.useServiceAccountAuth)(credentials);
    console.log("Spreadsheet opened");
    const info = await promisify(doc.getInfo)();
    const worksheet = info.worksheets[worksheetIndex];
    await promisify(worksheet.addRow)({
      name: req.body.name,
      email: req.body.email
    });
    res.send("Bug reported without errors");
  } catch (err) {
    res.send("Unexpected error on send this report");
    console.log(err);
  }
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
app.listen(port, err => {
  if (err) {
    console.log("Unexpected error: ", err);
  } else {
    console.log(`Application running on port: ${port}`);
  }
});
