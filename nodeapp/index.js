const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouter = require('./routers/userRouter');
const projectRouter = require('./routers/projectRouter');
const projectProposalRouter = require('./routers/projectProposalRouter');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/protechSuite', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = 8080 ||  process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Routes
app.use('/user', userRouter);
app.use('/', projectRouter);
app.use('/', projectProposalRouter)

module.exports = app;
