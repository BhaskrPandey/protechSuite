
const Project = require('../models/projectModel');

// Get All Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    if (!projects) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(projects);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Please check all Fields" });

  }
};

// Get Project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Please check all Fields" });

  }
};

// Add a New Project
const addProject = async (req, res) => {
  try {
    console.log(req.body);
    const newProject = await Project.create(req.body);
    // await newProject.save();
    res.status(200).json({ message: 'Project added successfully' });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Please check all Fields" });

  }
};

// Update an Existing Project
const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Please check all Fields" });

  }
};

// Delete a Project

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Please check all Fields" });

  }
};

module.exports = {getAllProjects, getProjectById, addProject, updateProject, deleteProject};