// routes/blogs.js
// routes/blogs.js
const router = require('express').Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// Create
router.post('/', auth, async (req, res) => {
  const blog = await Blog.create({ ...req.body, author: req.userId });
  res.json(blog);
  await blog.save();
});

// Read all (paginated)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const blogs = await Blog.find().populate('author', 'email')
                  .skip((page - 1) * limit).limit(limit);
  res.json(blogs);
});

// Read single
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'email');
  res.json(blog);
});

// Update
router.put('/:id', auth, async (req, res) => {
  const blog = await Blog.findOneAndUpdate({ _id: req.params.id, author: req.userId }, req.body, { new: true });
  res.json(blog);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Blog.findOneAndDelete({ _id: req.params.id, author: req.userId });
  res.json({ message: 'Deleted' });
});

module.exports = router;

