const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
        unique: true
    },
    formName: {
        type: String,
        required: true,
        trim: true
    },
    formsPages: [{
        pageId: {
            type: String,
            required: true
        },
        pageName: {
            type: String,
            required: true,
            trim: true
        }
    }],
    formAnalysisData: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    formCreator: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    formSharedWith: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    sourceProject: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Form', formSchema, 'forms');