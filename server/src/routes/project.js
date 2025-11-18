const express = require('express'); 
const router = express.Router();
const Project = require('../models/projects');
const multer = require('multer');   

const upload = multer({ dest: 'uploads/' });
// GET all projects 
router.get('/', async (req, res) => {
    try{
        const projects = await Project.find().sort({ createdAt: -1  });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });     
    }
});

// GET single project by ID 
router.get('/:id', async(req, res) => {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });  
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });     
    }
});

// POST create a new project
router.post('/', upload.array('image', 10), async (req, res) => {
    try{
        const projectData ={
            projectType: req.body.projectType,
            project_title: req.body.project_title,
            role: req.body.role,
            projectSector: req.body.projectSector,
            tools: req.body.tools ? req.body.tools.split(',').map(tool => tool.trim()) : [],
            techStack: req.body.techStack ? req.body.techStack.split(',').map(tech => tech.trim()) : [],
            context: {
                description: req.body.contextDescription,
                pictures: req.files ? req.files.map(file => ({ url: `/uploads/${file.filename}`, caption: req.body.contextCaptions || '' })) : []
            },
            targetCustomer: {
                description: req.body.targetCustomerDescription,
                pictures: req.files ? req.files.map(file => ({ url: `/uploads/${file.filename}`, caption: req.body.targetCustomerCaptions || '' })) : []
            },
            goal: {
                description: req.body.goalDescription,
                pictures: req.files ? req.files.map(file => ({ url: `/uploads/${file.filename}`, caption: req.body.goalCaptions || '' })) : []
            },
            effortAndContributions: {
                description: req.body.effortAndContributionsDescription,
                pictures: req.files ? req.files.map(file => ({ url: `/uploads/${file.filename}`, caption: req.body.effortAndContributionsCaptions || '' })) : []
            }, 
            startDate: req.body.startDate,  
            endDate: req.body.endDate, 
            projectUrl: req.body.projectUrl,
            status: req.body.status,
            timestamps: true    
        };
        const project = new Project(projectData);
        const newProject = await project.save();
        res.status(201).json(newProject);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id); 
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
});
router.put('/:id', upload.array('image', 10), async (req, res) => {
     try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;