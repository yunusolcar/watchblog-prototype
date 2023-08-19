const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const app = express();

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.urlencoded({
    extended: false
}))
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