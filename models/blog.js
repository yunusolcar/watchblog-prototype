const {
     DataTypes
} = require("sequelize");
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", {
     blogid: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     title: {
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
});

async function sync() {
     await Blog.sync({
          force: true
     });
     console.log("blog table added");

     const count = await Blog.count();
     if (count == 0) {

          await Blog.create({
               title: "Explorer",
               description: "Rolex - 2023",
               image: "rolexplorer.jpg",
               categoryid: 1
          });
          await Blog.create({
               title: "F91W",
               description: "Casio F91W",
               image: "Casio-F-91W.jpeg",
               categoryid: 2
          });
     }
}
sync();

module.exports = Blog;