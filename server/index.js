const express = require('express');
const mongoose = require('mongoose');   
const cors = require('cors');   
const fs = require('fs');
const dotenv = require('dotenv');   
const multer = require('multer');   
const path = require('path');
const projectRoutes = require('./src/routes/projectRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes'); 

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Created uploads folder');
}
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});