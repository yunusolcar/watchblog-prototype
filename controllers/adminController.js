const fs = require("fs")
const Blog = require("../models/blog")
const Category = require("../models/category")


exports.getBlogDelete = async (req, res) => {
     const blogid = req.params.blogid // Parametreden alınan blogid

     try {
          const blog = await Blog.findByPk(blogid)

          if (blog) {
               return res.render("admin/blog-delete", {
                    title: "Delete Blog",
                    blog: blog
               })
          }
          res.redirect("/admin/blogs")
     } catch (err) {
          console.log(err)
     }
}

exports.postBlogDelete = async (req, res) => {
     const blogid = req.body.blogid // Formun içerisinden alınan blogid

     try {
          const blog = await Blog.findByPk(blogid) //Bu tür işlemlerde Önce SELECT sonra İŞLEM. yani önce id ye göre alınıp sonra işlemi yapıyoruz
          if (blog) {
               await blog.destroy()
               return res.redirect("/admin/blogs?action=delete")
          }
          res.redirect("/admin/blogs")
     } catch (err) {
          console.log(err)
     }
}

exports.getCategoryDelete = async (req, res) => {
     const categoryid = req.params.categoryid // Parametreden alınan blogid

     try {
          const category = await Category.findByPk(categoryid)

          res.render("admin/category-delete", {
               title: "Delete Category",
               category: category
          })

     } catch (err) {
          console.log(err)
     }
}

exports.postCategoryDelete = async (req, res) => {
     const categoryid = req.body.categoryid // Formun içerisinden alınan blogid

     try {
          await Category.destroy({
               where: {
                    id: categoryid
               }
          })
          res.redirect("/admin/categories?action=delete")

     } catch (err) {
          console.log(err)
     }
}

exports.getBlogCreate = async (req, res) => {

     try {
          // const [categories, ] = await db.execute("SELECT * FROM category")
          const categories = await Category.findAll()
          res.render("admin/blog-create", {
               title: "Add Blog",
               categories: categories
          })

     } catch (err) {
          console.log(err)
     }
}

exports.postBlogCreate = async (req, res) => {
     const title = req.body.title // req.body.title => blog-create deki name alanından geliyor.
     const description = req.body.description
     const image = req.file.filename
     const category = req.body.category
     //  console.log(title, description, image, category) //formun içerisine gelen bilgiler body ye gelir.

     try {
          await Blog.create({
               title: title,
               description: description,
               image: image,
               categoryId: category
          })
          res.redirect("/admin/blogs?action=create")
     } catch (err) {
          console.log(err)
     }
}

exports.getCategoryCreate = async (req, res) => {

     try {
          res.render("admin/category-create", {
               title: "Add Category"
          })

     } catch (err) {
          console.log(err)
     }
}

exports.postCategoryCreate = async (req, res) => {
     const name = req.body.name

     try {
          await Category.create({
               name: name
          })
          res.redirect("/admin/categories?action=create")
     } catch (err) {
          console.log(err)
     }
}

exports.getBlogEdit = async (req, res) => {
     const blogid = req.params.blogid //"router.get("/blogs/:blogid") buradan blogid gelir

     try {
          const blog = await Blog.findByPk(blogid)
          const categories = await Category.findAll()

          if (blog) {
               return res.render("admin/blog-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                    title: blog.dataValues.title,
                    blog: blog.dataValues,
                    categories: categories
               });
          }
          res.redirect("/admin/blog")
     } catch (err) {
          console.log(err)
     }
}

exports.postBlogEdit = async (req, res) => {

     const blogid = req.body.blogid
     const title = req.body.title
     const description = req.body.description
     let image = req.body.image
     const categoryid = req.body.category
     if (req.file) {
          image = req.file.filename

          fs.unlink("./public/uploads/" + req.body.image, err => {
               console.log(err);
          })
     } else {
          console.log("success");
     }

     try {
          const blog = await Blog.findByPk(blogid)
          if (blog) {
               blog.title = title
               blog.description = description
               blog.image = image
               blog.categoryId = categoryid

               await blog.save() //Verilen güncellenip kaydedilir
               res.redirect("/admin/blogs?action=edit&blogid=" + blogid)
          }
          res.redirect("/admin/blogs") // else bloğu

     } catch (err) {
          console.log(err)
     }
}

exports.getCategoryEdit = async (req, res) => {
     const categoryid = req.params.categoryid //"router.get("/categories/:categoryid") buradan categoryid gelir

     try {
          //const [categories, ] = await db.execute("SELECT * FROM category WHERE categoryid=?", [categoryid])
          const category = await Category.findByPk(categoryid) //Burada Primary Key'e göre arama yapmaktayız çünkü id'ye göre işlem yapmaktayız. Bir dizi değil sadece bir obje gelir. findOne ile de yapılabilir. bu şekilde yapılırsa where eklemek gerekir
          const blogs = await category.getBlogs() //instance üzerinden otomatik bir method oluşturulur. model ismi blog oldugundan ve get metodu ile geldiğinden getBlog + çoğul blog geldiğinden getBlogs olur 
          //Burada blog bilgileri kategori modeli üzerinden  gelir.
          //Blog index üzerinden hasMany() ile bağlandığı için özel bir şekilde tanımlanır

          if (category) {
               return res.render("admin/category-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                    title: category.dataValues.name,
                    category: category.dataValues,
                    blogs: blogs
               });
          }
          res.redirect("/admin/categories")
     } catch (err) {
          console.log(err)
     }
}

exports.postCategoryEdit = async (req, res) => {

     const categoryid = req.body.categoryid
     const name = req.body.name

     try {
          await Category.update({
               name: name
          }, {
               where: {
                    id: categoryid
               }
          })
          return res.redirect("/admin/categories?action=edit&blogid=" + categoryid)

     } catch (err) {
          console.log(err)
     }
}

exports.getBlogs = async (req, res) => {
     try {
          // const [blogs, ] = await db.execute("SELECT blogid, title, image FROM blog")
          const blogs = await Blog.findAll({
               attributes: ["id", "title", "description", "image"]
          })
          res.render("admin/blog-list", {
               title: "Blog List",
               blogs: blogs,
               action: req.query.action, //Query içerisinde oluşturulmuş olan key bilgisi actiondan gelir 
               blogid: req.query.blogid
          });
     } catch (err) {
          console.log(err)
     }
}

exports.postBlogs = async (req, res) => {
     try {
          const categories = await Category.findAll()

          res.render("admin/category-list", {
               title: "Category List",
               categories: categories,
               action: req.query.action, //Query içerisinde oluşturulmuş olan key bilgisi actiondan gelir 
               categoryid: req.query.categoryid
          });
     } catch (err) {
          console.log(err)
     }
}