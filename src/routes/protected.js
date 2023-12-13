/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifytoken');
const protectedController = require('../controllers/protectedController');

router.get('/', verifyToken, protectedController.authCheck);

module.exports = router;
