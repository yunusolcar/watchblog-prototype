const {
     DataTypes
<<<<<<< HEAD
} = require("sequelize")
const sequelize = require("./db")

const Category = sequelize.define("category", {
     
     name: {
          type: DataTypes.STRING,
          allowNull: false
     }
}, {
     timestamps: false
})

module.exports = Category
=======
} = require("sequelize");
const sequelize = require("../data/db");

const Category = sequelize.define("category", {
     name: {
          type: DataTypes.STRING,
          allowNull: false,
     }
});

module.exports = Category;
>>>>>>> old-state
