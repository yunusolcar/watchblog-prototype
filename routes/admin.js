const express = require("express")
const db = require('../models/db')
const router = express.Router()

router.get("/blog/create", async (req, res) => {
    try {
        const [categories, ] = await db.execute("SELECT * FROM category")
        res.render("admin/blog-create", {
            title: "Add Blog",
            categories: categories
        })
    } catch (err) {
        console.log(err)
    }
})

router.post("/blog/create", async (req, res) => {
    const title = req.body.title // req.body.title => blog-create deki name alanından geliyor.
    const description = req.body.description
    const image = req.body.image
    const category = req.body.category
    //  console.log(title, description, image, category) //formun içerisine gelen bilgiler body ye gelir.

    try {
        await db.execute("INSERT INTO blog(title, description, image, categoryid) VALUES (?,?,?,?)", [title, description, image, category])
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})

router.get("/blogs/:blogid", function (req, res) {
    res.render("admin/blog-edit");
})

router.get("/blogs", function (req, res) {
    res.render("admin/blog-list");
})

module.exports = router