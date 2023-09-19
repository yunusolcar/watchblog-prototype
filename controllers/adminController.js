const fs = require("fs");
const Blog = require("../models/blog");
const Category = require("../models/category");

exports.getDeleteBlog = async (req, res) => {
     const blogid = req.params.blogid; // Formun içerisinden alınan blogid

     try {
          const blog = await Blog.findByPk(blogid);
          if (blog) {
               return res.render("admin/blog-delete", {
                    title: "Delete Blog",
                    blog: blog
               });
          }
          res.redirect("/admin/blogs");

     } catch (err) {
          console.log(err);
     }
}

exports.postDeleteBlog = async (req, res) => {
     const blogid = req.body.blogid; // Formun içerisinden alınan blogid

     try {
          const blog = await Blog.findByPk(blogid);
          if (blog) {
               await blog.destroy();
               return res.redirect("/admin/blogs?action=delete");
          }
          res.redirect("/admin/blogs");

     } catch (err) {
          console.log(err);
     }
}

exports.getCategoryDelete = async (req, res) => {
     const categoryid = req.params.categoryid; // Parametreden alınan blogid

     try {
          const category = await Category.findByPk(categoryid);
          res.render("admin/category-delete", {
               title: "Delete Category",
               category: category
          });

     } catch (err) {
          console.log(err);
     }
}

exports.postCategoryDelete = async (req, res) => {
     const categoryid = req.body.categoryid; // Formun içerisinden alınan blogid

     try {
          await Category.destroy({
               where: {
                    id: categoryid
               }
          });
          res.redirect("/admin/categories?action=delete")

     } catch (err) {
          console.log(err);
     }
}

exports.getBlogCreate = async (req, res) => {

     try {
          const categories = await Category.findAll();
          res.render("admin/blog-create", {
               title: "Add Blog",
               categories: categories
          });

     } catch (err) {
          console.log(err);
     }
}

exports.postBlogCreate = async (req, res) => {
     const title = req.body.title; // req.body.title => blog-create deki name alanından geliyor.
     const description = req.body.description;
     const image = req.file.filename;
     const kategori = req.body.kategori;
     //  console.log(title, description, image, category) //formun içerisine gelen bilgiler body ye gelir.

     try {
          await Blog.create({
               title: title,
               description: description,
               image: image,
               categoryId: kategori //categoryid veritabanındaki kayıtlı olan ismi
          });
          res.redirect("/admin/blogs?action=create");
     } catch (err) {
          console.log(err);
     }
}

exports.getCategoryCreate = async (req, res) => {

     try {
          res.render("admin/category-create", {
               title: "Add Category"
          });

     } catch (err) {
          console.log(err);
     }
}

exports.postCategoryCreate = async (req, res) => {
     const name = req.body.name;

     try {
          await Category.create({
               name: name
          });
          res.redirect("/admin/categories?action=create");
     } catch (err) {
          console.log(err);
     }
}

exports.getBlogEdit = async (req, res) => {
     const blogid = req.params.blogid; //"router.get("/blogs/:blogid") buradan blogid gelir

     try {
          const blog = await Blog.findByPk(blogid);
          const categories = await Category.findAll()

          if (blog) {
               return res.render("admin/blog-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                    title: blog.dataValues.title,
                    blog: blog.dataValues,
                    categories: categories
               });
          }
          res.redirect("admin/blogs");
     } catch (err) {
          console.log(err);
     }
}

exports.postBlogEdit = async (req, res) => {

     const blogid = req.body.blogid;
     const title = req.body.title;
     const description = req.body.description;
     let image = req.body.image;
     const kategoriid = req.body.kategori;

     if (req.file) {
          image = req.file.filename;
          fs.unlink("./public/images/" + req.body.image, err => {
               console.log(err);
          });
     }

     try {
          // await db.execute("UPDATE blog SET title=?, description=?, image=?, categoryid=? WHERE blogid=?", [title, description, image, kategoriid, blogid]); // [title, description, image, categoryid, blogid] burada body den almış olduğu blogid yi alıp ona göre hangi id yi update edeceğimizi belirtiyoruz
          const blog = await Blog.findByPk(blogid);
          if (blog) {
               blog.title = title;
               blog.description = description;
               blog.image = image;
               blog.categoryId = kategoriid;

               await blog.save();
               return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
          }
          res.redirect("/admin/blogs");
     } catch (err) {
          console.log(err);
     }
}

exports.getCategoryEdit = async (req, res) => {
     const categoryid = req.params.categoryid; //"router.get("/categories/:categoryid") buradan categoryid gelir

     try {
          const category = await Category.findByPk(categoryid);
          if (category) {
               return res.render("admin/category-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                    title: category.dataValues.name,
                    category: category.dataValues
               });
          }
          res.redirect("admin/categories");
     } catch (err) {
          console.log(err);
     }
}

exports.postCategoryEdit = async (req, res) => {

     const categoryid = req.body.categoryid;
     const name = req.body.name;

     try {
          // await db.execute("UPDATE category SET name=? WHERE categoryid=?", [name, categoryid]); // [name, categoryid] burada body den almış olduğu catid yi alıp ona göre hangi id ye göre  update yapılacağını belirtiyoruz
          await Category.update({
               name: name
          }, {
               where: {
                    id: categoryid
               }
          });
          return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
     } catch (err) {
          console.log(err);
     }
}

exports.getBlogList = async (req, res) => {
     try {
          const blogs = await Blog.findAll({
               attributes: ["id", "title", "description", "image"]
          });
          res.render("admin/blog-list", {
               title: "Blog List",
               blogs: blogs,
               action: req.query.action, //Query içerisinde oluşturulmuş olan key bilgisi actiondan gelir 
               blogid: req.query.blogid
          });
     } catch (err) {
          console.log(err);
     }
}

exports.getCategoryList = async (req, res) => {
     try {
          const categories = await Category.findAll();
          res.render("admin/category-list", {
               title: "Category List",
               categories: categories,
               action: req.query.action,
               categoryid: req.query.categoryid
          });
     } catch (err) {
          console.log(err);
     }
}