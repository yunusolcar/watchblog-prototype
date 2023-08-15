const express = require("express");
const path = require("path");
const mysql = require('mysql2')
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const app = express();

//Db
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "blogdb"
})
connection.connect(err => {
    if (err) {
        return console.log(err)
    } else {
        console.log("Db Connected")
    }
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