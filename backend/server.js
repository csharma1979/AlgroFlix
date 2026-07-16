const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

require('dotenv').config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/algroflix';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB database'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Enquiry Schema
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, default: '' },
  service: { type: String, default: '' },
  interest: { type: String, default: '' },
  message: { type: String, default: '' },
  type: { type: String, default: 'general' }, // 'general' or 'hr-academy'
  createdAt: { type: Date, default: Date.now }
});
const Enquiry = mongoose.model('Enquiry', enquirySchema);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (temporary replacement for MongoDB)
let admins = [];
let blogs = [];
let consentRecords = [];

// Create default admin user
const createDefaultAdmin = async () => {
  const existingAdmin = admins.find(admin => admin.email === 'algroflix@gmail.com');
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Bhopal@462047', 12);
    admins.push({
      id: '1',
      email: 'algroflix@gmail.com',
      password: hashedPassword
    });
    console.log('Default admin user created');
  }
};

createDefaultAdmin();

// Create sample blog posts if none exist
const createSampleBlogs = () => {
  if (blogs.length === 0) {
    const sampleBlogs = [
      {
        id: '1',
        title: 'The Future of Cloud Computing in 2024',
        slug: 'the-future-of-cloud-computing-in-2024',
        shortDescription: 'Exploring the latest trends and innovations shaping the cloud computing landscape.',
        content: '<p>Cloud computing continues to evolve at a rapid pace. In 2024, we see several key trends emerging...</p>',
        author: 'AlgroFlix Team',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Digital Transformation Strategies for SMBs',
        slug: 'digital-transformation-strategies-for-smbs',
        shortDescription: 'Practical approaches for small and medium businesses to embrace digital transformation.',
        content: '<p>Digital transformation is no longer optional for businesses. Here are key strategies for SMBs...</p>',
        author: 'AlgroFlix Team',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Cybersecurity Best Practices for Remote Teams',
        slug: 'cybersecurity-best-practices-for-remote-teams',
        shortDescription: 'Essential security measures for distributed workforce environments.',
        content: '<p>With remote work becoming the norm, cybersecurity has taken on new importance...</p>',
        author: 'AlgroFlix Team',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'AI and Machine Learning Trends in 2024',
        slug: 'ai-and-machine-learning-trends-in-2024',
        shortDescription: 'How artificial intelligence is transforming business operations.',
        content: '<p>Artificial intelligence and machine learning are revolutionizing industries...</p>',
        author: 'AlgroFlix Team',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Modern Web Development Practices',
        slug: 'modern-web-development-practices',
        shortDescription: 'Best practices for building scalable and maintainable web applications.',
        content: '<p>Modern web development requires a different approach than traditional methods...</p>',
        author: 'AlgroFlix Team',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    blogs.push(...sampleBlogs);
    console.log('Sample blog posts created');
  }
};

createSampleBlogs();

// Helper function to generate slug
const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-');
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

// Create nodemailer transporter for business domain email
const transporter = nodemailer.createTransport({
  host: 'algroflix.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'Support@algroflix.com',
    pass: process.env.EMAIL_PASS || 'Welcome@123#$'
  },
  tls: {
    rejectUnauthorized: false // Only for development - remove in production
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter configuration error:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// Routes

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../build')));

// API routes
// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin user
    const admin = admins.find(a => a.email === email);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({ 
      success: true, 
      token,
      user: { email: admin.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all blogs (protected)
app.get('/api/blogs', authenticateToken, (req, res) => {
  try {
    res.json(blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get published blogs (public)
app.get('/api/blogs/public', (req, res) => {
  try {
    const publishedBlogs = blogs.filter(blog => blog.status === 'published');
    res.json(publishedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single blog by ID (public)
app.get('/api/blogs/public/:id', (req, res) => {
  try {
    const blog = blogs.find(b => b.id === req.params.id && b.status === 'published');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get blog by ID (protected)
app.get('/api/blogs/:id', authenticateToken, (req, res) => {
  try {
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog (protected)
app.post('/api/blogs', authenticateToken, (req, res) => {
  try {
    const { title, shortDescription, content, author, status } = req.body;
    
    // Generate slug from title
    const slug = generateSlug(title);
    
    // Check for duplicate slug
    const existingBlog = blogs.find(b => b.slug === slug);
    if (existingBlog) {
      return res.status(400).json({ message: 'Blog with this slug already exists' });
    }
    
    const blog = {
      id: Date.now().toString(), // Simple ID generation
      title,
      slug,
      shortDescription,
      content,
      author,
      status: status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    blogs.push(blog);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blog (protected)
app.put('/api/blogs/:id', authenticateToken, (req, res) => {
  try {
    const { title, shortDescription, content, author, status } = req.body;
    
    const blogIndex = blogs.findIndex(b => b.id === req.params.id);
    if (blogIndex === -1) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Generate slug from title if title changed
    let slug = req.body.slug;
    if (title && req.body.slug !== generateSlug(title)) {
      slug = generateSlug(title);
      // Check for duplicate slug
      const existingBlog = blogs.find(b => b.slug === slug && b.id !== req.params.id);
      if (existingBlog) {
        return res.status(400).json({ message: 'Blog with this slug already exists' });
      }
    }
    
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      title: title || blogs[blogIndex].title,
      slug: slug || blogs[blogIndex].slug,
      shortDescription: shortDescription || blogs[blogIndex].shortDescription,
      content: content || blogs[blogIndex].content,
      author: author || blogs[blogIndex].author,
      status: status !== undefined ? status : blogs[blogIndex].status,
      updatedAt: new Date().toISOString()
    };
    
    res.json(blogs[blogIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog (protected)
app.delete('/api/blogs/:id', authenticateToken, (req, res) => {
  try {
    const blogIndex = blogs.findIndex(b => b.id === req.params.id);
    if (blogIndex === -1) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    blogs.splice(blogIndex, 1);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all enquiries (protected)
app.get('/api/enquiries', authenticateToken, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete enquiry (protected)
app.delete('/api/enquiries/:id', authenticateToken, async (req, res) => {
  try {
    const result = await Enquiry.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save cookie consent record
app.post('/api/consent', (req, res) => {
  try {
    const { status, categories, userAgent, ip, pageUrl } = req.body;
    
    const consentRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status,
      categories,
      userAgent: userAgent || 'Unknown',
      ip: ip || 'Unknown',
      pageUrl: pageUrl || 'Unknown'
    };
    
    consentRecords.push(consentRecord);
    res.status(201).json(consentRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { to, subject, body, senderInfo } = req.body;
    
    // Log the contact information for debugging
    console.log('Contact form submission received:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('Sender Info:', senderInfo);
    
    // Save to MongoDB
    try {
      if (senderInfo) {
        const newEnquiry = new Enquiry({
          name: senderInfo.name || senderInfo.fullName || 'Unknown',
          email: senderInfo.email || 'Unknown',
          phone: senderInfo.phone || 'Unknown',
          company: senderInfo.company || senderInfo.companyName || '',
          service: senderInfo.service || senderInfo.serviceInterested || '',
          interest: senderInfo.interest || '',
          message: senderInfo.message || '',
          type: senderInfo.type || 'general'
        });
        await newEnquiry.save();
        console.log('Enquiry saved to MongoDB database.');
      }
    } catch (dbError) {
      console.error('Failed to save enquiry to MongoDB database:', dbError);
    }
    
    // Attempt to send email, but handle failure gracefully
    try {
      // Create email options
      const mailOptions = {
        from: (senderInfo && senderInfo.email) || 'algroflix@gmail.com',
        to: to || 'algroflix@gmail.com',
        subject: subject,
        text: body
      };
      
      // Send email using nodemailer
      const info = await transporter.sendMail(mailOptions);
      
      console.log('Email sent successfully:', info.messageId);
      
      // Return success response
      res.status(200).json({ 
        message: 'Contact form submitted successfully', 
        submittedAt: new Date().toISOString(),
        messageId: info.messageId,
        emailSent: true
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Still return success to the frontend, but indicate email wasn't sent
      res.status(200).json({ 
        message: 'Contact form submitted successfully', 
        submittedAt: new Date().toISOString(),
        emailSent: false,
        emailError: emailError.message
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Failed to process contact form' });
  }
});

// Get all consent records (protected)
app.get('/api/consent', authenticateToken, (req, res) => {
  try {
    // Sort by timestamp descending
    const sortedRecords = consentRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(sortedRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve index.html for all other routes (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});