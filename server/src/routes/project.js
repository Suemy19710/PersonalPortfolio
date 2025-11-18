const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const multer = require('multer');   

const upload = multer({ dest: 'uploads/' });

// GET all projects 
router.get('/', async (req, res) => {
    try{
        const projects = await Project.find().sort({ createdAt: -1 });
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
router.post('/', async (req, res) => {
    try{
        console.log('Received POST data:', req.body);
        
        const projectData = {
            projectType: req.body.projectType,
            title: req.body.title, // Fixed: was project_title
            role: req.body.role,
            projectSector: req.body.projectSector,
            tools: Array.isArray(req.body.tools) ? req.body.tools : (req.body.tools ? req.body.tools.split(',').map(tool => tool.trim()) : []),
            techStack: Array.isArray(req.body.techStack) ? req.body.techStack : (req.body.techStack ? req.body.techStack.split(',').map(tech => tech.trim()) : []),
            context: {
                description: req.body.contextDescription,
                pictures: req.body.context?.pictures || [] // Fixed: handle array directly
            },
            targetCustomer: {
                description: req.body.targetCustomerDescription,
                pictures: req.body.targetCustomer?.pictures || [] // Fixed: handle array directly
            },
            goal: {
                description: req.body.goalDescription,
                pictures: req.body.goal?.pictures || [] // Fixed: handle array directly
            },
            effortAndContributions: req.body.effortAndContributions, // Fixed: this should be string, not object
            projectUrl: req.body.projectUrl,
            githubUrl: req.body.githubUrl,
            status: req.body.status,
            featured: req.body.featured === true || req.body.featured === 'true' // Fixed: better boolean handling
        };

        console.log('Processed project data:', projectData);

        const project = new Project(projectData);
        const newProject = await project.save();
        res.status(201).json(newProject);
    }
    catch (err) {
        console.error('Error creating project:', err);
        res.status(400).json({ message: err.message });
    }
});

// PUT update a project
router.put('/:id', async (req, res) => {
    try {
        console.log('Received PUT data:', req.body);
        
        const updateData = {
            projectType: req.body.projectType,
            title: req.body.title,
            role: req.body.role,
            projectSector: req.body.projectSector,
            tools: Array.isArray(req.body.tools) ? req.body.tools : (req.body.tools ? req.body.tools.split(',').map(tool => tool.trim()) : []),
            techStack: Array.isArray(req.body.techStack) ? req.body.techStack : (req.body.techStack ? req.body.techStack.split(',').map(tech => tech.trim()) : []),
            context: {
                description: req.body.contextDescription,
                pictures: req.body.context?.pictures || []
            },
            targetCustomer: {
                description: req.body.targetCustomerDescription,
                pictures: req.body.targetCustomer?.pictures || []
            },
            goal: {
                description: req.body.goalDescription,
                pictures: req.body.goal?.pictures || []
            },
            effortAndContributions: req.body.effortAndContributions,
            projectUrl: req.body.projectUrl,
            githubUrl: req.body.githubUrl,
            status: req.body.status,
            featured: req.body.featured === true || req.body.featured === 'true'
        };

        console.log('Processed update data:', updateData);

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        res.json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(400).json({ message: error.message });
    }
});

// DELETE a project
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

// Separate endpoint for image uploads
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ url: imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;