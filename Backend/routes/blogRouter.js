const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blogController");

blogRouter.get("/", blogController.getAllBlogs);

blogRouter.post("/", blogController.createBlog);

blogRouter.delete("/:id", blogController.deleteBlog);

blogRouter.patch("/:id", blogController.updateBlog);

module.exports = blogRouter;
