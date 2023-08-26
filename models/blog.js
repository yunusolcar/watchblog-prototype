const {
     DataTypes
} = require("sequelize")
const sequelize = require("../models/db")

const Blog = sequelize.define("blog", { // her bir modele id eklemek gerekmez. her modele bir id kolonu otomatik tanınıt
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
     }
})

module.exports = Blog