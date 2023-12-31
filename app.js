const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");
const locals = require("./middlewares/locals");
const app = express();

//Template Engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: "hello there",
    resave: false, // session üzerinde tekrar değişiklik yapılamamasını sağlar
    saveUninitialized: false, //her uygulamayı ziyaret eden için bir session deposu oluşturmaz
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 günlük ömrü olan session oluşur
    },
    store: new SequelizeStore({ //burada sessionları db de saklama işlemi yapıyoruz
        db: sequelize
    })
}));
app.use(locals);
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


//Port
app.listen(3000, function () {
    console.log("listening on port 3000")
})