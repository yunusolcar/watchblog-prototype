const express = require("express");
const adminController = require("../controllers/adminController");
const imageUpload = require("../helpers/image-uploads");
const router = express.Router();

//Delete Blog - get
router.get("/blog/delete/:blogid", adminController.getDeleteBlog);

//Delete Blog - post
router.post("/blog/delete/:blogid", adminController.postDeleteBlog);

//Delete Category - get
router.get("/category/delete/:categoryid", adminController.getCategoryDelete);

//Delete Category - post
router.post("/category/delete/:categoryid", adminController.postCategoryDelete);

//Create Blog - get
router.get("/blog/create", adminController.getBlogCreate);

//Create Blog - post
router.post("/blog/create", imageUpload.upload.single("image"), adminController.postBlogCreate);

//Create Category - get
router.get("/category/create", adminController.getCategoryCreate);

//Create Category - post
router.post("/category/create", adminController.postCategoryCreate);

//Edit Blog - get
router.get("/blogs/:blogid", adminController.getBlogEdit);

//Edit Blog - post
router.post("/blogs/:blogid", imageUpload.upload.single("image"), adminController.postBlogEdit);

//Edit Category - get
router.get("/categories/:categoryid", adminController.getCategoryEdit);

//Edit Category - post
router.post("/categories/:categoryid", adminController.postCategoryEdit);

// Blog List - get
router.get("/blogs", adminController.getBlogList);

// Category List - post
router.get("/categories", adminController.getCategoryList);

module.exports = router;