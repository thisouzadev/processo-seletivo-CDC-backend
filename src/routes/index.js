const express = require('express');
const employesController = require('../controllers/employes.controllers');
const router = express.Router();

router.post('/register', employesController.create);
router.get('/employers', employesController.getAll);
router.put('/register/:id', employesController.update);
router.delete('/register/:id', employesController.deleteEmployer);
router.get('/register/:id', employesController.findByPrimaryKey);
router.get('/register/search/:name/:departament', employesController.getEmployeByNameAndDepartament);
module.exports = router;