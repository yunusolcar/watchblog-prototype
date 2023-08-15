const express = require("express");
const path = require("path");
const mysql = require('mysql2')
const config = require('./config')
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const app = express();

//Db
const connection = mysql.createConnection(config.db)
connection.connect(err => {
    if (err) {
        return console.log(err)
    }
    connection.query("SELECT * FROM blog ", (err, result) => {
        console.log("title: " + result[2].title)
    })
    console.log("Db Connected")

})


//Template Engine
app.set("view engine", "ejs");

//Middlewares
//app.use(express.static("public"));

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

//Routes
app.use("/admin", adminRoutes);
app.use(userRoutes);

//Port
app.listen(3000, function () {
    console.log("listening on port 3000");
});