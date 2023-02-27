const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");

async function getAllBlogs(req, res, next) {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
}

async function addBlog(req, res, next) {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "No User exist" });
  }
  const blog = new Blog({ title, description, image, user });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ blog });
}

async function updateBlog(req, res, next) {
  const blogId = req.params.id;
  const { title, description } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update blog" });
  }
  return res.status(200).json({ blog });
}

async function getById(req, res, next) {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(404).json({ message: "No Blog Available" });
  }
  return res.status(200).json({ blog });
}

async function deleteBlog(req, res, next) {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "No blog was found" });
  }
  return res.status(200).json({ message: "Successfully" });
}

async function getByUserId(req, res, next) {
  const userId = req.params.id;
  let userBlogs;

  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to to fetch user blog" });
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog found" });
  }
  return res.status(200).json({ blog: userBlogs });
}
module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
};
