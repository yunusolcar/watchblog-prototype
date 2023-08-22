const {
     DataTypes
} = require("sequelize")
const sequelize = require("../models/db")

const Category = sequelize.define("blog", {
     categoryid: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     name: {
          type: DataTypes.STRING,
          allowNull: false
     }
})

exports.module = Category