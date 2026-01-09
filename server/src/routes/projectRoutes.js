const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');   
const Project = require('../models/projectModel');
const multer = require('multer');   

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
    try {
        console.log('Received body:', req.body);

        const projectData = {
            projectType: req.body.projectType,
            title: req.body.title,
            role: req.body.role,
            projectSector: req.body.projectSector,
            tools: req.body.tools || [],
            techStack: req.body.techStack || [],

            // THESE ARE THE ONLY CORRECT WAYS:
            context: {
                description: req.body.context?.description || '',
                pictures: req.body.context?.pictures || []
            },
            targetCustomer: {
                description: req.body.targetCustomer?.description || '',
                pictures: req.body.targetCustomer?.pictures || []
            },
            goal: {
                description: req.body.goal?.description || '',
                pictures: req.body.goal?.pictures || []
            },
            effortAndContributions: {
                description: req.body.effortAndContributions?.description || '',
                pictures: req.body.effortAndContributions?.pictures || []
            },

            projectUrl: req.body.projectUrl || '',
            githubUrl: req.body.githubUrl || '',
            status: req.body.status || 'Completed',
            featured: !!req.body.featured
        };

        // Manual validation since frontend sends nested objects
        const missing = [];
        if (!projectData.context.description) missing.push('Context description');
        if (!projectData.targetCustomer.description) missing.push('Target Customer description');
        if (!projectData.goal.description) missing.push('Goal description');
        if (!projectData.effortAndContributions.description) missing.push('Effort & Contributions description');

        if (missing.length > 0) {
            return res.status(400).json({
                message: 'Missing required fields: ' + missing.join(', ')
            });
        }

        const project = new Project(projectData);
        const saved = await project.save();
        res.status(201).json(saved);

    } catch (err) {
        console.error('Save error:', err);
        res.status(400).json({ message: err.message });
    }
});

// PUT update a project
router.put('/:id', async (req, res) => {
    try {
        const updateData = {
            projectType: req.body.projectType,
            title: req.body.title,
            role: req.body.role,
            projectSector: req.body.projectSector,
            tools: req.body.tools || [],
            techStack: req.body.techStack || [],

            context: {
                description: req.body.context?.description || '',
                pictures: req.body.context?.pictures || []
            },
            targetCustomer: {
                description: req.body.targetCustomer?.description || '',
                pictures: req.body.targetCustomer?.pictures || []
            },
            goal: {
                description: req.body.goal?.description || '',
                pictures: req.body.goal?.pictures || []
            },
            effortAndContributions: {
                description: req.body.effortAndContributions?.description || '',
                pictures: req.body.effortAndContributions?.pictures || []
            },

            projectUrl: req.body.projectUrl || '',
            githubUrl: req.body.githubUrl || '',
            status: req.body.status || 'Completed',
            featured: !!req.body.featured
        };

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        console.error('Update error:', err);
        res.status(400).json({ message: err.message });
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

module.exports = router;