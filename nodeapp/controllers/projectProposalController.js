
const ProjectProposal = require('../models/projectProposalModel');

// Get All Project Proposals
const getAllProjectProposals =  async (req, res) => {
    try {
        const page = 1;
        const limit = 10;
        const search = '';
        const sort = '';
        // const { page = 1, limit = 10, search = '', sort = '' } = req.query;
        const searchQuery = search ? { $text: { $search: search } } : {};
        const proposals = await ProjectProposal.find(searchQuery)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        // if (!totalProposals) {
        //   return res.status(404).json({ message: 'Project proposal not found' });
        // }
        res.status(200).json(proposals);
    } catch (err) {
        // res.status(500).json({ message: err.message });
        res.status(500).json({ message: err.message});

    }
};

const updateProposalStatus = async (req, res) => {
  const { id } = req.params;
  // const { status } = req.body;

  try {
    const updatedProposal = await ProjectProposal.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    res.status(200).json(updatedProposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Project Proposal by ID
const getProjectProposalById =  async (req, res) => {
  try {
    const proposal = await ProjectProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Project proposal not found' });
    }
    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // res.status(500).json({ message: "Please check all Fields" });

  }
};

// Add a New Project Proposal
const addProjectProposal = async (req, res) => {
  try {
    const newProposal = await ProjectProposal.create(req.body);
    console.log(newProposal);
    res.status(200).json(newProposal);
  } catch (error) {
    res.status(500).json({ message: error.message});

  }
};

// Update an Existing Project Proposal
const updateProjectProposal = async (req, res) => {
  try {
    const updatedProposal = await ProjectProposal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProposal) {
      return res.status(404).json({ message: 'Project proposal not found' });
    }
    res.status(200).json({ message: 'Project proposal updated successfully' });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Please check all Fields" });

  }
};

// Get Project Proposals by User ID
const getProjectProposalsByUserId  = async (req, res) => {
  try {
    const proposals = await ProjectProposal.find({ userId: req.params.userId });
    if (!proposals) {
      return res.status(404).json({ message: 'Project proposal not found' });
    }
    res.status(200).json(proposals);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Please check all Fields" });

  }
};

// Delete a Project Proposal
const deleteProjectProposal = async (req, res) => {
  try {
    const deletedProposal = await ProjectProposal.findByIdAndDelete(req.params.id);
    if (!deletedProposal) {
      return res.status(404).json({ message: 'Project proposal not found' });
    }
    res.status(200).json({ message: 'Project proposal deleted successfully' });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Please check all Fields" });

  }
};

module.exports = {getAllProjectProposals, getProjectProposalById,updateProposalStatus,  addProjectProposal, updateProjectProposal, getProjectProposalsByUserId, deleteProjectProposal};