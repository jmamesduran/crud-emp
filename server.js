
//import modules
const express = require("express");
const cors = require("cors");

//initializes express
const app = express();

//setting the cors configuration
var corsOptions = {
  origin: "http://localhost:8081",
};
//applies the cors setting 
app.use(cors(corsOptions));

//allow server to accept JSON parse
app.use(express.json());
// allow your server to accept URL-encoded data
app.use(express.urlencoded({ extended: true }));

//simple route
//defines  route at the root URL
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Employee application." });
});

// imports routes for employee models
require("./app/routes/employee.routes.js")(app);


// for starting the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
