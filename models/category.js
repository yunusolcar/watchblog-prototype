const {
     DataTypes
} = require("sequelize")
const sequelize = require("../models/db")

const Category = sequelize.define("category", {
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
}, {
     timestamps: false
})

async function syncCon() {
     await Category.sync({
          force: true
     }) //eğer ilgili tablo zaten varsa, tabloyu yeniden oluşturur ve mevcut verileri siler.
     console.log("Category table created");
}
syncCon()

exports.module = Category