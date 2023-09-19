const express = require("express");
const fs = require("fs");
const db = require('../data/db');
const Blog = require("../models/blog");
const Category = require("../models/category");
const imageUpload = require("../helpers/image-uploads");
const router = express.Router();

//Delete Blog - get
router.get("/blog/delete/:blogid", async (req, res) => {
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
})
//Delete Blog - post
router.post("/blog/delete/:blogid", async (req, res) => {
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
});
//Delete Category - get
router.get("/category/delete/:categoryid", async (req, res) => {
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
});
//Delete Category - post
router.post("/category/delete/:categoryid", async (req, res) => {
    const categoryid = req.body.categoryid; // Formun içerisinden alınan blogid

    try {
        await Category.destroy({
            where: {
                categoryid: categoryid
            }
        });
        res.redirect("/admin/categories?action=delete")

    } catch (err) {
        console.log(err);
    }
});
//Create Blog - get
router.get("/blog/create", async (req, res) => {

    try {
        const categories = await Category.findAll();
        res.render("admin/blog-create", {
            title: "Add Blog",
            categories: categories
        });

    } catch (err) {
        console.log(err);
    }
});
//Create Blog - post
router.post("/blog/create", imageUpload.upload.single("image"), async (req, res) => {
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
            categoryid: kategori //categoryid veritabanındaki kayıtlı olan ismi
        });
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
        await Category.create({
            name: name
        });
        res.redirect("/admin/categories?action=create");
    } catch (err) {
        console.log(err);
    }
});
//Edit Blog - get
router.get("/blogs/:blogid", async (req, res) => {
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
});
//Edit Blog - post
router.post("/blogs/:blogid", imageUpload.upload.single("image"), async (req, res) => {

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
            blog.categoryid = kategoriid;

            await blog.save();
            return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
        }
        res.redirect("/admin/blogs");
    } catch (err) {
        console.log(err);
    }
});
//Edit Category - get
router.get("/categories/:categoryid", async (req, res) => {
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
});
//Edit Category - post
router.post("/categories/:categoryid", async (req, res) => {

    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try {
        // await db.execute("UPDATE category SET name=? WHERE categoryid=?", [name, categoryid]); // [name, categoryid] burada body den almış olduğu catid yi alıp ona göre hangi id ye göre  update yapılacağını belirtiyoruz
        await Category.update({
            name: name
        }, {
            where: {
                categoryid: categoryid
            }
        });
        return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
    } catch (err) {
        console.log(err);
    }
});
// Blog List - get
router.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            attributes: ["blogid", "title", "description", "image"]
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
});
// Category List - post
router.get("/categories", async (req, res) => {
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
});

module.exports = router;