const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    projectForms: [{
        formId: {
            type: String,
            required: true
        },
        formName: {
            type: String,
            required: true,
            trim: true
        }
    }],
    projectAnalysisData: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    projectCreator: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    projectSharedWith: [{
        type: String,
        trim: true,
        lowercase: true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema, 'projects');