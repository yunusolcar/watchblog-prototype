const express = require("express")
const path = require("path")
const sequelize = require("./models/db")
const dummyData = require("./models/dummy-data")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")

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

//Relations - one to many
const Category = require("./models/category")
const Blog = require("./models/blog")

Category.hasMany(Blog, {
    foreignKey: {
        name: 'categoryId',
        allowNull: true
    }
}) // 1 kategori 1 den fazla bloga sahip olur. yani blog tablosuna categoryId eklenir
Blog.belongsTo(Category) // 1 blog 1 kategoriye sahip olur

// IIFE - asenkron bir blog
async function clearDb() {
    await sequelize.sync({
        force: true
    })
    await dummyData()
}
clearDb()

//Routes
app.use("/admin", adminRoutes)
app.use(userRoutes)

//Port
app.listen(3000, function () {
    console.log("listening on port 3000")
})