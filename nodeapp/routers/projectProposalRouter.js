const express = require("express")
const router = express.Router()
const {getAllProjectProposals, getProjectProposalById, 
    addProjectProposal, updateProjectProposal, 
    getProjectProposalsByUserId, deleteProjectProposal, updateProposalStatus} = require('../controllers/projectProposalController')

const {validateToken} = require('../authUtils')


router.get('/viewProjectProposal', getAllProjectProposals) 

router.get('/getProposalById/:id', getProjectProposalById)

router.post('/addProjectProposal' ,addProjectProposal)

router.put('/updateProposal/:id', updateProjectProposal)

router.put('/updateStatus/:id', updateProposalStatus);

router.get('/getProjectProposalsByUserId/:userId', getProjectProposalsByUserId)

router.delete('/deleteProposal/:id', deleteProjectProposal)

module.exports = router;
