const express = require("express");
const db = require('../data/db');
const router = express.Router();

//Delete Blog - get
router.get("/blog/delete/:blogid", async (req, res) => {
    const blogid = req.params.blogid;// Parametreden alınan blogid

    try {
        const [blogs, ] = await db.execute("SELECT * FROM blog WHERE blogid=?", [blogid]);
        const blog = blogs[0];

        res.render("admin/blog-delete", {
            title: "Delete Blog",
            blog: blog
        });

    } catch (err) {
        console.log(err);
    }
})
//Delete Blog - post
router.post("/blog/delete/:blogid", async (req, res) => {
    const blogid = req.body.blogid; // Formun içerisinden alınan blogid

    try {
        await db.execute("DELETE  FROM blog WHERE blogid=?", [blogid]);
        res.redirect("/admin/blogs?action=delete");

    } catch (err) {
        console.log(err);
    }
});
//Delete Category - get
router.get("/category/delete/:categoryid", async (req, res) => {
    const categoryid = req.params.categoryid; // Parametreden alınan blogid

    try {
        const [categories, ] = await db.execute("SELECT * FROM category WHERE categoryid=?", [categoryid]);
        const category = categories[0];

        res.render("admin/category-delete", {
            title: "Delete Category",
            category: category
        });

    } catch (err) {
        console.log(err);
    }
});
//Delete Category - post
router.post("/category/delete/:categoryid", async (req, res) => {
    const categoryid = req.body.categoryid; // Formun içerisinden alınan blogid

    try {
        await db.execute("DELETE  FROM category WHERE categoryid=?", [categoryid]);
        res.redirect("/admin/categories?action=delete")

    } catch (err) {
        console.log(err);
    }
});
//Crate Blog - get
router.get("/blog/create", async (req, res) => {

    try {
        const [categories, ] = await db.execute("SELECT * FROM category");
        res.render("admin/blog-create", {
            title: "Add Blog",
            categories: categories
        });

    } catch (err) {
        console.log(err);
    }
});
//Create Blog - post
router.post("/blog/create", async (req, res) => {
    const title = req.body.title; // req.body.title => blog-create deki name alanından geliyor.
    const description = req.body.description;
    const image = req.body.image;
    const kategori = req.body.kategori;
    //  console.log(title, description, image, category) //formun içerisine gelen bilgiler body ye gelir.

    try {
        await db.execute("INSERT INTO blog(title, description, image, categoryid) VALUES (?,?,?,?)", [title, description, image, kategori]);
        res.redirect("/admin/blogs?action=create");
    } catch (err) {
        console.log(err);
    }
});
//Create Category - get
router.get("/category/create", async (req, res) => {

    try {
        res.render("admin/category-create", {
            title: "Add Category"
        });

    } catch (err) {
        console.log(err);
    }
});
//Create Category - post
router.post("/category/create", async (req, res) => {
    const name = req.body.name;

    try {
        await db.execute("INSERT INTO category(name) VALUES (?)", [name]);
        res.redirect("/admin/categories?action=create");
    } catch (err) {
        console.log(err);
    }
});
//Edit Blog - get
router.get("/blogs/:blogid", async (req, res) => {
    const blogid = req.params.blogid; //"router.get("/blogs/:blogid") buradan blogid gelir

    try {
        const [blogs, ] = await db.execute("SELECT * FROM blog WHERE blogid=?", [blogid]);
        const [categories, ] = await db.execute("SELECT * FROM category");
        const blog = blogs[0];

        if (blog) {
            return res.render("admin/blog-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                title: blog.title,
                blog: blog,
                categories: categories
            });
        }
        res.redirect("admin/blog");
    } catch (err) {
        console.log(err);
    }
});
//Edit Blog - post
router.post("/blogs/:blogid", async (req, res) => {

    const blogid = req.body.blogid;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const kategoriid = req.body.kategori;

    try {
        await db.execute("UPDATE blog SET title=?, description=?, image=?, categoryid=? WHERE blogid=?", [title, description, image, kategoriid, blogid]); // [title, description, image, categoryid, blogid] burada body den almış olduğu blogid yi alıp ona göre hangi id yi update edeceğimizi belirtiyoruz
        res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
    } catch (err) {
        console.log(err);
    }
});
//Edit Category - get
router.get("/categories/:categoryid", async (req, res) => {
    const categoryid = req.params.categoryid; //"router.get("/categories/:categoryid") buradan categoryid gelir

    try {
        const [categories, ] = await db.execute("SELECT * FROM category WHERE categoryid=?", [categoryid]);
        const category = categories[0];

        if (category) {
            return res.render("admin/category-edit", { //return edilerek aşağıdaki kodların çalışması engellenir
                title: category.name,
                category: category,
            });
        }
        res.redirect("admin/categories");
    } catch (err) {
        console.log(err);
    }
});
//Edit Category - post
router.post("/categories/:categoryid", async (req, res) => {

    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try {
        await db.execute("UPDATE category SET name=? WHERE categoryid=?", [name, categoryid]); // [name, categoryid] burada body den almış olduğu catid yi alıp ona göre hangi id ye göre  update yapılacağını belirtiyoruz
        res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);

    } catch (err) {
        console.log(err);
    }
});
// Blog List - get
router.get("/blogs", async (req, res) => {
    try {
        const [blogs, ] = await db.execute("SELECT blogid, title, image FROM blog");
        res.render("admin/blog-list", {
            title: "Blog List",
            blogs: blogs,
            action: req.query.action, //Query içerisinde oluşturulmuş olan key bilgisi actiondan gelir 
            blogid: req.query.blogid
        });
    } catch (err) {
        console.log(err);
    }
});
// Blog List - post
router.get("/categories", async (req, res) => {
    try {
        const [categories, ] = await db.execute("SELECT * FROM category");
        res.render("admin/category-list", {
            title: "Category List",
            categories: categories,
            action: req.query.action, //Query içerisinde oluşturulmuş olan key bilgisi actiondan gelir 
            categoryid: req.query.categoryid
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;