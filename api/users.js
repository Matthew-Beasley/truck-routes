const express = require('express');
const {
  createUsers,
  readUsers,
  updateUsers,
  deleteUsers
} = require('../datalayer/index');

const userRouter = express.Router();

//set up tests, test db layer and tdd api routes

module.exports = { userRouter };
