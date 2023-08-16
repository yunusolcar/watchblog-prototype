const express = require("express");
const db = require('../models/db')
const router = express.Router();

//Blogs/:id
router.use("/blogs/:blogid", async function (req, res) { // /blogs/? soru işareti yerine sayı geldiğinde (yani blogid) bunu alttaki params içerisinden alabiliriz
    const id = req.params.blogid
    console.log("id = " + id) // Burada url e yazılan id bilgisi konsola yazıldı. buraya girilen id deki veriler alınır. bütün kayıtlar alınmaz
    res.render("users/blog-details");
});

//Blogs
router.use("/blogs", async (req, res) => {
    try {
        const [blogs, ] = await db.execute("SELECT * FROM blog") // [blogs, ] = blogs değişkenine, dizinin ilk elemanı atanır. 
        const [categories, ] = await db.execute("SELECT * FROM category") // [category, ] = category değişkenine, dizinin ilk elemanı atanır.
        // console.log(blogs[2].title) 2. indisteki kaydın title bilgisini konsola yazdırır
        res.render("users/index", {
            baslik: "Popüler Kurslar",
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
            baslik: "Tüm Kurslar",
            blogs: blogs,
            categories: categories
        })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;