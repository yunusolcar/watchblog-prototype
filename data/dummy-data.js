const Category = require("../models/category");
const Blog = require("../models/blog");

async function populate() {
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
          ]);

          await Blog.create({
               title: "Explorer",
               description: "Rolex - 2023",
               image: "rolexplorer.jpg",
               categoryId: 1
          });
          await Blog.create({
               title: "F91W",
               description: "Casio F91W",
               image: "Casio-F-91W.jpeg",
               categoryId: 2
          });
     }
}

module.exports = populate;