const express = require("express");
const db = require('../models/db')
const router = express.Router();


router.use("/blogs/category/:categoryid", async (req, res) => {
    const cat_id = req.params.categoryid
    try {
        const [blogs, ] = await db.execute("SELECT * FROM blog WHERE categoryid=?", [cat_id])
        const [categories, ] = await db.execute("SELECT * FROM category")

        res.render("users/blogs", {
            title: "Tüm Saatler", //statik veri
            blogs: blogs, //dinamik veri
            categories: categories
        })

    } catch (error) {

    }
})


//Blogs/:id
router.use("/blogs/:blogid", async (req, res) => { // /blogs/? soru işareti yerine sayı geldiğinde (yani blogid (blogid yerine başka şey de yazabiliriz)) bunu alttaki params içerisinden alabiliriz
    const id = req.params.blogid
    //console.log("id = " + id) // Burada url e yazılan id bilgisi konsola yazıldı. buraya girilen id deki veriler alınır. bütün kayıtlar alınmaz
    try {
        const [blogs, ] = await db.execute("SELECT * FROM blog WHERE blogid=?", [id]) // Soru işareti ile koyduktan sonra execute() 'a ikinci bir parametreyi Dizi olarak ekliyoruz. iki parametre varsa iki değer atanır

        const blog = blogs[0];
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
        const [blogs, ] = await db.execute("SELECT * FROM blog") // [blogs, ] = blogs değişkenine, dizinin ilk elemanı atanır. 
        const [categories, ] = await db.execute("SELECT * FROM category") // [category, ] = category değişkenine, dizinin ilk elemanı atanır.
        // console.log(blogs[2].title) 2. indisteki kaydın title bilgisini konsola yazdırır
        res.render("users/index", {
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
        const [blogs, ] = await db.execute("SELECT * FROM blog") // [blogs, ] = blogs değişkenine, dizinin ilk elemanı atanır. 
        const [categories, ] = await db.execute("SELECT * FROM category") // [category, ] = category değişkenine, dizinin ilk elemanı atanır.
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