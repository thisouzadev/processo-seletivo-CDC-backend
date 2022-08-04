const Joi = require('joi');
const { Op } = require('sequelize');
const { employes } = require('../database/models');
const { badRequest, conflict, notFound } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorhandlers');

const schemaUser = Joi.object({
  nome: Joi.string().required(),
  cpf: Joi.string().min(11).required(),
  departamento: Joi.string().required(),
  salario: Joi.string().required(),
  data_de_nascimento: Joi.string().required(),
});

const getUserByCPF = async (cpf) => {
  const response = await employes.findOne({
    where: { cpf },
    raw: true,
  });
  return response;
};

const create = async (nome, cpf, departamento, salario, data_de_nascimento) => {
  const { error } = schemaUser.validate({ nome, cpf, departamento, salario, data_de_nascimento });
  if (error) throw errorConstructor(badRequest, error.message);
  const isValidCpf = await getUserByCPF(cpf);
  if (isValidCpf) throw errorConstructor(conflict, 'CPF already exists');
  const createdUserResponse = await employes.create({
    nome, cpf, departamento, salario, data_de_nascimento
  });
  return createdUserResponse;
};

const findAll = async () => {
  const getAllEmployersResponse = await employes.findAll({
    order: [
      ['nome', 'ASC']],
    raw: true,
  });
  return getAllEmployersResponse;
}

const update = async (id, nome, cpf, departamento, salario, data_de_nascimento) => {
  const { error } = schemaUser.validate({ nome, cpf, departamento, salario, data_de_nascimento });
  if (error) throw errorConstructor(badRequest, error.message);
  const updatedUserResponse = await employes.update({
    nome, cpf, departamento, salario, data_de_nascimento
  }, {
    where: { id }
  });
  return updatedUserResponse;  
}

const deleteEmployer = async (id) => {
  const deletedUserResponse = await employes.destroy({
    where: { id }
  });
  return deletedUserResponse;
}

const findByPrimaryKey = async (id) => {
  const getUserResponse = await employes.findByPk(id);
  return getUserResponse;
}

const getEmployeByNameAndDepartament = async (name, departament) => {
  const getUserResponse = await employes.findAll({
    where: {
      nome: {
        [Op.like]: `%${name}%`
      },
      departamento: {
        [Op.like]: `%${departament}%`
      }
    },
    raw: true,
  });
  return getUserResponse;
}

module.exports = {
  create,
  findAll,
  update,
  deleteEmployer,
  findByPrimaryKey,
  getEmployeByNameAndDepartament,
};