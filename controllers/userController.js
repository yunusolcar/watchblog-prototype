const Blog = require("../models/blog");
const Category = require("../models/category");
const {
     Op
} = require("sequelize");

exports.getBlogsByCatId = async (req, res) => {
     const id = req.params.categoryid;
     try {
          const blogs = await Blog.findAll({
               include: {
                    model: Category,
                    where: {
                         id: id
                    }
               },
               raw: true
          });
          const categories = await Category.findAll({
               raw: true
          });
          res.render("users/blogs", {
               title: "Tüm Saatler", //statik veri
               blogs: blogs, //dinamik veri
               categories: categories,
               selectedCategory: id
          });

     } catch (error) {
          console.log(error);
     }
}

exports.getBlogDetails = async (req, res) => { // /blogs/? soru işareti yerine sayı geldiğinde (yani blogid (blogid yerine başka şey de yazabiliriz)) bunu alttaki params içerisinden alabiliriz
     const id = req.params.blogid;
     //console.log("id = " + id) // Burada url e yazılan id bilgisi konsola yazıldı. buraya girilen id deki veriler alınır. bütün kayıtlar alınmaz
     try {
          const blog = await Blog.findOne({
               where: {
                    id: id
               },
               raw: true
          });
          if (blog) {
               return res.render("users/blog-details", { // ilgili id si olan obje database de varsa  return dönüp aşağıdaki işlemleri yapar yok ise anasayfaya redirect eder
                    title: blog.title, //diinamik veri
                    blog: blog
               })
          }
          res.redirect('/');

     } catch (error) {
          console.log(error);
     }
}

exports.getBlogList = async (req, res) => {
     try {
          const blogs = await Blog.findAll({
               raw: true
          });
          const categories = await Category.findAll({
               raw: true
          });
          res.render("users/blogs", {
               title: "Tüm Saatler",
               blogs: blogs,
               categories: categories,
               selectedCategory: null
          });
     } catch (err) {
          console.log(err);
     }
}

exports.getIndexPage = async (req, res) => {
     try {
          const blogs = await Blog.findAll({
               raw: true
          });
          const categories = await Category.findAll({
               raw: true
          });
          res.render("users/index", {
               title: "Popüler Saatler", //statik veri
               blogs: blogs,
               categories: categories,
               selectedCategory: null,
               isAuth: req.session.isAuth
          });
     } catch (err) {
          console.log(err);
     }
}