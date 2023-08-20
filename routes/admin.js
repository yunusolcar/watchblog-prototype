const express = require("express")
const db = require('../models/db')
const router = express.Router()

router.get("/blog/delete/:blogid", async (req, res) => {
    const blogid = req.params.blogid // Parametreden alınan blogid

    try {
        const [blogs, ] = await db.execute("SELECT * FROM blog WHERE blogid=?", [blogid])
        const blog = blogs[0]

        res.render("admin/blog-delete", {
            title: "Delete Blog",
            blog: blog
        })

    } catch (err) {
        console.log(err)
    }
})

router.post("/blog/delete/:blogid", async (req, res) => {
    const blogid = req.body.blogid // Formun içerisinden alınan blogid

    try {
        await db.execute("DELETE  FROM blog WHERE blogid=?", [blogid])
        res.redirect("/admin/blogs")

    } catch (err) {
        console.log(err)
    }
})

//Blog Create
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
        res.redirect("/admin/blogs")
    } catch (err) {
        console.log(err)
    }
})

router.get("/blogs/:blogid", async (req, res) => {
    const blogid = req.params.blogid //"router.get("/blogs/:blogid") buradan blogid gelir

    try {
        const [blogs, ] = await db.execute("SELECT * FROM blog WHERE blogid=?", [blogid])
        const [categories, ] = await db.execute("SELECT * FROM category")
        const blog = blogs[0]

        if (blog) {
            return res.render("admin/blog-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                title: blog.title,
                blog: blog,
                categories: categories
            });
        }
        res.redirect("/admin/blog")
    } catch (err) {
        console.log(err)
    }
})

router.post("/blogs/:blogid", async (req, res) => {

    const blogid = req.body.blogid
    const title = req.body.title
    const description = req.body.description
    const image = req.body.image
    const categoryid = req.body.category

    try {
        await db.execute("UPDATE blog SET title=?, description=?, image=?, categoryid=? WHERE blogid=?", [title, description, image, categoryid, blogid])
        res.redirect("/admin/blogs")

    } catch (err) {
        console.log(err)
    }

})

router.get("/blogs", async (req, res) => {
    try {
        const [blogs, ] = await db.execute("SELECT blogid, title, image FROM blog")
        res.render("admin/blog-list", {
            title: "Blog List",
            blogs: blogs
        });
    } catch (err) {
        console.log(err)
    }
})

module.exports = router