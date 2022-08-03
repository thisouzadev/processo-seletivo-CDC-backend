const Joi = require('joi');
const { employes } = require('../database/models');
const { badRequest, conflict, notFound } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorhandlers');

const schemaUser = Joi.object({
  nome: Joi.string().required(),
  cpf: Joi.string().min(11).required().message('CPF must be 11 characters long'),
  departamento: Joi.string().required(),
  salario: Joi.string().required(),
  data_de_nascimento: Joi.string().required().message('Data de nascimento inválida'),
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
  if (isValidCpf) throw errorConstructor(conflict, 'Conflict');
  const createdUserResponse = await employes.create({
    nome, cpf, departamento, salario, data_de_nascimento
  });
  return createdUserResponse;
};


module.exports = {
  create,
};