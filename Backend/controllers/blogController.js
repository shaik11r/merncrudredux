const blogModel = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    return res.status(200).send({
      data: blogs,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title, description);
    const newBlog = await blogModel.create({ title, description });
    return res.status(201).send({
      message: "blog created Sucessfully",
      data: newBlog,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const param = req.params.id;
    console.log(param);
    const deleteBlog = await blogModel.findByIdAndDelete(param);
    if (!deleteBlog) {
      return res.status(404).send({ error: "blog not found" });
    }
    return res.status(204).send();
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description } = req.body;
    const existingBlog = await blogModel.findById(blogId);
    if (!existingBlog) {
      return res.status(400).json({ error: "blog not found" });
    }
    if (!title && !description) {
      return res.status(400).json({ error: "title or description cant be empty" });
    }
    existingBlog.title = title || existingBlog.title;
    existingBlog.description = description || existingBlog.description;
    const updateBlog = await existingBlog.save();
    res.status(201).send({
      data: updateBlog,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
};
