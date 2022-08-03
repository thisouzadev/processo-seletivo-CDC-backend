const employerService = require('../service/employes.service.js');
const { success, created } = require('../utils/dictionary/statusCode');
const create = async (req, res, next) => {
  try {
    const { nome, cpf, departamento, salario, data_de_nascimento } = req.body;
    const createdEmployerResponse = await employerService.create(nome, cpf, departamento, salario, data_de_nascimento);
    return res.status(created).json(createdEmployerResponse);
  } catch (error) {
    console.log(`POST CREATE -> ${error.message}`);
    next(error);
  }
}

const getAll = async (req, res, next) => {
  try {
    const getAllEmployersResponse = await employerService.findAll();
    return res.status(success).json(getAllEmployersResponse);
  } catch (error) {
    console.log(`GET ALL -> ${error.message}`);
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const { nome, cpf, departamento, salario, data_de_nascimento } = req.body;
    const { id } = req.params;
    const updatedEmployerResponse = await employerService.update(id, nome, cpf, departamento, salario, data_de_nascimento);
    return res.status(success).json(updatedEmployerResponse);
  } catch (error) {
    console.log(`PUT UPDATE -> ${error.message}`);
    next(error);
  }
}

const deleteEmployer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEmployerResponse = await employerService.deleteEmployer(id);
    return res.status(success).json(deletedEmployerResponse);
  } catch (error) {
    console.log(`DELETE -> ${error.message}`);
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  update,
  deleteEmployer
};