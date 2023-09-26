<<<<<<< HEAD
const fs = require("fs")
const Blog = require("../models/blog")
const Category = require("../models/category")


exports.getBlogDelete = async (req, res) => {
     const blogid = req.params.blogid // Parametreden alınan blogid

     try {
          const blog = await Blog.findByPk(blogid)

=======
const fs = require("fs");
const Blog = require("../models/blog");
const Category = require("../models/category");
const {
     Op
} = require("sequelize");

exports.getDeleteBlog = async (req, res) => {
     const blogid = req.params.blogid; // Formun içerisinden alınan blogid

     try {
          const blog = await Blog.findByPk(blogid);
>>>>>>> main
          if (blog) {
               return res.render("admin/blog-delete", {
                    title: "Delete Blog",
                    blog: blog
<<<<<<< HEAD
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
=======
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
>>>>>>> main
     }
}

exports.getCategoryDelete = async (req, res) => {
<<<<<<< HEAD
     const categoryid = req.params.categoryid // Parametreden alınan blogid

     try {
          const category = await Category.findByPk(categoryid)

          res.render("admin/category-delete", {
               title: "Delete Category",
               category: category
          })

     } catch (err) {
          console.log(err)
=======
     const categoryid = req.params.categoryid; // Parametreden alınan blogid

     try {
          const category = await Category.findByPk(categoryid);
          res.render("admin/category-delete", {
               title: "Delete Category",
               category: category
          });

     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.postCategoryDelete = async (req, res) => {
<<<<<<< HEAD
     const categoryid = req.body.categoryid // Formun içerisinden alınan blogid
=======
     const categoryid = req.body.categoryid; // Formun içerisinden alınan blogid
>>>>>>> main

     try {
          await Category.destroy({
               where: {
                    id: categoryid
               }
<<<<<<< HEAD
          })
          res.redirect("/admin/categories?action=delete")

     } catch (err) {
          console.log(err)
=======
          });
          res.redirect("/admin/categories?action=delete")

     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.getBlogCreate = async (req, res) => {

     try {
<<<<<<< HEAD
          // const [categories, ] = await db.execute("SELECT * FROM category")
          const categories = await Category.findAll()
          res.render("admin/blog-create", {
               title: "Add Blog",
               categories: categories
          })

     } catch (err) {
          console.log(err)
=======
          const categories = await Category.findAll();
          res.render("admin/blog-create", {
               title: "Add Blog",
               categories: categories
          });

     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.postBlogCreate = async (req, res) => {
<<<<<<< HEAD
     const title = req.body.title // req.body.title => blog-create deki name alanından geliyor.
     const description = req.body.description
     const image = req.file.filename
     const category = req.body.category
=======
     const title = req.body.title; // req.body.title => blog-create deki name alanından geliyor.
     const description = req.body.description;
     const image = req.file.filename;
     const kategori = req.body.kategori;
>>>>>>> main
     //  console.log(title, description, image, category) //formun içerisine gelen bilgiler body ye gelir.

     try {
          await Blog.create({
               title: title,
               description: description,
               image: image,
<<<<<<< HEAD
               categoryId: category
          })
          res.redirect("/admin/blogs?action=create")
     } catch (err) {
          console.log(err)
=======
               categoryId: kategori //categoryid veritabanındaki kayıtlı olan ismi
          });
          res.redirect("/admin/blogs?action=create");
     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.getCategoryCreate = async (req, res) => {

     try {
          res.render("admin/category-create", {
               title: "Add Category"
<<<<<<< HEAD
          })

     } catch (err) {
          console.log(err)
=======
          });

     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.postCategoryCreate = async (req, res) => {
<<<<<<< HEAD
     const name = req.body.name
=======
     const name = req.body.name;
>>>>>>> main

     try {
          await Category.create({
               name: name
<<<<<<< HEAD
          })
          res.redirect("/admin/categories?action=create")
     } catch (err) {
          console.log(err)
=======
          });
          res.redirect("/admin/categories?action=create");
     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.getBlogEdit = async (req, res) => {
<<<<<<< HEAD
     const blogid = req.params.blogid //"router.get("/blogs/:blogid") buradan blogid gelir

     try {
          const blog = await Blog.findByPk(blogid)
=======
     const blogid = req.params.blogid; //"router.get("/blogs/:blogid") buradan blogid gelir

     try {
          const blog = await Blog.findOne({
               where: {
                    id: blogid
               },
               include: {
                    model: Category,
                    attributes: ["id"]
               }
          });
>>>>>>> main
          const categories = await Category.findAll()

          if (blog) {
               return res.render("admin/blog-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                    title: blog.dataValues.title,
                    blog: blog.dataValues,
                    categories: categories
               });
          }
<<<<<<< HEAD
          res.redirect("/admin/blog")
     } catch (err) {
          console.log(err)
=======
          res.redirect("admin/blogs");
     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.postBlogEdit = async (req, res) => {

<<<<<<< HEAD
     const blogid = req.body.blogid
     const title = req.body.title
     const description = req.body.description
     let image = req.body.image
     const categoryid = req.body.category
     if (req.file) {
          image = req.file.filename

          fs.unlink("./public/images/" + req.body.image, err => {
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
=======
     const blogid = req.body.blogid;
     const title = req.body.title;
     const description = req.body.description;
     let image = req.body.image;
     const kategoriIds = req.body.categories;
     console.log(kategoriIds);

     if (req.file) {
          image = req.file.filename;
          fs.unlink("./public/images/" + req.body.image, err => {
               console.log(err);
          });
     }

     try {
          // await db.execute("UPDATE blog SET title=?, description=?, image=?, categoryid=? WHERE blogid=?", [title, description, image, kategoriid, blogid]); // [title, description, image, categoryid, blogid] burada body den almış olduğu blogid yi alıp ona göre hangi id yi update edeceğimizi belirtiyoruz
          const blog = await Blog.findOne({
               where: {
                    id: blogid
               },
               include: {
                    model: Category,
                    attributes: ["id"]
               }
          });

          if (blog) {
               blog.title = title;
               blog.description = description;
               blog.image = image;

               if (kategoriIds == undefined) {
                    await blog.removeCategories(blog.categories); //https://sequelize.org/docs/v6/core-concepts/assocs/#foohasmanybar
               } else {
                    await blog.removeCategories(blog.categories);
                    const selectedCategories = await Category.findAll({
                         where: {
                              id: {
                                   [Op.in]: kategoriIds
                              }
                         }
                    });
                    await blog.addCategories(selectedCategories);
               }

               await blog.save();
               return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
          }
          res.redirect("/admin/blogs");
     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.getCategoryEdit = async (req, res) => {
<<<<<<< HEAD
     const categoryid = req.params.categoryid //"router.get("/categories/:categoryid") buradan categoryid gelir

     try {
          //const [categories, ] = await db.execute("SELECT * FROM category WHERE categoryid=?", [categoryid])
          const category = await Category.findByPk(categoryid) //Burada Primary Key'e göre arama yapmaktayız çünkü id'ye göre işlem yapmaktayız. Bir dizi değil sadece bir obje gelir. findOne ile de yapılabilir. bu şekilde yapılırsa where eklemek gerekir
          const blogs = await category.getBlogs() //instance üzerinden otomatik bir method oluşturulur. model ismi blog oldugundan ve get metodu ile geldiğinden getBlog + çoğul blog geldiğinden getBlogs olur 
          //Burada blog bilgileri kategori modeli üzerinden  gelir.
          //Blog index üzerinden hasMany() ile bağlandığı için özel bir şekilde tanımlanır
=======
     const categoryid = req.params.categoryid; //"router.get("/categories/:categoryid") buradan categoryid gelir

     try {
          const category = await Category.findByPk(categoryid);
          const blogs = await category.getBlogs(); //model instance - lazy loading
          const countBlog = await category.countBlogs();
>>>>>>> main

          if (category) {
               return res.render("admin/category-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                    title: category.dataValues.name,
                    category: category.dataValues,
<<<<<<< HEAD
                    blogs: blogs
               });
          }
          res.redirect("/admin/categories")
     } catch (err) {
          console.log(err)
=======
                    blogs: blogs,
                    countBlog: countBlog
               });
          }
          res.redirect("admin/categories");
     } catch (err) {
          console.log(err);
>>>>>>> main
     }
}

exports.postCategoryEdit = async (req, res) => {

<<<<<<< HEAD
     const categoryid = req.body.categoryid
     const name = req.body.name

     try {
=======
     const categoryid = req.body.categoryid;
     const name = req.body.name;

     try {
          // await db.execute("UPDATE category SET name=? WHERE categoryid=?", [name, categoryid]); // [name, categoryid] burada body den almış olduğu catid yi alıp ona göre hangi id ye göre  update yapılacağını belirtiyoruz
>>>>>>> main
          await Category.update({
               name: name
          }, {
               where: {
                    id: categoryid
               }
<<<<<<< HEAD
          })
          return res.redirect("/admin/categories?action=edit&blogid=" + categoryid)

     } catch (err) {
          console.log(err)
     }
}

exports.getBlogs = async (req, res) => {
     try {
          // const [blogs, ] = await db.execute("SELECT blogid, title, image FROM blog")
=======
          });
          return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
     } catch (err) {
          console.log(err);
     }
}

exports.getBlogList = async (req, res) => {
     try {
>>>>>>> main
          const blogs = await Blog.findAll({
               attributes: ["id", "title", "description", "image"],
               include: {
                    model: Category,
                    attributes: ["name"]
<<<<<<< HEAD
               } //join işlemi yaparak hem blog hem de kategori bilgisini alıyoruz // category modelinden sadece name alanını alıyoruz
          })
=======
               } //join işlemi - hem category hem blog gelir //Eager Loading
          });
>>>>>>> main
          res.render("admin/blog-list", {
               title: "Blog List",
               blogs: blogs,
               action: req.query.action, //Query içerisinde oluşturulmuş olan key bilgisi actiondan gelir 
               blogid: req.query.blogid
          });
     } catch (err) {
<<<<<<< HEAD
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
=======
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
>>>>>>> main
     }
}