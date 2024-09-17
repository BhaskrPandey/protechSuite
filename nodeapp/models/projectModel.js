const mongoose = require('mongoose')

const projectModel = mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
        description: "Represents the title of the project."
    },
    projectDescription: {
        type: String,
        description: "Represents the description of the project."
    },
    startDate: {
        type: Date,
        required: true,
        description: "Represents the start date of the project."
    },
    endDate: {
        type: Date,
        required: true,
        description: "Represents the end date of the project."
    },
    frontEndTechStack: {
        type: String,
        required: true,
        description: "Represents the frontend technology stack used in the project."
    },
    backendTechStack: {
        type: String,
        required: true,
        description: "Represents the backend technology stack used in the project."
    },
    database: {
        type: String,
        required: true,
        description: "Represents the database used in the project."
    },
    status: {
        type: String,
        required: true,
        description: "Represents the status of the project, such as ongoing, completed, etc."
    }
})

module.exports = mongoose.model('project', projectModel)