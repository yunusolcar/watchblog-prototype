const Category = require("./category")
const Blog = require("./blog")

async function populate() {
     const count = await Category.count();
     if (count == 0) {

          const categories = await Category.bulkCreate([ //Çoklu create işlemleri için bulkCreate kullanılır
               {
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
          const blogs = await Blog.bulkCreate([{
               title: "Casio F91W",
               description: "The Casio F-91W is a digital watch manufactured by Japanese electronics company Casio. Introduced in 1989 as a successor of the F-87W, it is popular for its low price and long battery life. As of 2011, annual production of the watch is 3 million units, which makes it the most sold watch in the world.",
               image: "Casio-F-91W.jpeg"
          }, {
               title: "THE NEW 2023 OYSTER PERPETUAL COSMOGRAPH DAYTONA",
               description: "Rolex is presenting its new-generation Oyster Perpetual Cosmograph Daytona, which has been updated across the entire range. The singular design of the case and face has characterized the chronograph since its launch and has now been revisited with subtle refinements to a number of details. The dial receives new graphic balance, and harmonious color combinations accentuate the contrast between the dial and the counters – or their rings.",
               image: "daytona2023.jpeg"
          }])

          await categories[3].addBlog(blogs[0]);
          await blogs[1].addCategory(categories[0])
          await blogs[1].addCategory(categories[2])

          await categories[1].createBlog({
               title: "Apple Watch Series 8",
               description: "Apple Watch Series 8 features a big, brilliant Always‑On display. Narrow borders push the screen right to the edge, resulting in an elegant integration with the curvature of the case.",
               image: "applewatch8.jpeg"
          })
     }
}
module.exports = populate;