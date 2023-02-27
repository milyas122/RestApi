const express = require("express");
const blogController = require("../controllers/blog-controller");

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.post("/add", blogController.addBlog);
router.put("/update/:id", blogController.updateBlog);
router.get("/:id", blogController.getById);
router.delete("/:id", blogController.deleteBlog);
router.get("/user/:id", blogController.getByUserId);

module.exports = router;
