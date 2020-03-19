const express = require('express');
const {
  createUsers,
  readUsers,
  updateUsers,
  deleteUsers
} = require('../datalayer/index');

const userRouter = express.Router();



module.exports = { userRouter };
