const {
     DataTypes
} = require("sequelize")
const sequelize = require("../models/db")

const Blog = sequelize.define("blog", {
     blogid: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     title: {
          type: DataTypes.STRING,
          allowNull: false
     },
     subheading: {
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
     },
     categoryid: {
          type: DataTypes.INTEGER,
          allowNull: false
     },
     dateCreated: {
          type: DataTypes.DATETIME,
          defaultValue: DataTypes.NOW
     }
})

exports.module = Blog