const express = require('express');
const router = express.Router()
const {validateToken} = require('../authUtils')
// const router = express.Router()
const {getAllProjects, getProjectById, addProject, updateProject, deleteProject} = require('../controllers/projectController')

router.get('/getAllProject', getAllProjects)

router.get('/getProjectById/:id', getProjectById)

router.post('/addProject',addProject)

router.put('/updateProject/:id', updateProject)

router.delete('/deleteProject/:id', deleteProject) 

module.exports = router;
