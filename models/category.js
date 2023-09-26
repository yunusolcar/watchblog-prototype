const {
     DataTypes
} = require("sequelize");
const sequelize = require("../data/db");

const Category = sequelize.define("category", {
     name: {
          type: DataTypes.STRING,
          allowNull: false,
     }
<<<<<<< HEAD
})

module.exports = Category
=======
});

module.exports = Category;
>>>>>>> main
