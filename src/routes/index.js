const express = require('express');
const employesController = require('../controllers/employes.controllers');
const router = express.Router();

router.post('/register', employesController.create);

module.exports = router;