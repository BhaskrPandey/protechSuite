const mongoose = require('mongoose')

const projectProposalModel = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      reference: 'User',
      description: "Represents the ID of the user who submitted the project proposal."
    },
    proposalTitle: {
      type: String,
      required: true,
      description: "Represents the title of the project proposal."
    },
    proposalDescription: {
      type: String,
      required: true,
      description: "Represents the description of the project proposal."
    },
    file: {
      type: String,
      // required: true,
      description: "Represents the file associated with the project proposal."
    },
    status: {
      type: String,
      default: "pending",
      description: "Represents the status of the project proposal, such as pending, approved, rejected, etc."
    }
  })
 
  module.exports = mongoose.model('projectProposal', projectProposalModel)
