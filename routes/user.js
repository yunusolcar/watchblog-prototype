const express = require("express");
const Blog = require("../models/blog")
const Category = require("../models/category")

const router = express.Router();

router.use("/blogs/category/:categoryid", async (req, res) => {
    const id = req.params.categoryid
    try {
        const blogs = await Blog.findAll({
            where: {
                categoryId: id
            },
            raw: true
        })
        const categories = await Category.findAll({
            raw: true
        })

        res.render("users/blogs", {
            title: "all", //statik veri
            blogs: blogs, //dinamik veri
            categories: categories
        })

    } catch (error) {
        console.log(error);
    }
})
//Blogs/:id
router.use("/blogs/:blogid", async (req, res) => {
    const id = req.params.blogid
    try {
        const blog = await Blog.findByPk(id)

        if (blog) {
            return res.render("users/blog-details", { // ilgili id si olan obje database de varsa  return dönüp aşağıdaki işlemleri yapar yok ise anasayfaya redirect eder
                title: blog.title, //diinamik veri
                blog: blog
            })
        }
        res.redirect('/');

    } catch (error) {
        console.log(error)
    }
});
//Blogs
router.use("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            raw: true
        })
        const categories = await Category.findAll({
            raw: true
        })

        res.render("users/blogs", {
            title: "Tüm Saatler",
            blogs: blogs,
            categories: categories
        })
    } catch (err) {
        console.log(err)
    }
})
//Index
router.use("/", async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            raw: true
        })
        const categories = await Category.findAll({
            raw: true
        })
        // console.log(blogs[2].title) 2. indisteki kaydın title bilgisini konsola yazdırır
        res.render("users/index", {
            title: "Popüler Saatler", //statik veri
            blogs: blogs,
            categories: categories
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;