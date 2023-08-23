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
     }
})
async function syncCon() {
     await Blog.sync({
          force: true
     }) //eğer ilgili tablo zaten varsa, tabloyu yeniden oluşturur ve mevcut verileri siler.
     console.log("blog table created");
}
syncCon()

exports.module = Blog