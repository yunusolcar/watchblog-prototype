const {
     DataTypes
} = require("sequelize")
const sequelize = require("../models/db")

const Blog = sequelize.define("blog", {
     title: {
          type: DataTypes.STRING,
          allowNull: false
     },
     description: {
          type: DataTypes.TEXT,
          allowNull: true
     },
     image: {
          type: DataTypes.STRING,
          allowNull: false
     },
})

module.exports = Blog