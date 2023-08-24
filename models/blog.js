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
     await Blog.sync() // await Blog.sync({force: true}) eğer ilgili tablo zaten varsa, tabloyu yeniden oluşturur ve mevcut verileri siler.
     console.log("blog table created");

     const count = await Blog.count();
     if (count == 0) {
          await Blog.create({
               title: "Casio F91W",
               description: "The Casio F-91W is a digital watch manufactured by Japanese electronics company Casio. Introduced in 1989 as a successor of the F-87W, it is popular for its low price and long battery life. As of 2011, annual production of the watch is 3 million units, which makes it the most sold watch in the world.",
               image: "Casio-F-91W.jpeg",
               categoryid: "4"
          })
          await Blog.create({
               title: "THE NEW 2023 OYSTER PERPETUAL COSMOGRAPH DAYTONA",
               description: "Rolex is presenting its new-generation Oyster Perpetual Cosmograph Daytona, which has been updated across the entire range. The singular design of the case and face has characterized the chronograph since its launch and has now been revisited with subtle refinements to a number of details. The dial receives new graphic balance, and harmonious color combinations accentuate the contrast between the dial and the counters – or their rings.",
               image: "daytona2023.jpeg",
               categoryid: "1"
          })
     }
}
syncCon()

module.exports = Blog