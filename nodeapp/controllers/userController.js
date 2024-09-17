const userModel = require('../models/userModel');
const { generateToken } = require('../authUtils');


// async function getUserByEmailAndPassword(req, res ,next) {
async function getUserByEmailAndPassword(req, res ) {
    const { email, password } = req.body;

    try {
        // Find user by email and password
        const user = await userModel.findOne({ email, password });

        // if(user.password !== password){
        //     res.status(401).json({message: error.message})
        // }

        if (user) {
            // Generate a token for the user's ID
            const token = generateToken({ id: user._id });

            // Construct the response object
            const response = {
                userName: user.userName,
                email:user.email,
                mobile:user.mobile,
                password:user.password,
                role: user.role,
                token: token,
                id: user._id
            };

            // Send the response with status 200
            return res.status(200).json(response);
        } else {
            // User not found, send status 404
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Handle any errors and send status 500
        res.status(500).json({ message: error.message });
        // next(error);
    }
}

async function addUser(req, res,next){
    try {
        const newUser = await userModel.create(req.body);
        // res.send("new user added successfully")
        return res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getUserByEmailAndPassword,
    addUser,
    // getAllEmployees
};

