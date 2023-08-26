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


//One to Many - Relations
Category.hasMany(Blog, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false, //bir blogun kesinlikle bir kategoriye sahip olması gerekiyor
        // defaultValue: 1 // boş geçilen kategoriler 1. ye gider
    },
    onDelete: "RESTRICT", // Eğer kategoriye ait bir veri varsa normal yoldan silinir ama restrict sayesinde kategori bilgisi olan blog bilgisi varsa kategori silinmez. mesela blog=[elma, meyve] meyve kategorisi silindiğinde elme verisi silinmez
    onUpdate: "RESTRICT" // aynı şekilde güncelleme yapılır
})
Blog.belongsTo(Category)

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