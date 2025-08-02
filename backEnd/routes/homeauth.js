const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../models/users');
const Project = require('../models/projects');
const Form = require('../models/forms');

router.post('/createprojectorform', async (req, res) => {
    const { projectName, projectCreator, formName, formCreator } = req.body;

    try {
        // Validate required fields
        if (!formName || !formCreator) {
            return res.status(400).json({ message: 'formName and formCreator are required' });
        }

        // Validate formCreator exists in users collection
        const formCreatorUser = await User.findOne({ email: formCreator.toLowerCase() });
        if (!formCreatorUser) {
            return res.status(400).json({ message: 'Invalid formCreator email' });
        }

        // Generate unique formId
        const formId = uuidv4();

        // Case 1: projectName and projectCreator are provided
        if (projectName && projectCreator) {
            // Validate projectCreator exists in users collection
            const projectCreatorUser = await User.findOne({ email: projectCreator.toLowerCase() });
            if (!projectCreatorUser) {
                return res.status(400).json({ message: 'Invalid projectCreator email' });
            }

            // Generate unique projectId
            const projectId = uuidv4();

            // Create project record
            const newProject = new Project({
                projectId,
                projectName,
                projectForms: [{ formId, formName }],
                projectAnalysisData: null,
                projectCreator: projectCreator.toLowerCase(),
                projectSharedWith: []
            });

            // Create form record
            const newForm = new Form({
                formId,
                formName,
                formsPages: [],
                formAnalysisData: null,
                formCreator: formCreator.toLowerCase(),
                formSharedWith: [],
                sourceProject: projectId
            });

            // Save both records
            await newProject.save();
            await newForm.save();

            return res.status(201).json({
                message: 'Project and form created successfully',
                project: newProject,
                form: newForm
            });
        }

        // Case 2: projectName and projectCreator are null
        // Create only form record
        const newForm = new Form({
            formId,
            formName,
            formsPages: [],
            formAnalysisData: null,
            formCreator: formCreator.toLowerCase(),
            formSharedWith: [],
            sourceProject: null
        });

        await newForm.save();

        return res.status(201).json({
            message: 'Form created successfully',
            form: newForm
        });

    } catch (error) {
        console.error('Error in createprojectorForm:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/getprojectandformdata', async (req, res) => {
    const { emailId } = req.body;

    try {
        // Validate emailId is provided
        if (!emailId) {
            return res.status(400).json({ message: 'emailId is required' });
        }

        // Validate emailId exists in users collection
        const user = await User.findOne({ email: emailId.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'Invalid emailId' });
        }

        // Query projects where projectCreator matches emailId
        const projects = await Project.find({ projectCreator: emailId.toLowerCase() });

        // Query forms where formCreator matches emailId
        const forms = await Form.find({ formCreator: emailId.toLowerCase() });

        // Return matching projects and forms
        return res.status(200).json({
            message: 'Projects and forms retrieved successfully',
            projects,
            forms
        });

    } catch (error) {
        console.error('Error in projectsandfiles:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;