const express = require("express");
const db = require('../data/db');
const Blog = require("../models/blog");
const Category = require("../models/category");
const router = express.Router();


router.use("/blogs/category/:categoryid", async (req, res) => {
    const id = req.params.categoryid;
    try {
        const blogs = await Blog.findAll({
            where: {
                categoryid: id
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
});


//Blogs/:id
router.use("/blogs/:blogid", async (req, res) => { // /blogs/? soru işareti yerine sayı geldiğinde (yani blogid (blogid yerine başka şey de yazabiliriz)) bunu alttaki params içerisinden alabiliriz
    const id = req.params.blogid;
    //console.log("id = " + id) // Burada url e yazılan id bilgisi konsola yazıldı. buraya girilen id deki veriler alınır. bütün kayıtlar alınmaz
    try {
        const blog = await Blog.findOne({
            where: {
                blogid: id
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
});

//Blogs
router.use("/blogs", async (req, res) => {
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
});

//Index
router.use("/", async (req, res) => {
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
            selectedCategory: null
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;