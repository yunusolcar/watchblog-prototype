const {
     DataTypes
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