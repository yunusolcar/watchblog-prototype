const {
     DataTypes
} = require("sequelize");
const sequelize = require("../data/db");

<<<<<<< HEAD
const Blog = sequelize.define("blog", {
=======
const Blog = sequelize.define("blog", { //blog tablo adı
>>>>>>> main
     title: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     description: {
          type: DataTypes.TEXT,
          allowNull: true
     },
     image: {
          type: DataTypes.STRING,
          allowNull: false
<<<<<<< HEAD
     },
}, {
     timestamps: true
})

module.exports = Blog
=======
     }
}, {
     timestamps: true
});

module.exports = Blog;
>>>>>>> main
