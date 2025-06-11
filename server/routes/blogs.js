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
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Fetch blogs for the current page
    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit)
      .populate('author', 'email');

    // Check if there is a next page
    const totalBlogs = await Blog.countDocuments();
    const hasNextPage = page * limit < totalBlogs;

    res.status(200).json({
      blogs,
      hasNextPage
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ error: 'Server error' });
  }
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

