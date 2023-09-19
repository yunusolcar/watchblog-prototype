const express = require("express");
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

module.exports = router;