const {
     DataTypes
} = require("sequelize")
const sequelize = require("./db")

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
          alter: true
     }) //await Blog.sync({force: true} eğer ilgili tablo zaten varsa, tabloyu yeniden oluşturur ve mevcut verileri siler. (her seferinde)
     console.log("Category table created");

     /*
     await Category.create({
          name: "Mechanical Watches",
     })
     await Category.create({
          name: "Quartz Watches",
     })
     await Category.create({
          name: "Smart Watches",
     })
     */
     const count = await Category.count();

     if (count == 0) {
          await Category.bulkCreate([{ //Çoklu create işlemleri için bulkCreate kullanılır
                    name: "Mechanical Watches"
               },
               {
                    name: "Smart Watches"
               },
               {
                    name: "Quartz Watches"
               },
               {
                    name: "Digital Watches"
               }
          ])
     }
     console.log("categories added");
}
syncCon()

module.exports = Category