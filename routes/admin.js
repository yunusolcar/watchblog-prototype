<<<<<<< HEAD
const express = require("express")
const fs = require("fs")
const Blog = require("../models/blog")
const Category = require("../models/category")
const imageUpload = require("../helpers/image-upload")

const router = express.Router()

//Delete Blog - get
router.get("/blog/delete/:blogid", async (req, res) => {
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
})
//Delete Blog - post
router.post("/blog/delete/:blogid", async (req, res) => {
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
})
//Delete Category - get
router.get("/category/delete/:categoryid", async (req, res) => {
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
})
//Delete Category - post
router.post("/category/delete/:categoryid", async (req, res) => {
     const categoryid = req.body.categoryid // Formun içerisinden alınan blogid

     try {
          await Category.destroy({
               where: {
                    categoryid: categoryid
               }
          })
          res.redirect("/admin/categories?action=delete")

     } catch (err) {
          console.log(err)
     }
})
//Crate Blog - get
router.get("/blog/create", async (req, res) => {

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
})
//Create Blog - post
router.post("/blog/create", imageUpload.upload.single("image"), async (req, res) => {
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
               categoryid: category
          })
          res.redirect("/admin/blogs?action=create")
     } catch (err) {
          console.log(err)
     }
})
=======
const express = require("express");
const adminController = require("../controllers/adminController");
const imageUpload = require("../helpers/image-uploads");
const router = express.Router();

//Delete Blog - get
router.get("/blog/delete/:blogid", adminController.getDeleteBlog);

//Delete Blog - post
router.post("/blog/delete/:blogid", adminController.postDeleteBlog);

//Delete Category - get
router.get("/category/delete/:categoryid", adminController.getCategoryDelete);

//Delete Category - post
router.post("/category/delete/:categoryid", adminController.postCategoryDelete);

//Create Blog - get
router.get("/blog/create", adminController.getBlogCreate);

//Create Blog - post
router.post("/blog/create", imageUpload.upload.single("image"), adminController.postBlogCreate);

>>>>>>> old-state
//Create Category - get
router.get("/category/create", adminController.getCategoryCreate);

<<<<<<< HEAD
     try {
          res.render("admin/category-create", {
               title: "Add Category"
          })

     } catch (err) {
          console.log(err)
     }
})
//Create Category - post
router.post("/category/create", async (req, res) => {
     const name = req.body.name

     try {
          await Category.create({
               name: name
          })
          res.redirect("/admin/categories?action=create")
     } catch (err) {
          console.log(err)
     }
})
//Edit Blog - get
router.get("/blogs/:blogid", async (req, res) => {
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
})
//Edit Blog - post
router.post("/blogs/:blogid", imageUpload.upload.single("image"), async (req, res) => {

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
               blog.categoryid = categoryid

               await blog.save() //Verilen güncellenip kaydedilir
               res.redirect("/admin/blogs?action=edit&blogid=" + blogid)
          }
          res.redirect("/admin/blogs") // else bloğu

     } catch (err) {
          console.log(err)
     }
})
//Edit Category - get
router.get("/categories/:categoryid", async (req, res) => {
     const categoryid = req.params.categoryid //"router.get("/categories/:categoryid") buradan categoryid gelir

     try {
          //const [categories, ] = await db.execute("SELECT * FROM category WHERE categoryid=?", [categoryid])
          const category = await Category.findByPk(categoryid) //Burada Primary Key'e göre arama yapmaktayız çünkü id'ye göre işlem yapmaktayız. Bir dizi değil sadece bir obje gelir. findOne ile de yapılabilir. bu şekilde yapılırsa where eklemek gerekir

          if (category) {
               return res.render("admin/category-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                    title: category.dataValues.name,
                    category: category.dataValues,
               });
          }
          res.redirect("/admin/categories")
     } catch (err) {
          console.log(err)
     }
})
=======
//Create Category - post
router.post("/category/create", adminController.postCategoryCreate);

//Edit Blog - get
router.get("/blogs/:blogid", adminController.getBlogEdit);

//Edit Blog - post
router.post("/blogs/:blogid", imageUpload.upload.single("image"), adminController.postBlogEdit);

//Edit Category - get
router.get("/categories/:categoryid", adminController.getCategoryEdit);

>>>>>>> old-state
//Edit Category - post
router.post("/categories/:categoryid", adminController.postCategoryEdit);

<<<<<<< HEAD
     const categoryid = req.body.categoryid
     const name = req.body.name

     try {
          await Category.update({
               name: name
          }, {
               where: {
                    categoryid: categoryid
               }
          })
          return res.redirect("/admin/categories?action=edit&blogid=" + categoryid)

     } catch (err) {
          console.log(err)
     }
})

// Blog List - get
router.get("/blogs", async (req, res) => {
     try {
          // const [blogs, ] = await db.execute("SELECT blogid, title, image FROM blog")
          const blogs = await Blog.findAll({
               attributes: ["blogid", "title", "description", "image"]
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
})
// Blog List - post
router.get("/categories", async (req, res) => {
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
})
=======
// Blog List - get
router.get("/blogs", adminController.getBlogList);
>>>>>>> old-state

// Category List - post
router.get("/categories", adminController.getCategoryList);

module.exports = router;