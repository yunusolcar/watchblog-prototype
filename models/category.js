const {
     DataTypes
} = require("sequelize");
const sequelize = require("../data/db");

const Category = sequelize.define("category", {
     categoryid: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     name: {
          type: DataTypes.STRING,
          allowNull: false,
     }
}, {
     timestamps: false
});

async function sync() {
     await Category.sync({
          force: true
     });


     const count = await Category.count();

     if (count == 0) {

     await Category.bulkCreate([{
               name: "Mechanical Watches"
          },
          {
               name: "Digital Watches"
          },
          {
               name: "Smart Watches"
          }
     ])
     console.log("Category Added");
}}

sync();


module.exports = Category;