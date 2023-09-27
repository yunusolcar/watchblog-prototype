const express = require("express");
const adminController = require("../controllers/adminController");
const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth");
const router = express.Router();

//Delete Blog - get
router.get("/blog/delete/:blogid", isAuth, adminController.getDeleteBlog);

//Delete Blog - post
router.post("/blog/delete/:blogid", isAuth, adminController.postDeleteBlog);

//Delete Category - get
router.get("/category/delete/:categoryid", isAuth, adminController.getCategoryDelete);

//Delete Category - post
router.post("/category/delete/:categoryid", isAuth, adminController.postCategoryDelete);

//Create Blog - get
router.get("/blog/create", isAuth, adminController.getBlogCreate);

//Create Blog - post
router.post("/blog/create", isAuth, imageUpload.upload.single("image"), adminController.postBlogCreate);

//Create Category - get
router.get("/category/create", isAuth, adminController.getCategoryCreate);

//Create Category - post
router.post("/category/create", isAuth, adminController.postCategoryCreate);

//Edit Blog - get
router.get("/blogs/:blogid", isAuth, adminController.getBlogEdit);

//Edit Blog - post
router.post("/blogs/:blogid", isAuth, imageUpload.upload.single("image"), adminController.postBlogEdit);

//Edit Category - get
router.get("/categories/:categoryid", isAuth, adminController.getCategoryEdit);

//Edit Category - post
router.post("/categories/:categoryid", isAuth, adminController.postCategoryEdit);

// Blog List - get
router.get("/blogs", isAuth, adminController.getBlogList);

// Category List - post
router.get("/categories", isAuth, adminController.getCategoryList);

module.exports = router;