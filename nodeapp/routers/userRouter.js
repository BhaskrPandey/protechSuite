const express= require('express');
const { getUserByEmailAndPassword, addUser, getAllEmployees } = require('../controllers/userController');
const {validateToken}= require('../authUtils');
 
const router= express.Router();
 
router.post('/login', getUserByEmailAndPassword);
router.post('/signup', addUser);

 
module.exports= router;
