const express = require("express")
const path = require("path")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")
const sequelize = require("./models/db")
const dummyData = require("./models/dummy-data")
const Category = require("./models/category")
const Blog = require("./models/blog")

const app = express()

//Template Engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.urlencoded({
    extended: false
}))
//app.use(express.static("public"));

app.use("/libs", express.static(path.join(__dirname, "node_modules")))
app.use("/static", express.static(path.join(__dirname, "public")))

//Routes
app.use("/admin", adminRoutes)
app.use(userRoutes)


//Many to Many Relations
Blog.belongsToMany(Category, {
    through: "blogCategories" //through ile kesişim tablosu oluşur. tablo ismi blogCategories olur
}) //bir blog birden fazla kategoriye sahip olur

Category.belongsToMany(Blog, {
    through: "blogCategories"
})

async function dbCheck() {
    await sequelize.sync({
        alter: true
    })
    await dummyData()
}
dbCheck()

//Port
app.listen(3000, function () {
    console.log("listening on port 3000")
})