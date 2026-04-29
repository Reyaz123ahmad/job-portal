// // Load environment variables first
// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Environment variables
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
// const JWT_SECRET = process.env.JWT_SECRET;

// // MongoDB Connection
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected successfully'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// // ========== SCHEMAS ==========

// // Job Schema
// const JobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   organization: { type: String, required: true },
//   applicationStart: String,
//   applicationLast: String,
//   eligibility: String,
//   genMaleFee: String,
//   genFemaleFee: String,
//   obcFee: String,
//   scStFee: String,
//   femaleSpecialNote: String,
//   examDateInfo: String,
//   externalLink: String,
//   extraInfo: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Job = mongoose.model('Job', JobSchema);

// // Owner Schema
// const OwnerSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   password: String
// });

// const Owner = mongoose.model('Owner', OwnerSchema);

// // ========== MIDDLEWARE ==========

// // Verify JWT Token
// const authMiddleware = (req, res, next) => {
//   const token = req.headers['authorization'];
  
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. No token provided.' });
//   }
  
//   try {
//     // Remove 'Bearer ' prefix if present
//     const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
//     const decoded = jwt.verify(tokenValue, JWT_SECRET);
//     req.ownerId = decoded.id;
//     next();
//   } catch(err) {
//     return res.status(401).json({ error: 'Invalid or expired token.' });
//   }
// };

// // ========== API ROUTES ==========

// // GET - All jobs (Public)
// app.get('/api/jobs', async (req, res) => {
//   try {
//     const jobs = await Job.find().sort({ createdAt: -1 });
//     res.json(jobs);
//   } catch(err) {
//     res.status(500).json({ error: 'Failed to fetch jobs' });
//   }
// });

// // POST - Create new job (Protected - Owner only)
// app.post('/api/jobs', authMiddleware, async (req, res) => {
//   try {
//     const job = new Job(req.body);
//     await job.save();
//     res.status(201).json(job);
//   } catch(err) {
//     res.status(500).json({ error: 'Failed to create job' });
//   }
// });

// // DELETE - Delete job (Protected - Owner only)
// app.delete('/api/jobs/:id', authMiddleware, async (req, res) => {
//   try {
//     const job = await Job.findByIdAndDelete(req.params.id);
//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }
//     res.json({ success: true, message: 'Job deleted successfully' });
//   } catch(err) {
//     res.status(500).json({ error: 'Failed to delete job' });
//   }
// });

// // POST - Owner Login
// app.post('/api/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Username and password required' });
//     }
    
//     // Find owner
//     const owner = await Owner.findOne({ username });
//     if (!owner) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     // Verify password
//     const valid = await bcrypt.compare(password, owner.password);
//     if (!valid) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     // Generate token
//     const token = jwt.sign({ id: owner._id }, JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, username: owner.username });
//   } catch(err) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// // GET - Verify token (Protected)
// app.get('/api/verify', authMiddleware, (req, res) => {
//   res.json({ valid: true, message: 'Token is valid' });
// });

// // ========== INITIALIZE DEFAULT OWNER ==========
// const initializeOwner = async () => {
//   try {
//     const existingOwner = await Owner.findOne({ 
//       username: process.env.OWNER_USERNAME || 'admin' 
//     });
    
//     if (!existingOwner) {
//       const hashedPassword = await bcrypt.hash(
//         process.env.OWNER_PASSWORD || 'admin123', 
//         10
//       );
      
//       await Owner.create({
//         username: process.env.OWNER_USERNAME || 'admin',
//         password: hashedPassword
//       });
      
//       console.log('✅ Default owner created successfully');
//       console.log(`📝 Username: ${process.env.OWNER_USERNAME || 'admin'}`);
//       console.log(`🔑 Password: ${process.env.OWNER_PASSWORD || 'admin123'}`);
//       console.log('⚠️  Please change these credentials after first login!');
//     } else {
//       console.log('✅ Owner already exists');
//     }
//   } catch(err) {
//     console.error('❌ Error creating owner:', err);
//   }
// };

// // Start server
// app.listen(PORT, async () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   await initializeOwner();
// });

















// Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ========== SCHEMAS ==========

// Job Schema
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  applicationStart: String,
  applicationLast: String,
  totalPosts:String,
  eligibility: String,
  genMaleFee: String,
  genFemaleFee: String,
  obcFee: String,
  scStFee: String,
  femaleSpecialNote: String,
  examDateInfo: String,
  externalLink: String,
  extraInfo: String,
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', JobSchema);

// Owner Schema
const OwnerSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

const Owner = mongoose.model('Owner', OwnerSchema);

// ========== MIDDLEWARE ==========

// Verify JWT Token
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  try {
    // Remove 'Bearer ' prefix if present
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(tokenValue, JWT_SECRET);
    req.ownerId = decoded.id;
    next();
  } catch(err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// ========== API ROUTES ==========

// GET - All jobs (Public)
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST - Create new job (Protected - Owner only)
app.post('/api/jobs', authMiddleware, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch(err) {
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// PUT - Edit job (Protected - Owner only)
app.put('/api/jobs/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch(err) {
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE - Delete job (Protected - Owner only)
app.delete('/api/jobs/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch(err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// POST - Owner Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    // Find owner
    const owner = await Owner.findOne({ username });
    if (!owner) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const valid = await bcrypt.compare(password, owner.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ id: owner._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: owner.username });
  } catch(err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET - Verify token (Protected)
app.get('/api/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, message: 'Token is valid' });
});

// ========== INITIALIZE DEFAULT OWNER ==========
const initializeOwner = async () => {
  try {
    const existingOwner = await Owner.findOne({ 
      username: process.env.OWNER_USERNAME || 'admin' 
    });
    
    if (!existingOwner) {
      const hashedPassword = await bcrypt.hash(
        process.env.OWNER_PASSWORD || 'admin123', 
        10
      );
      
      await Owner.create({
        username: process.env.OWNER_USERNAME || 'admin',
        password: hashedPassword
      });
      
      console.log('✅ Default owner created successfully');
      console.log(`📝 Username: ${process.env.OWNER_USERNAME || 'admin'}`);
      console.log(`🔑 Password: ${process.env.OWNER_PASSWORD || 'admin123'}`);
      console.log('⚠️  Please change these credentials after first login!');
    } else {
      console.log('✅ Owner already exists');
    }
  } catch(err) {
    console.error('❌ Error creating owner:', err);
  }
};

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await initializeOwner();
});











