<<<<<<< HEAD
const express = require("express")
const path = require("path")
const sequelize = require("./models/db")
const dummyData = require("./models/dummy-data")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")

const app = express()
=======
const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");
const app = express();
>>>>>>> old-state

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
}) 
Blog.belongsTo(Category)

async function clearDb() {
    await sequelize.sync({
        force: true
    })
    await dummyData()
}
clearDb()

//Routes
<<<<<<< HEAD
app.use("/admin", adminRoutes)
app.use(userRoutes)
=======
app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes);
>>>>>>> old-state

//Many to Many
Blog.belongsToMany(Category, {
    through: "blogCategories"
}); // 3.tablo
Category.belongsToMany(Blog, {
    through: "blogCategories"
});

Blog.belongsTo(User); //belongsTo ile foreign key blog'a eklenir. hasOne kullanılmaz çünkü foreign key user tablosunda saklanır. Bir blogun sadece 1 user'ı olur
User.hasMany(Blog); // Bir user birden fazla bloga sahip olabilir;

// IIFE
(async () => {
    await sequelize.sync({
        force: true
    });
    await dummyData();
})();


//Port
app.listen(3000, function () {
    console.log("listening on port 3000")
})