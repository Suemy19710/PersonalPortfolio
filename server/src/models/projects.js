const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  projectType: {
    type: String,
    required: true,
    enum: ['Group Project', 'Individual Project', 'Freelance', 'Academic']
  },
  
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  role: {
    type: String,
    required: false,
    trim: true
  },
  
  projectSector: {
    type: String,
    required: true,
    trim: true
  },
  
  // Tools and Technologies
  tools: [{
    type: String,
    trim: true
  }],
  
  techStack: [{
    type: String,
    trim: true
  }],
  
  // Context Section
  context: {
    description: {
      type: String,
      required: true
    },
    pictures: [{
      url: String,
      caption: String
    }]
  },
  
  // Target Customer Section
  targetCustomer: {
    description: {
      type: String,
      required: true
    },
    pictures: [{
      url: String,
      caption: String
    }]
  },
  
  // Goal Section
  goal: {
    description: {
      type: String,
      required: true
    },
    pictures: [{
      url: String,
      caption: String
    }]
  },
  
  // Effort & Contributions
  effortAndContributions: {
    type: String,
    required: true
  },
  
  // Additional fields
  startDate: {
    type: Date
  },
  
  endDate: {
    type: Date
  },
  
  projectUrl: {
    type: String
  },
  githubUrl:{
    type: String
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'On Hold'],
    default: 'Completed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);