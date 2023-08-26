const express = require("express");
const userController = require("../controllers/userController")

const router = express.Router();

router.use("/blogs/category/:categoryid", userController.blogsById)
//Blogs/:id
router.use("/blogs/:blogid", userController.blogDetails);
//Blogs
router.use("/blogs", userController.allBlogs)
//Index
router.use("/", userController.indexPage)

module.exports = router;