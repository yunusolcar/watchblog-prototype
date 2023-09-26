const Category = require("../models/category");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

async function populate() {
     const count = await Category.count();

     if (count == 0) {

          const categories = await Category.bulkCreate([{ //bulkCreate ile birden fazla sorguyu tek bir query'de gönderiyoruz
                    name: "Mechanical Watches"
               },
               {
                    name: "Digital Watches"
               },
               {
                    name: "Smart Watches"
               }
          ]);

          const users = await User.bulkCreate([{
               fullname: "Manuel Calavera",
               email: "manny@mail",
               password: await bcrypt.hash("meche", 10)
          }, {
               fullname: "Mercedes Colomar",
               email: "meche@mail",
               password: await bcrypt.hash("manny", 10)
          }]);

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