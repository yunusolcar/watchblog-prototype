<<<<<<< HEAD
const express = require("express")
const path = require("path")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")
const sequelize = require("./models/db")
const dummyData = require("./models/dummy-data")
const Category = require("./models/category")
const Blog = require("./models/blog")

const app = express()
=======
const express = require("express");
const cookieParser = require("cookie-parser");
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
>>>>>>> main

//Template Engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
//app.use(express.static("public"));

app.use("/libs", express.static(path.join(__dirname, "node_modules")))
app.use("/static", express.static(path.join(__dirname, "public")))

//Routes
app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes);

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



//Many to Many Relations
Blog.belongsToMany(Category, {
    through: "blogCategories" //through ile kesişim tablosu oluşur. tablo ismi blogCategories olur
});//bir blog birden fazla kategoriye sahip olur

Category.belongsToMany(Blog, {
    through: "blogCategories"
});

(async () => {
    await sequelize.sync({ force: true });
    await dummyData();
})();


//Port
app.listen(3000, function () {
    console.log("listening on port 3000")
})