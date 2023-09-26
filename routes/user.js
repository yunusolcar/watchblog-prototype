const express = require("express");
<<<<<<< HEAD
const userController = require("../controllers/userController")

const router = express.Router();

router.use("/blogs/category/:categoryid", userController.blogsById)
//Blogs/:id
router.use("/blogs/:blogid", userController.blogDetails);
//Blogs
router.use("/blogs", userController.allBlogs)
//Index
router.use("/", userController.indexPage)
=======
const userController = require("../controllers/userController");

const router = express.Router();

//Blogs by Category id
router.use("/blogs/category/:categoryid", userController.getBlogsByCatId);

//Blog details
router.use("/blogs/:blogid", userController.getBlogDetails);

//Blogs
router.use("/blogs", userController.getBlogList);

//Index
router.use("/", userController.getIndexPage);
>>>>>>> main

module.exports = router;