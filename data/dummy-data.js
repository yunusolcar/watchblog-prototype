const Category = require("../models/category");
const Blog = require("../models/blog");

async function populate() {
     const count = await Category.count();

     if (count == 0) {

          const categories = await Category.bulkCreate([{
                    name: "Mechanical Watches"
               },
               {
                    name: "Digital Watches"
               },
               {
                    name: "Smart Watches"
               }
          ]);

          const blogs = await Blog.bulkCreate([{
                    title: "Explorer",
                    description: "Rolex - 2023",
                    image: "rolexplorer.jpg"
               },
               {
                    title: "F91W",
                    description: "Casio F91W",
                    image: "Casio-F-91W.jpeg"
               }
          ]);
     
          await categories[0].addBlog(blogs[0]);
          await categories[1].addBlog(blogs[1]);
     }
}

module.exports = populate;