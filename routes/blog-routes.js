const express = require("express");
const blogController = require("../controllers/blog-controller");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.post("/add", isAuth, blogController.addBlog);
router.put("/update/:id", isAuth, blogController.updateBlog);
router.get("/:id", blogController.getById);
router.delete("/:id", isAuth, blogController.deleteBlog);
router.get("/user/:id", isAuth, blogController.getByUserId);

module.exports = router;
