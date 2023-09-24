const {
     DataTypes
<<<<<<< HEAD
} = require("sequelize")
const sequelize = require("../models/db")

const Blog = sequelize.define("blog", { // her bir modele id eklemek gerekmez. her modele bir id kolonu otomatik tanınıt
    title: {
          type: DataTypes.STRING,
          allowNull: false
=======
} = require("sequelize");
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", { //blog tablo adı
     title: {
          type: DataTypes.STRING,
          allowNull: false,
>>>>>>> old-state
     },
     description: {
          type: DataTypes.TEXT,
          allowNull: true
     },
     image: {
          type: DataTypes.STRING,
          allowNull: false
     }
<<<<<<< HEAD
})

module.exports = Blog
=======
}, {
     timestamps: true
});

module.exports = Blog;
>>>>>>> old-state
