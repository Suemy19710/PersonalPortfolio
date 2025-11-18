const express = require('express');
const mongoose = require('mongoose');   
const cors = require('cors');   
const dotenv = require('dotenv');   
const multer = require('multer');   
const path = require('path');
const projectRoutes = require('./src/routes/project');
// const AdminJS = require('adminjs');
// const AdminJSExpress = require('@adminjs/express');
// const AdminJSMongoose = require('@adminjs/mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/projects', projectRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB Error:', err));

// File Upload Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

// // AdminJS Setup
// AdminJS.registerAdapter(AdminJSMongoose);

// const Project = require('./src/models/projects');

// const adminOptions = {
//   resources: [Project],
//   rootPath: '/admin',
//   branding: {
//     companyName: 'Portfolio Admin',
//     softwareBrothers: false,
//   },
// };

// const admin = new AdminJS(adminOptions);
// const adminRouter = AdminJSExpress.buildRouter(admin);
// app.use(admin.options.rootPath, adminRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
//   console.log(`AdminJS available at http://localhost:${PORT}${admin.options.rootPath}`);
});