const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory database
let posts = [
  { 
    id: 1,
    title: 'First Blog Post',
    content: 'This is my first blog post!',
    author: 'John Doe',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'Another interesting article',
    author: 'Jane Smith',
    createdAt: new Date().toISOString()
  }
];

// Routes

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Get single post
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Create new post
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }
  
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author,
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update post
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }
  
  post.title = title;
  post.content = content;
  post.author = author;
  post.updatedAt = new Date().toISOString();
  
  res.json(post);
});

// Delete post
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  posts.splice(index, 1);
  res.status(204).send();
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog API running on port ${PORT}`);
});